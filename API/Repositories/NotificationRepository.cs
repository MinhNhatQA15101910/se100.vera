using API.Data;
using API.DTOs.Notifications;
using API.Entities;
using API.Helpers;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class NotificationRepository(DataContext context, IMapper mapper) : INotificationRepository
{
    public void AddNotification(Notification notification)
    {
        context.Notifications.Add(notification);
    }

    public async Task<Notification?> GetNotificationById(int id)
    {
        return await context.Notifications.FindAsync(id);
    }

    public async Task<PagedList<NotificationDto>> GetNotificationsAsync(NotificationParams notificationParams)
    {
        var query = context.Notifications.AsQueryable();

        if (notificationParams.UserId != null)
        {
            query = query.Where(s => s.UserId.ToString() == notificationParams.UserId);
        }

        query = notificationParams.OrderBy switch
        {
            "createdAt" => notificationParams.SortBy == "asc"
                ? query.OrderBy(s => s.CreatedAt)
                : query.OrderByDescending(s => s.CreatedAt),
            _ => query.OrderByDescending(s => s.CreatedAt)
        };

        query = query.OrderBy(s => s.IsRead);

        return await PagedList<NotificationDto>.CreateAsync(
            query.ProjectTo<NotificationDto>(mapper.ConfigurationProvider),
            notificationParams.PageNumber,
            notificationParams.PageSize
        );
    }
}
