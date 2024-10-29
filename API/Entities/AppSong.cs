namespace API.Entities;

public class AppSong
{
    public int Id { get; set; }
    public required string SongName { get; set; }
    public required string Description { get; set; }
    public int TotalView { get; set; } = 0;
    public DateTime UploadDate { get; set; } = DateTime.UtcNow;
    public required string MusicUrl { get; set; }
    public string? MusicPublicId { get; set; }
    public required string LyricUrl { get; set; }
    public string? LyricPublicId { get; set; }
    public List<SongPhoto> SongPhotos { get; set; } = [];
    public List<ArtistSong> Artists { get; set; } = [];

    // Navigation properties
    public int PublisherId { get; set; }
    public AppUser Publisher { get; set; } = null!;
}
