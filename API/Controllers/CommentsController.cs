using API.DTOs.Comments;
using API.Entities;
using API.Extensions;
using API.Interfaces.IRepositories;

namespace API.Controllers;

public class CommentsController(IUnitOfWork unitOfWork, IMapper mapper) : BaseApiController
{
    [HttpGet("{id}")]
    public async Task<ActionResult<CommentDto>> GetCommentById(int id)
    {
        var comment = await unitOfWork.CommentRepository.GetCommentById(id);

        if (comment == null)
        {
            return NotFound();
        }

        return mapper.Map<CommentDto>(comment);
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

        // Add publisher to comment
        var publisher = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (publisher == null)
        {
            return NotFound("Publisher not found.");
        }
        comment.Publisher = publisher;

        return CreatedAtAction(
            nameof(GetCommentById),
            new { id = comment.Id },
            mapper.Map<CommentDto>(comment)
        );
    }
}
