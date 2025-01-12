using API.Entities;

namespace API.Interfaces.IRepositories;

public interface ICommentRepository
{
    void AddComment(Comment comment);
    Task<Comment?> GetCommentById(int id);
}
