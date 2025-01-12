
using API.Entities;

namespace API.Interfaces.IRepositories;

public interface ISubscriptionPlanRepository
{
    Task<SubscriptionPlan?> GetPlanByIdAsync(int id);
}
