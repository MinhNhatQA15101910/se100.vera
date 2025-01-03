namespace API.Helpers;

public class AlbumParams : PaginationParams
{
    public string? AlbumName { get; set; }
    public string? OrderBy { get; set; } = "albumName";
    public string? SortBy { get; set; } = "asc";
}
