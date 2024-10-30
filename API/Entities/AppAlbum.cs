namespace API.Entities;

public class AppAlbum
{
    public int Id { get; set; }
    public required string AlbumName { get; set; }
    public required string Description { get; set; }
    public required int TotalViews { get; set; } = 0;
    public required int TotalSongs { get; set; } = 0;
    public DateTime UploadDate { get; set; } = DateTime.UtcNow;
    public List<AlbumPhoto> Photos { get; set; } = [];
    public List<AlbumSong> Songs { get; set; } = [];
    public List<ArtistAlbum> Artists { get; set; } = [];

    // Navigation properties
    public int PublisherId { get; set; }
    public AppUser Publisher { get; set; } = null!;
}
