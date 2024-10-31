namespace API.Entities;


[Table("UserPhotos")]
public class UserPhoto
{
    public int UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public int PhotoId { get; set; }
    public Photo Photo { get; set; } = null!;
    public bool IsMain { get; set; }
}
