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

    public List<IFormFile>? PhotoFiles { get; set; }

    public IFormFile? LyricFile { get; set; }

    public List<string>? GenresId { get; set; }
}
