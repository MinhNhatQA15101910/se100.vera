using API.DTOs.Files;
using API.DTOs.Users;
using API.Entities;

namespace API.DTOs.Songs;

public class SongDto
{
    public int Id { get; set; }
    public required string SongName { get; set; }
    public required string PublisherName { get; set; }
    public string? PublisherImageUrl { get; set; }
    //public required List<UserDto> Artists { get; set; }
    public required List<string> Genres { get; set; }
    public int TotalView { get; set; }
    public required string MusicUrl { get; set; }
    public string? MusicPublicId { get; set; }
    public string? LyricUrl { get; set; }
    public string? LyricPublicId { get; set; }
    public string? SongPhotoUrl { get; set; }
    public string? SongPhotoPublicId { get; set; }
}
