using API.Data;
using API.DTOs.SubscriptionPlans;
using API.Entities;
using API.Helpers;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class SubscriptionPlanRepository(DataContext context, IMapper mapper) : ISubscriptionPlanRepository
{
    public async Task<SubscriptionPlan?> GetPlanByIdAsync(int id)
    {
        return await context.SubscriptionPlans.FindAsync(id);
    }

    public async Task<PagedList<SubscriptionPlanDto>> GetPlansAsync(PlanParams planParams)
    {
        var query = context.SubscriptionPlans.AsQueryable();

        if (planParams.UserId != null)
        {
            query = query.Where(p => p.Users.Any(u => u.UserId.ToString() == planParams.UserId));
        }

        query = planParams.OrderBy switch
        {
            "price" => planParams.SortBy == "asc"
                ? query.OrderBy(s => s.PricePerMonth)
                : query.OrderByDescending(s => s.PricePerMonth),
            "createdAt" => planParams.SortBy == "asc"
                ? query.OrderBy(s => s.CreatedAt)
                : query.OrderByDescending(s => s.CreatedAt),
            _ => query.OrderByDescending(s => s.CreatedAt)
        };

        return await PagedList<SubscriptionPlanDto>.CreateAsync(
            query.ProjectTo<SubscriptionPlanDto>(mapper.ConfigurationProvider),
            planParams.PageNumber,
            planParams.PageSize
        );
    }
}
