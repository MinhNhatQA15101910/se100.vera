namespace API.DTOs.Notifications;

public class NotificationDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public required string Content { get; set; }
    public required string Type { get; set; }
    public int? NotifyEntityId { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsRead { get; set; }
}
