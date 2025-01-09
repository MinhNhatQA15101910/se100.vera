using API.DTOs.Artists;
using API.DTOs.Users;

namespace API.DTOs.Albums;

public class AlbumDto
{
    public int Id { get; set; }
    public required string AlbumName { get; set; }
    public required string Description { get; set; }
    public string? PhotoUrl { get; set; }
    public int TotalListeningHours { get; set; }
    public int TotalSongs { get; set; }
    public required string TotalDuration { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<string>? Photos { get; set; }
    public List<SongOrderDto>? Songs { get; set; }
    public UserDto? Publisher { get; set; }
    public List<ArtistDto>? Artists { get; set; }
}
