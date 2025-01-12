namespace API.Helpers;

public class NotificationParams : PaginationParams
{
    public string? UserId { get; set; }
    public string? OrderBy { get; set; } = "createdAt";
    public string? SortBy { get; set; } = "desc";
}
