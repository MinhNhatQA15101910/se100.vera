namespace API.Helpers;

public class PlaylistParams : PaginationParams
{
   public string? Keyword { get; set; }
   public string? PublisherId { get; set; }
   public string? OrderBy { get; set; } = "createdAt";
   public string? SortBy { get; set; } = "desc";
}
