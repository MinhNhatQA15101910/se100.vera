namespace API.Helpers;

public class PlanParams : PaginationParams
{
    public string? UserId { get; set; }
    public string? OrderBy { get; set; } = "price";
    public string? SortBy { get; set; } = "desc";
}
