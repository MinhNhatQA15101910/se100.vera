using API.Data;
using API.Entities;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class CommentRepository(DataContext context) : ICommentRepository
{
    public void AddComment(Comment comment)
    {
        context.Comments.Add(comment);
    }

    public async Task<Comment?> GetCommentById(int id)
    {
        return await context.Comments
            .Include(c => c.Publisher).ThenInclude(p => p.Photos)
            .FirstOrDefaultAsync(c => c.Id == id);
    }
}
