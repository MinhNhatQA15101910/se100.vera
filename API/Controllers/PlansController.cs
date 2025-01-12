using System;
using API.DTOs.SubscriptionPlans;
using API.Interfaces.IRepositories;

namespace API.Controllers;

public class PlansController(IUnitOfWork unitOfWork, IMapper mapper) : BaseApiController
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<SubscriptionPlanDto>> GetPlanById(int id)
    {
        var plan = await unitOfWork.SubscriptionPlanRepository.GetPlanByIdAsync(id);
        if (plan == null)
        {
            return NotFound();
        }

        return mapper.Map<SubscriptionPlanDto>(plan);
    }
}
