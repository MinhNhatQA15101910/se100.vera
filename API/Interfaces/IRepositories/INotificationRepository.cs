
using API.Entities;

namespace API.Interfaces.IRepositories;

public interface INotificationRepository
{
    void AddNotification(Notification notification);
    Task<Notification?> GetNotificationById(int id);
}
