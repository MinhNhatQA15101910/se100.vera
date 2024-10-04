namespace API.Entities;

public class AppSong
{
    public int Id { get; set; }
    public required string SongName { get; set; }
    public required string ArtistName { get; set; }
    public int TotalView { get; set; }
    public int PublisherId { get; set; }
    public required string MusicUrl { get; set; }
    public required string LyricUrl { get; set; }
    public required string SongImageUrl { get; set; }
    public DateTime UploadDate { get; set; } = DateTime.UtcNow;
}
