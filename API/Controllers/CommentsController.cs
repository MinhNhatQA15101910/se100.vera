using API.DTOs.Comments;
using API.DTOs.Notifications;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces.IRepositories;
using API.SignalR;

namespace API.Controllers;

public class CommentsController(IUnitOfWork unitOfWork, IMapper mapper, IHubContext<NotificationHub> notificationHub) : BaseApiController
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<CommentDto>> GetCommentById(int id)
    {
        var comment = await unitOfWork.CommentRepository.GetCommentById(id);

        if (comment == null)
        {
            return NotFound();
        }

        return mapper.Map<CommentDto>(comment);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CommentDto>>> GetComments([FromQuery] CommentParams commentParams)
    {
        var comments = await unitOfWork.CommentRepository.GetCommentsAsync(commentParams);

        Response.AddPaginationHeader(comments);

        return comments;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<CommentDto>> AddComment(NewCommentDto newCommentDto)
    {
        var userId = User.GetUserId();
        newCommentDto.PublisherId = userId;

        var comment = mapper.Map<Comment>(newCommentDto);
        unitOfWork.CommentRepository.AddComment(comment);

        // Save comment
        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to add comment.");
        }

        // Notify to song's publisher
        var song = await unitOfWork.SongRepository.GetSongByIdAsync(newCommentDto.SongId);
        if (song == null)
        {
            return NotFound("Song not found.");
        }

        // Add publisher to comment
        var publisher = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (publisher == null)
        {
            return NotFound("Publisher not found.");
        }
        comment.Publisher = publisher;

        if (song.PublisherId != userId)
        {
            var notification = new Notification
            {
                UserId = song.Id,
                Title = "New comment",
                Content = $"User {publisher.FirstName} {publisher.LastName} commented on your song {song.SongName}.",
                Type = NotificationType.SongCommented.ToString(),
            };
            unitOfWork.NotificationRepository.AddNotification(notification);

            // Save notification
            if (!await unitOfWork.Complete())
            {
                return BadRequest("Failed to notify to song's publisher.");
            }

            if (NotificationHub.UserConnections.TryGetValue(song.Id.ToString(), out string? userConnectionId))
            {
                await notificationHub.Clients.Client(userConnectionId).SendAsync("ReceiveNotification", mapper.Map<NotificationDto>(notification));
            }
        }

        return CreatedAtAction(
            nameof(GetCommentById),
            new { id = comment.Id },
            mapper.Map<CommentDto>(comment)
        );
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<ActionResult<CommentDto>> UpdateComment(int id, UpdateCommentDto updateCommentDto)
    {
        var comment = await unitOfWork.CommentRepository.GetCommentById(id);
        if (comment == null)
        {
            return NotFound("Comment not found.");
        }

        // Check user role
        var userId = User.GetUserId();
        if (!User.IsInRole("Admin") && comment.PublisherId != userId)
        {
            return Unauthorized("You are not authorized to update this comment.");
        }

        mapper.Map(updateCommentDto, comment);

        // Update timestamp
        comment.UpdatedAt = DateTime.UtcNow;

        // Save comment
        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to update comment.");
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<ActionResult<CommentDto>> DeleteComment(int id)
    {
        var comment = await unitOfWork.CommentRepository.GetCommentById(id);
        if (comment == null)
        {
            return NotFound("Comment not found.");
        }

        // Check user role
        var userId = User.GetUserId();
        if (!User.IsInRole("Admin") && comment.PublisherId != userId)
        {
            return Unauthorized("You are not authorized to delete this comment.");
        }

        unitOfWork.CommentRepository.DeleteComment(comment);

        // Save comment
        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to delete comment.");
        }

        return Ok();
    }
}
