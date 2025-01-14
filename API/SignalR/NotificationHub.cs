using API.Interfaces.IRepositories;

namespace API.SignalR;

public class NotificationHub(IUnitOfWork unitOfWork) : Hub
{
    // Dictionary to store user and connection ID mappings
    public static readonly ConcurrentDictionary<string, string> UserConnections = new();

    // When a user connects
    public override Task OnConnectedAsync()
    {
        string userId = Context.User!.FindFirst(ClaimTypes.NameIdentifier)!.Value;

        string connectionId = Context.ConnectionId;
        UserConnections[userId] = connectionId;

        return base.OnConnectedAsync();
    }

    // When a user disconnects
    public override Task OnDisconnectedAsync(Exception? exception)
    {
        string userName = Context.User!.Identity!.Name!;
        UserConnections.TryRemove(userName, out _);

        return base.OnDisconnectedAsync(exception);
    }

    public async Task SendNotificationToUser(int notificationId)
    {
        var notification = await unitOfWork.NotificationRepository.GetNotificationById(notificationId);
        if (notification == null)
        {
            throw new HubException("Notification not found.");
        }

        int userId = notification.UserId;

        if (UserConnections.TryGetValue(userId.ToString(), out string? userConnectionId))
        {
            await Clients.Client(userConnectionId).SendAsync("ReceiveNotification", notification);
        }
    }

}
