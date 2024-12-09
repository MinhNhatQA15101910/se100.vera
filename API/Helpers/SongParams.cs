namespace API.Helpers;

public class SongParams
{
   public string? Title { get; set; }
   public string? Artist { get; set; }
   public string? Genre { get; set; }
   public string? OrderBy { get; set; } = "title";
   public string? SortBy { get; set; } = "asc";

}
