namespace API.Entities;

public class SubscriptionPlan
{
    public int Id { get; set; }
    public required string PlanName { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public List<PaymentDetail> Payments { get; set; } = [];

    // Navigation properties
    public int UserId { get; set; }
    public AppUser User { get; set; } = null!;
}
