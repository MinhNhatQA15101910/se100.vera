namespace API.Entities;

public class Payment
{
    public int Id { get; set; }
    public int Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    public required string PaymentMethod { get; set; }
    public List<PaymentDetail> SubscriptionPlans { get; set; } = [];

    // Navigation properties
    public int UserId { get; set; }
    public AppUser User { get; set; } = null!;
}
