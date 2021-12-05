using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{

    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Books.Any()) return;

            var books = new List<Book>
            {
                new Book
                {
                    Author = "Jane",
                    Title = "Test Book 1",
                },
                new Book
                {
                    Author = "Phil",
                    Title = "Test book 2",
                }
            };
             await context.Books.AddRangeAsync(books);
            await context.SaveChangesAsync();
        }
    }
}