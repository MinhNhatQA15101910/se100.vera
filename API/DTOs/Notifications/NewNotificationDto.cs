using API.Entities;

namespace API.DTOs.Notifications;

public class NewNotificationDto
{
    public string? Title { get; set; }

    [Required]
    public required string Content { get; set; }

    [Required, EnumDataType(typeof(NotificationType))]
    public required string Type { get; set; }

    [Required]
    public required int UserId { get; set; }

    public int? NotifyEntityId { get; set; }
}
