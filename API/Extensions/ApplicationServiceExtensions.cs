using Application.Books;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    /// <summary>
    /// This class is a simple extension for Program.cs
    /// To keep Program.cs lean, application services are added in this class
    /// Since this class is static, it does not need to be initialised to be used,
    /// Program.cs calls the AddApplicationServices() method to add all the services specified
    /// </summary>
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
                {
                    opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
                });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            // This service tell MediatR where to find handlesr
            services.AddMediatR(typeof(List.Handler).Assembly);

            return services;
        }
    }
}