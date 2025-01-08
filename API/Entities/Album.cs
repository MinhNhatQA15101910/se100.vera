namespace API.Entities;

public class Album
{
    public int Id { get; set; }
    public required string AlbumName { get; set; }
    public required string Description { get; set; }
    public int TotalListeningHours { get; set; } = 0;
    public int TotalSongs { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<AlbumPhoto> Photos { get; set; } = [];
    public List<AlbumSong> Songs { get; set; } = [];
    public List<ArtistAlbum> Artists { get; set; } = [];
    public List<AlbumGenre> Genres { get; set; } = [];
    public List<AlbumFavorite> UserFavorites { get; set; } = [];

    // Navigation properties
    public int PublisherId { get; set; }
    public AppUser Publisher { get; set; } = null!;
}
