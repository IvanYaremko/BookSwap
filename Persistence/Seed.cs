using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{

    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var userList = new List<AppUser>
                {
                    new AppUser{DisplayName="John", UserName="john", Email="john@email.com"},
                    new AppUser{DisplayName="Jane", UserName="jane", Email="jane@email.com"},
                    new AppUser{DisplayName="Fedor", UserName="fedor", Email="fedor@email.com"},
                };

                // This loop will do the work required dto create the user, set a password, and 
                // store the user into the database. The DataContext was provided in the IdentityServicesExtensions
                foreach (var user in userList)
                {
                    await userManager.CreateAsync(user, "P@$$w0rd");
                }
            }

            if (context.Books.Any()) return;

            var books = new List<Book>
            {
                new Book
                {
                    Author = "Jane",
                    Title = "Test Book 1",
                    Pages = 1,
                    County ="carlow"
                },
                new Book
                {
                    Author = "Phil",
                    Title = "Test book 2",
                    Pages = 1,
                    County = "carlow"
                }
            };
             await context.Books.AddRangeAsync(books);
            await context.SaveChangesAsync();
        }
    }
}