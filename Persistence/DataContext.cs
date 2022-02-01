using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;
public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    // protected override void OnModelCreating(ModelBuilder builder)
    // {
    //     base.OnModelCreating(builder);

    //     builder.Entity<AppUser>()
    //         .HasMany(b => b.Books)
    //         .WithOne(a => a.AppUser)
    //         .IsRequired();
    // }

    public DbSet<Book> Books { get; set; }

    public DbSet<AppUser> AppUsers { get; set; }

}