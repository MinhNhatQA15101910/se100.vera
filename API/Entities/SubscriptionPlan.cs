namespace API.Entities;

public class SubscriptionPlan
{
    public int Id { get; set; }
    public required string PlanName { get; set; }
    public required string Description { get; set; }
    public decimal PricePerMonth { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<UserPlan> Users { get; set; } = [];
}
