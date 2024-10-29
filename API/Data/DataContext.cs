using API.Entities;

namespace API.Data;

public class DataContext(DbContextOptions options) :
IdentityDbContext<
    AppUser,
    AppRole,
    int,
    IdentityUserClaim<int>,
    AppUserRole,
    IdentityUserLogin<int>,
    IdentityRoleClaim<int>,
    IdentityUserToken<int>
>(options)
{
    public DbSet<AppSong> Songs { get; set; }
    public DbSet<AppAlbum> Albums { get; set; }
    public DbSet<AppPlaylist> Playlists { get; set; }
    public DbSet<AppGenre> Genres { get; set; }

    override protected void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<AppUser>()
            .HasMany(x => x.UserRoles)
            .WithOne(x => x.User)
            .HasForeignKey(x => x.UserId)
            .IsRequired();

        modelBuilder.Entity<AppRole>()
            .HasMany(x => x.UserRoles)
            .WithOne(x => x.Role)
            .HasForeignKey(x => x.RoleId)
            .IsRequired();

        modelBuilder.Entity<ArtistSong>()
            .HasKey(x => new { x.ArtistId, x.SongId });

        modelBuilder.Entity<ArtistSong>()
            .HasOne(x => x.Song)
            .WithMany(x => x.Artists)
            .HasForeignKey(x => x.SongId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ArtistSong>()
            .HasOne(x => x.Artist)
            .WithMany(x => x.Songs)
            .HasForeignKey(x => x.ArtistId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AlbumSong>()
            .HasKey(x => new { x.AlbumId, x.SongId });

        modelBuilder.Entity<AlbumSong>()
            .HasOne(x => x.Album)
            .WithMany(x => x.Songs)
            .HasForeignKey(x => x.AlbumId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AlbumSong>()
            .HasOne(x => x.Song)
            .WithMany(x => x.Albums)
            .HasForeignKey(x => x.SongId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
