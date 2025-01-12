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
    public required DbSet<Genre> Genres { get; set; }
    public required DbSet<SongFavorite> FavoriteSongs { get; set; }
    public required DbSet<AlbumFavorite> FavoriteAlbums { get; set; }
    public required DbSet<Song> Songs { get; set; }
    public required DbSet<SongGenre> SongGenres { get; set; }
    public required DbSet<Album> Albums { get; set; }
    public required DbSet<AlbumSong> AlbumSongs { get; set; }
    public required DbSet<AlbumGenre> AlbumGenres { get; set; }
    public required DbSet<Playlist> Playlists { get; set; }
    public required DbSet<PlaylistSong> PlaylistSongs { get; set; }
    public required DbSet<ArtistSong> ArtistSongs { get; set; }
    public required DbSet<ArtistAlbum> ArtistAlbums { get; set; }
    public required DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }
    // public required DbSet<Payment> Payments { get; set; }
    // public required DbSet<PaymentDetail> PaymentDetails { get; set; }
    public required DbSet<Comment> Comments { get; set; }
    public required DbSet<Notification> Notifications { get; set; }
    public required DbSet<Download> Downloads { get; set; }

    override protected void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        #region User relationships
        #region User-Role
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
        #endregion

        #region Artist-Song
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
        #endregion

        #region Artist-Album
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
        #endregion

        #region User-FavoriteSong
        modelBuilder.Entity<SongFavorite>()
            .HasKey(x => new { x.UserId, x.SongId });

        modelBuilder.Entity<SongFavorite>()
            .HasOne(x => x.User)
            .WithMany(x => x.FavoriteSongs)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<SongFavorite>()
            .HasOne(x => x.Song)
            .WithMany(x => x.UserFavorites)
            .HasForeignKey(x => x.SongId)
            .OnDelete(DeleteBehavior.Cascade);
        #endregion

        #region User-FavoriteAlbum
        modelBuilder.Entity<AlbumFavorite>()
            .HasKey(x => new { x.UserId, x.AlbumId });

        modelBuilder.Entity<AlbumFavorite>()
            .HasOne(x => x.User)
            .WithMany(x => x.FavoriteAlbums)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AlbumFavorite>()
            .HasOne(x => x.Album)
            .WithMany(x => x.UserFavorites)
            .HasForeignKey(x => x.AlbumId)
            .OnDelete(DeleteBehavior.Cascade);
        #endregion

        #region User-Plan
        modelBuilder.Entity<UserPlan>()
            .HasKey(x => new { x.UserId, x.PlanId });

        modelBuilder.Entity<UserPlan>()
            .HasOne(x => x.User)
            .WithMany(x => x.Plans)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserPlan>()
            .HasOne(x => x.Plan)
            .WithMany(x => x.Users)
            .HasForeignKey(x => x.PlanId)
            .OnDelete(DeleteBehavior.Cascade);
        #endregion
        #endregion

        #region Song relationships
        #region Song-Genre
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
        #endregion

        #region Download
        modelBuilder.Entity<Download>()
            .HasKey(x => new { x.UserId, x.SongId });

        modelBuilder.Entity<Download>()
            .HasOne(x => x.User)
            .WithMany(x => x.Downloads)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Download>()
            .HasOne(x => x.Song)
            .WithMany(x => x.Downloads)
            .HasForeignKey(x => x.SongId)
            .OnDelete(DeleteBehavior.NoAction);
        #endregion
        #endregion

        #region Album relationships
        #region Album-Song
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
        #endregion

        #region Album-Genre
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
        #endregion
        #endregion

        #region Playlist relationships
        #region Playlist-Song
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
        #endregion
        #endregion
    }
}
