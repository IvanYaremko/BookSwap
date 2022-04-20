using Microsoft.AspNetCore.Identity;

namespace Domain;

public class AppUser : IdentityUser
{
    public string DisplayName { get; set; }

    public string County { get; set; }
    
    public ICollection<Book> Books { get; set; }

    public ICollection<Photo> Photos { get; set; }

}
