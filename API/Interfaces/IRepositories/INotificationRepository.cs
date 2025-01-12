
using API.DTOs.Notifications;
using API.Entities;
using API.Helpers;

namespace API.Interfaces.IRepositories;

public interface INotificationRepository
{
    void AddNotification(Notification notification);
    Task<Notification?> GetNotificationById(int id);
    Task<PagedList<NotificationDto>> GetNotificationsAsync(NotificationParams notificationParams);
}
