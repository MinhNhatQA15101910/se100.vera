
using API.DTOs.SubscriptionPlans;
using API.Entities;
using API.Helpers;

namespace API.Interfaces.IRepositories;

public interface ISubscriptionPlanRepository
{
    Task<SubscriptionPlan?> GetPlanByIdAsync(int id);
    Task<PagedList<SubscriptionPlanDto>> GetPlansAsync(PlanParams planParams);
}
