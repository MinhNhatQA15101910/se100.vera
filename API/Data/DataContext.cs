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
    public required DbSet<UserFollow> Follows { get; set; }
    public required DbSet<Photo> Photos { get; set; }
    public required DbSet<Genre> Genres { get; set; }
    public required DbSet<UserPhoto> UserPhotos { get; set; }
    public required DbSet<SongFavorite> FavoriteSongs { get; set; }
    public required DbSet<AlbumFavorite> FavoriteAlbums { get; set; }
    public required DbSet<Song> Songs { get; set; }
    public required DbSet<SongPhoto> SongPhotos { get; set; }
    public required DbSet<SongGenre> SongGenres { get; set; }
    public required DbSet<Album> Albums { get; set; }
    public required DbSet<AlbumPhoto> AlbumPhotos { get; set; }
    public required DbSet<AlbumSong> AlbumSongs { get; set; }
    public required DbSet<AlbumGenre> AlbumGenres { get; set; }
    public required DbSet<Playlist> Playlists { get; set; }
    public required DbSet<PlaylistSong> PlaylistSongs { get; set; }
    public required DbSet<ArtistGenre> ArtistGenres { get; set; }
    public required DbSet<ArtistSong> ArtistSongs { get; set; }
    public required DbSet<ArtistAlbum> ArtistAlbums { get; set; }
    public required DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }
    public required DbSet<Payment> Payments { get; set; }
    public required DbSet<PaymentDetail> PaymentDetails { get; set; }

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

        #region User-Photo
        modelBuilder.Entity<UserPhoto>()
            .HasKey(x => new { x.UserId, x.PhotoId });

        modelBuilder.Entity<UserPhoto>()
            .HasOne(x => x.User)
            .WithMany(x => x.Photos)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserPhoto>()
            .HasOne(x => x.Photo)
            .WithMany(x => x.Users)
            .HasForeignKey(x => x.PhotoId)
            .OnDelete(DeleteBehavior.Cascade);
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

        #region Artist-Genre
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
        #endregion

        #region Song relationships
        #region Song-Photo
        modelBuilder.Entity<SongPhoto>()
            .HasKey(x => new { x.SongId, x.PhotoId });

        modelBuilder.Entity<SongPhoto>()
            .HasOne(x => x.Song)
            .WithMany(x => x.Photos)
            .HasForeignKey(x => x.SongId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<SongPhoto>()
            .HasOne(x => x.Photo)
            .WithMany(x => x.Songs)
            .HasForeignKey(x => x.PhotoId)
            .OnDelete(DeleteBehavior.Cascade);
        #endregion

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
        #endregion

        #region Album relationships
        #region Album-Photo
        modelBuilder.Entity<AlbumPhoto>()
            .HasKey(x => new { x.AlbumId, x.PhotoId });

        modelBuilder.Entity<AlbumPhoto>()
            .HasOne(x => x.Album)
            .WithMany(x => x.Photos)
            .HasForeignKey(x => x.AlbumId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AlbumPhoto>()
            .HasOne(x => x.Photo)
            .WithMany(x => x.Albums)
            .HasForeignKey(x => x.PhotoId)
            .OnDelete(DeleteBehavior.Cascade);
        #endregion

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

        #region Payment-SubscriptionPlan
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
        #endregion

        #region User Follow
        modelBuilder.Entity<UserFollow>()
            .HasKey(f => new { f.SourceUserId, f.TargetUserId });

        modelBuilder.Entity<UserFollow>()
            .HasOne(s => s.SourceUser)
            .WithMany(l => l.Followings)
            .HasForeignKey(s => s.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserFollow>()
            .HasOne(s => s.TargetUser)
            .WithMany(l => l.Followers)
            .HasForeignKey(s => s.TargetUserId)
            .OnDelete(DeleteBehavior.Cascade);
        #endregion
    }
}
