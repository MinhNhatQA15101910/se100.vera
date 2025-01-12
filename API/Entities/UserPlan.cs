namespace API.Entities;

public class UserPlan
{
    public int UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public int PlanId { get; set; }
    public SubscriptionPlan Plan { get; set; } = null!;
}
