namespace API.Entities;

enum RegisterRole
{
    Listener,
    Artist
}

public class AppRole : IdentityRole<int>
{
    public ICollection<AppUserRole> UserRoles { get; set; } = [];
}
