namespace API.Helpers;

public class SongParams : PaginationParams
{
   public string? PublisherId { get; set; }
   public string? Keyword { get; set; }
   public string? ArtistName { get; set; }
   public string? OrderBy { get; set; } = "createdAt";
   public string? SortBy { get; set; } = "desc";
}
