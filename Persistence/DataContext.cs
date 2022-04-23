using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;
public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Enables the cascase deletation of a swap -> messages
        builder.Entity<Message>()
            .HasOne(m => m.Swap)
            .WithMany(s => s.Messages)
            .OnDelete(DeleteBehavior.Cascade);
    }

    public DbSet<Book> Books { get; set; }

    public DbSet<AppUser> AppUsers { get; set; }

    public DbSet<BookSwap> Swaps { get; set; }

    public DbSet<Photo> Photos { get; set; }

    public DbSet<Message> Messages { get; set; }

}