using Domain;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace API.Extensions;
    /// <summary>
    /// This class is a simple extension for Program.cs
    /// To keep Program.cs lean, identity services are added in this class
    /// Since this class is static, it does not need to be initialised to be used,
    /// Program.cs calls the AddIdentityServices() method to add all the services specified
    /// </summary>
public static class IdentityServicesExtensions
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
        // Adds and configures the identity system for the specified User type.
        services.AddIdentityCore<AppUser>(opt =>
        {
            opt.Password.RequireNonAlphanumeric = true;
        })
        .AddEntityFrameworkStores<DataContext>()
        .AddSignInManager<SignInManager<AppUser>>();

        services.AddAuthentication();
        return services;
    }
}
