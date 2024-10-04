using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }

    public DbSet<AppSong> Songs { get; set; }

    public DbSet<AppAlbum> Albums { get; set; }

    public DbSet<AppPlaylist> Playlists { get; set; }

    public DbSet<AppGenre> Genres { get; set; }
}
