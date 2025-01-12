using API.Data;
using API.Entities;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class NotificationRepository(DataContext context) : INotificationRepository
{
    public void AddNotification(Notification notification)
    {
        context.Notifications.Add(notification);
    }

    public async Task<Notification?> GetNotificationById(int id)
    {
        return await context.Notifications.FindAsync(id);
    }
}
