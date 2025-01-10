namespace API.Entities;

public class Comment
{
    public int Id { get; set; }
    public string? Content { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public int PublisherId { get; set; }
    public AppUser Publisher { get; set; } = null!;
    public int SongId { get; set; }
    public Song Song { get; set; } = null!;
    public List<CommentPhoto> Photos { get; set; } = [];
}
