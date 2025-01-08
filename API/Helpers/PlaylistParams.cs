namespace API.Helpers;

public class PlaylistParams : PaginationParams
{
   public string? PlaylistName { get; set; }
   public string? PublisherId { get; set; }
   public string? OrderBy { get; set; } = "playlistName";
   public string? SortBy { get; set; } = "asc";
}
