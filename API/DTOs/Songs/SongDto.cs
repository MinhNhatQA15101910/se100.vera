using API.DTOs.Artists;

namespace API.DTOs.Songs;

public class SongDto
{
    public int Id { get; set; }
    public required string SongName { get; set; }
    public string? Description { get; set; }
    public string? Duration { get; set; }
    public required string PublisherName { get; set; }
    public string? PublisherImageUrl { get; set; }
    public int TotalListeningHours { get; set; }
    public int TotalViews { get; set; }
    public required string MusicUrl { get; set; }
    public string? MusicPublicId { get; set; }
    public string? LyricUrl { get; set; }
    public string? LyricPublicId { get; set; }
    public string? State { get; set; }
    public string? PhotoUrl { get; set; }
    public required List<ArtistDto> Artists { get; set; }
    public required List<string> Genres { get; set; }
    public DateTime CreatedAt { get; set; }
}
