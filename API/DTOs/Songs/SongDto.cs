using API.Entities;

namespace API.DTOs.Songs;

public class SongDto
{
    public int Id { get; set; }
    public required string SongName { get; set; }
    public required string ArtistName { get; set; }
    public int TotalView { get; set; }
    public required string MusicUrl { get; set; }
    public string? LyricUrl { get; set; }
    public List<SongPhoto>? SongPhotoUrl { get; set; }
}
