using API.DTOs.Comments;
using API.Entities;
using API.Helpers;

namespace API.Interfaces.IRepositories;

public interface ICommentRepository
{
    void AddComment(Comment comment);
    Task<Comment?> GetCommentById(int id);
    Task<PagedList<CommentDto>> GetCommentsAsync(CommentParams commentParams);
}
