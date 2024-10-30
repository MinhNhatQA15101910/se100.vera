namespace API.Entities;

public class AppUser : IdentityUser<int>
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? ArtistName { get; set; }
    public required string Gender { get; set; }
    public DateOnly DateOfBirth { get; set; } = new DateOnly(2000, 1, 1);
    public string? About { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<UserPhoto> Photos { get; set; } = [];
    public List<AppSong> PublishedSongs { get; set; } = [];
    public List<ArtistSong> Songs { get; set; } = [];
    public List<AppAlbum> PublishedAlbums { get; set; } = [];
    public List<ArtistAlbum> Albums { get; set; } = [];
    public List<AppPlaylist> PublishedPlaylists { get; set; } = [];
    public List<ArtistGenre> Genres { get; set; } = [];
    public List<SubscriptionPlan> SubscriptionPlans { get; set; } = [];
    public List<Payment> Payments { get; set; } = [];
    public ICollection<AppUserRole> UserRoles { get; set; } = [];
}
