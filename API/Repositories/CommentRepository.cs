using API.Data;
using API.DTOs.Comments;
using API.Entities;
using API.Helpers;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class CommentRepository(DataContext context, IMapper mapper) : ICommentRepository
{
    public void AddComment(Comment comment)
    {
        context.Comments.Add(comment);
    }

    public void DeleteComment(Comment comment)
    {
        context.Comments.Remove(comment);
    }

    public async Task<Comment?> GetCommentById(int id)
    {
        return await context.Comments
            .Include(c => c.Publisher).ThenInclude(p => p.Photos)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<PagedList<CommentDto>> GetCommentsAsync(CommentParams commentParams)
    {
        var query = context.Comments.AsQueryable();

        if (commentParams.PublisherId != null)
        {
            query = query.Where(s => s.PublisherId.ToString() == commentParams.PublisherId);
        }

        if (commentParams.SongId != null)
        {
            query = query.Where(s => s.SongId.ToString() == commentParams.SongId);
        }

        query = commentParams.OrderBy switch
        {
            "createdAt" => commentParams.SortBy == "asc"
                ? query.OrderBy(s => s.CreatedAt)
                : query.OrderByDescending(s => s.CreatedAt),
            _ => query.OrderByDescending(s => s.CreatedAt)
        };

        return await PagedList<CommentDto>.CreateAsync(
            query.ProjectTo<CommentDto>(mapper.ConfigurationProvider),
            commentParams.PageNumber,
            commentParams.PageSize
        );
    }
}
