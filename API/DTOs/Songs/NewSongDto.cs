namespace API.DTOs.Songs;

public class NewSongDto
{
    [Required]
    public required string SongName { get; set; }

    [Required]
    public required string Description { get; set; }

    [Required]
    public required IFormFile MusicFile { get; set; }

    public int PublisherId { get; set; }

    public IFormFile? PhotoFile { get; set; }

    public IFormFile? LyricFile { get; set; }

    [Required]
    public required List<int> GenreIds { get; set; }

    public required List<int> ArtistIds { get; set; }
}
