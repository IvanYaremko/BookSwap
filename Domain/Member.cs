using Microsoft.AspNetCore.Identity;

namespace Domain;

/// <summary>
/// This class is the blueprint for all Member objects.
/// </summary>
public class Member {
    public string? County { get; set; }
    // public ICollection<Book> BooksOwned { get; set; } = new List<Book>();
}