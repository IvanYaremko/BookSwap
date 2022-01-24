using Microsoft.EntityFrameworkCore;
using Persistence;
using API.Extensions;
using FluentValidation.AspNetCore;
using Application.Books;
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using Domain;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
                                // Only need to specify on class that resides in the Application.csproj to pick up all validation handlers  
builder.Services.AddControllers().AddFluentValidation(config =>
{
    config.RegisterValidatorsFromAssemblyContaining<Create>();
});
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
var app = builder.Build();
// Custom exception handling middleware
app.UseMiddleware<ExceptionMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

/// <summary>
/// Used to retrieve the DataContext service, and migrate the database
/// </summary>
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    context.Database.Migrate();
    await Seed.SeedData(context, userManager);

}
catch (Exception ex)
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "Error occured during migration");
}

app.Run();
