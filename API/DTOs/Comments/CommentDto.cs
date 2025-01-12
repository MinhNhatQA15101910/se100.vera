namespace API.DTOs.Comments;

public class CommentDto
{
    public int Id { get; set; }
    public required string Content { get; set; }
    public required string PublisherName { get; set; }
    public required string PublisherPhotoUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
