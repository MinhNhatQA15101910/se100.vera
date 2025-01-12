namespace API.Entities;

public class Notification
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public required string Content { get; set; }
    public required string Type { get; set; }
    public string? NotifyEntityId { get; set; }
    public bool IsRead { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public int UserId { get; set; }
    public AppUser User { get; set; } = null!;
}
