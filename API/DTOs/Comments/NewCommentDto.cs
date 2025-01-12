namespace API.DTOs.Comments;

public class NewCommentDto
{
    [Required]
    public required string Content { get; set; }

    [Required]
    public int SongId { get; set; }

    public int? PublisherId { get; set; }
}
