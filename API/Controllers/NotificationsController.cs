using API.DTOs.Notifications;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces.IRepositories;

namespace API.Controllers;

public class NotificationsController(IUnitOfWork unitOfWork, IMapper mapper) : BaseApiController
{
    [HttpGet("{id:int}")]
    [Authorize]
    public async Task<ActionResult<NotificationDto>> GetNotificationById(int id)
    {
        var notification = await unitOfWork.NotificationRepository.GetNotificationById(id);
        if (notification == null)
        {
            return NotFound();
        }

        // Check user role
        var userId = User.GetUserId();
        if (!User.IsInRole("Admin") && userId != notification.UserId)
        {
            return Unauthorized("You are not authorized to view this notification.");
        }

        return mapper.Map<NotificationDto>(notification);
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<NotificationDto>>> GetNotifications([FromQuery] NotificationParams notificationParams)
    {
        var userId = User.GetUserId();
        notificationParams.UserId = userId.ToString();

        var notifications = await unitOfWork.NotificationRepository.GetNotificationsAsync(notificationParams);

        Response.AddPaginationHeader(notifications);

        return notifications;
    }

    [HttpPatch("read/{id:int}")]
    [Authorize]
    public async Task<ActionResult> MarkNotificationAsRead(int id)
    {
        var notification = await unitOfWork.NotificationRepository.GetNotificationById(id);
        if (notification == null)
        {
            return NotFound();
        }

        // Check user role
        var userId = User.GetUserId();
        if (!User.IsInRole("Admin") && userId != notification.UserId)
        {
            return Unauthorized("You are not authorized to mark this notification as read.");
        }

        notification.IsRead = true;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to mark notification as read");
        }

        return NoContent();
    }
}
