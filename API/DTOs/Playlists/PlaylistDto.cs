using API.DTOs.Songs;
using API.DTOs.Users;

namespace API.DTOs.Playlists;

public class PlaylistDto
{
   public int Id { get; set; }
   public required string PlaylistName { get; set; }
   public string? Description { get; set; }
   public int TotalListeningHours { get; set; }
   public int TotalSongs { get; set; }
   public DateTime CreatedAt { get; set; }
   public UserDto? Publisher { get; set; }
   public List<SongDto>? Songs { get; set; }
}
