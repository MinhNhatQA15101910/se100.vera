namespace API.Entities;

public class AppAlbum
{
    public int Id { get; set; }
    public required string AlbumName { get; set; }
    public int PublisherId { get; set; }
    public required string Description { get; set; }
    public required string AlbumImageUrl { get; set; }
    public required int TotalView { get; set; }
    public required int TotalSong { get; set; }
    public DateTime UploadDate { get; set; } = DateTime.UtcNow;
}
