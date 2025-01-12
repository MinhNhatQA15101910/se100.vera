namespace API.DTOs.SubscriptionPlans;

public class SubscriptionPlanDto
{
    public int Id { get; set; }
    public required string PlanName { get; set; }
    public required string Description { get; set; }
    public decimal PricePerMonth { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
