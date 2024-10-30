namespace API.Entities;

public class Payment
{
    public int Id { get; set; }
    public int Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    public required string PaymentMethod { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<PaymentDetail> SubscriptionPlans { get; set; } = [];

    // Navigation properties
    public int ListenerId { get; set; }
    public AppUser Listener { get; set; } = null!;
}
