namespace API.Entities;

public class AppAlbum
{
    public int Id { get; set; }
    public required string AlbumName { get; set; }
    public required string Description { get; set; }
    public required int TotalViews { get; set; }
    public required int TotalSongs { get; set; }
    public DateTime UploadDate { get; set; } = DateTime.UtcNow;
    public List<AlbumPhoto> Photos { get; set; } = [];
    public List<AlbumSong> Songs { get; set; } = [];
}
