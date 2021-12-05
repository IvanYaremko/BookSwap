using Microsoft.AspNetCore.Identity;

namespace Domain;

public class Member : IdentityUser{
    public string? County { get; set; }
    public ICollection<Book> BooksOwned { get; set; } = new List<Book>();
}