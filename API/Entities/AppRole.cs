namespace API.Entities;

public class AppRole : IdentityRole
{
    public ICollection<AppUserRole> UserRoles { get; set; } = [];
}
