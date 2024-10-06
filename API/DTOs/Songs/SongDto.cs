namespace API.DTOs.Songs;

public class SongDto
{
    public int Id { get; set; }
    public required string SongName { get; set; }
    public required string ArtistName { get; set; }
    public int TotalView { get; set; } = 0;
    public required string MusicUrl { get; set; }
    public string? LyricUrl { get; set; }
    public string? SongImageUrl { get; set; }
    public DateTime UploadDate { get; set; } = DateTime.UtcNow;
}
