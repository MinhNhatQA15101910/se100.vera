using API.Data;
using API.Entities;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class SubscriptionPlanRepository(DataContext context) : ISubscriptionPlanRepository
{
    public async Task<SubscriptionPlan?> GetPlanByIdAsync(int id)
    {
        return await context.SubscriptionPlans.FindAsync(id);
    }
}
