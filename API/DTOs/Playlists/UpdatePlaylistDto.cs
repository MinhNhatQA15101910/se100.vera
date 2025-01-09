namespace API.DTOs.Playlists;

public class UpdatePlaylistDto
{
   public int PublisherId { get; set; }
   public string? PlaylistName { get; set; }
   public string? Description { get; set; }
}
