namespace API.Entities;

public class AppPlaylist
{
    public int Id { get; set; }
    public required string PlaylistName { get; set; }
    public required string Description { get; set; }
    public required string AlbumImageUrl { get; set; }
    public required int TotalView { get; set; }
    public required int TotalSong { get; set; }
    public DateTime UploadDate { get; set; } = DateTime.UtcNow;
}
