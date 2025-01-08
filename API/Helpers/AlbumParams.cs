namespace API.Helpers;

public class AlbumParams : PaginationParams
{
    public string? PublisherId { get; set; }
    public string? AlbumName { get; set; }
    public string? OrderBy { get; set; } = "albumName";
    public string? SortBy { get; set; } = "asc";
}
