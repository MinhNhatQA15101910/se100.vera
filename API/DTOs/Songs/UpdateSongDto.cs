namespace API.DTOs.Songs;

public class UpdateSongDto
{
   public string? SongName { get; set; }

   public string? Description { get; set; }

   public IFormFile? MusicFile { get; set; }

   public int PublisherId { get; set; }

   public IFormFile? PhotoFile { get; set; }

   public IFormFile? LyricFile { get; set; }

   public List<int>? GenreIds { get; set; }

   public List<int>? ArtistIds { get; set; }
}
