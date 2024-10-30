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
    public DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }
    public DbSet<Payment> Payments { get; set; }

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

        modelBuilder.Entity<ArtistAlbum>()
            .HasKey(x => new { x.ArtistId, x.AlbumId });

        modelBuilder.Entity<ArtistAlbum>()
            .HasOne(x => x.Artist)
            .WithMany(x => x.Albums)
            .HasForeignKey(x => x.ArtistId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ArtistAlbum>()
            .HasOne(x => x.Album)
            .WithMany(x => x.Artists)
            .HasForeignKey(x => x.AlbumId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PlaylistSong>()
            .HasKey(x => new { x.PlaylistId, x.SongId });

        modelBuilder.Entity<PlaylistSong>()
            .HasOne(x => x.Playlist)
            .WithMany(x => x.Songs)
            .HasForeignKey(x => x.PlaylistId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PlaylistSong>()
            .HasOne(x => x.Song)
            .WithMany(x => x.Playlists)
            .HasForeignKey(x => x.SongId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<SongGenre>()
            .HasKey(x => new { x.SongId, x.GenreId });

        modelBuilder.Entity<SongGenre>()
            .HasOne(x => x.Song)
            .WithMany(x => x.Genres)
            .HasForeignKey(x => x.SongId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<SongGenre>()
            .HasOne(x => x.Genre)
            .WithMany(x => x.Songs)
            .HasForeignKey(x => x.GenreId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PaymentDetail>()
            .HasKey(x => new { x.PaymentId, x.SubscriptionPlanId });

        modelBuilder.Entity<PaymentDetail>()
            .HasOne(x => x.Payment)
            .WithMany(x => x.SubscriptionPlans)
            .HasForeignKey(x => x.PaymentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PaymentDetail>()
            .HasOne(x => x.SubscriptionPlan)
            .WithMany(x => x.Payments)
            .HasForeignKey(x => x.SubscriptionPlanId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AlbumGenre>()
            .HasKey(x => new { x.AlbumId, x.GenreId });

        modelBuilder.Entity<AlbumGenre>()
            .HasOne(x => x.Album)
            .WithMany(x => x.Genres)
            .HasForeignKey(x => x.AlbumId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AlbumGenre>()
            .HasOne(x => x.Genre)
            .WithMany(x => x.Albums)
            .HasForeignKey(x => x.GenreId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ArtistGenre>()
            .HasKey(x => new { x.ArtistId, x.GenreId });

        modelBuilder.Entity<ArtistGenre>()
            .HasOne(x => x.Artist)
            .WithMany(x => x.Genres)
            .HasForeignKey(x => x.ArtistId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ArtistGenre>()
            .HasOne(x => x.Genre)
            .WithMany(x => x.Artists)
            .HasForeignKey(x => x.GenreId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
