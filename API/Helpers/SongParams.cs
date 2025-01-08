namespace API.Helpers;

public class SongParams : PaginationParams
{
   public string? PublisherId { get; set; }
   public string? SongName { get; set; }
   public string? Artist { get; set; }
   public string? OrderBy { get; set; } = "songName";
   public string? SortBy { get; set; } = "asc";
}
