namespace API.DTOs.Comments;

public class UpdateCommentDto
{
    [Required]
    public required string Content { get; set; }
}
