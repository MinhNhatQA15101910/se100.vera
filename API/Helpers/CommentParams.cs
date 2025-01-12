namespace API.Helpers;

public class CommentParams : PaginationParams
{
    public string? PublisherId { get; set; }
    public string? SongId { get; set; }
    public string? OrderBy { get; set; } = "createdAt";
    public string? SortBy { get; set; } = "desc";
}
