namespace API.Entities;

public class AppPlaylist
{
    public int Id { get; set; }
    public required string PlaylistName { get; set; }
    public required string Description { get; set; }
    public required int TotalListeningHours { get; set; } = 0;
    public required int TotalSongs { get; set; } = 0;
    public DateTime UploadDate { get; set; } = DateTime.UtcNow;
    public List<PlaylistPhoto> Photos { get; set; } = [];
    public List<PlaylistSong> Songs { get; set; } = [];

    // Navigation properties
    public int PublisherId { get; set; }
    public AppUser Publisher { get; set; } = null!;
}
