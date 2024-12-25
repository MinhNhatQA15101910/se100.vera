namespace API.DTOs.Songs;

public class UpdateSongDto
{
   public string? SongName { get; set; }

   public string? Description { get; set; }

   public IFormFile? MusicFile { get; set; }

   public int PublisherId { get; set; }

   public List<IFormFile>? PhotoFiles { get; set; }

   public IFormFile? LyricFile { get; set; }

   [Required]
   public required List<int> GenreIds { get; set; }
}
