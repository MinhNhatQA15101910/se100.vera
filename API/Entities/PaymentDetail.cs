namespace API.Entities;

[Table("PaymentDetails")]
public class PaymentDetail
{
    public int PaymentId { get; set; }
    public Payment Payment { get; set; } = null!;
    public int SubscriptionPlanId { get; set; }
    public SubscriptionPlan SubscriptionPlan { get; set; } = null!;
}
