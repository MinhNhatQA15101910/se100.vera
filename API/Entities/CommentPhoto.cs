namespace API.Entities;

[Table("CommentPhotos")]
public class CommentPhoto
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? PublicId { get; set; }
    public bool IsMain { get; set; }

    // Navigation properties
    public int CommentId { get; set; }
    public Comment Comment { get; set; } = null!;
}
