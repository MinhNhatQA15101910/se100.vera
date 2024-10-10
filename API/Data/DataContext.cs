using API.Entities;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
    public DbSet<AppSong> Songs { get; set; }

    public DbSet<AppAlbum> Albums { get; set; }

    public DbSet<AppPlaylist> Playlists { get; set; }

    public DbSet<AppGenre> Genres { get; set; }

    override protected void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AppUser>()
        .Property(u => u.Role)
        .HasConversion(
            v => v.ToString(),
            v => (Entities.Role)Enum.Parse(typeof(Entities.Role), v)
            );
    }

}
