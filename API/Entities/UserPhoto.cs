namespace API.Entities;


[Table("UserPhotos")]
public class UserPhoto
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    // Navigation properties
    public int UserId { get; set; }
    public AppUser User { get; set; } = null!;
}
