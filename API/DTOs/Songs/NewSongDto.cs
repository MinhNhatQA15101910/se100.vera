using API.Entities;

namespace API.DTOs.Songs;

public class NewSongDto
{
    [Required]
    public required string SongName { get; set; }

    [Required]
    public required string ArtistName { get; set; }

    [Required]
    public required string MusicUrl { get; set; }

    public string? LyricUrl { get; set; }
}
