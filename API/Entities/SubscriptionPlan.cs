namespace API.Entities;

public class SubscriptionPlan
{
    public int Id { get; set; }
    public required string PlanName { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<PaymentDetail> Payments { get; set; } = [];

    // Navigation properties
    public int ListenerId { get; set; }
    public AppUser Listener { get; set; } = null!;
}
