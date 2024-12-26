namespace API.DTOs.Playlists;

public class NewPlaylistDto
{
   public int PublisherId { get; set; }
   public required string PlaylistName { get; set; }
   public string? Description { get; set; }
   public string? PhotoUrl { get; set; }
}
