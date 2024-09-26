using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }

    override protected void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AppUser>()
        .Property(u => u.Role)
        .HasConversion(
            v => v.ToString(),
            v => (Role)Enum.Parse(typeof(Role), v)
            );
    }
}
