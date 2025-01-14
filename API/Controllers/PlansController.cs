using API.DTOs.SubscriptionPlans;
using API.Entities;
using API.Extensions;
using API.Helpers;
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SubscriptionPlanDto>>> GetPlans([FromQuery] PlanParams planParams)
    {
        var plans = await unitOfWork.SubscriptionPlanRepository.GetPlansAsync(planParams);

        Response.AddPaginationHeader(plans);

        return plans;
    }

    [HttpPost("subscribe/{id:int}")]
    [Authorize]
    public async Task<ActionResult> Subscribe(int id)
    {
        var userId = User.GetUserId();

        var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (user == null) return NotFound("Could not find user");

        var plan = await unitOfWork.SubscriptionPlanRepository.GetPlanByIdAsync(id);
        if (plan == null) return NotFound("Could not find plan");

        if (user.Plans.Any(p => p.PlanId == plan.Id))
        {
            return BadRequest("User is already subscribed to this plan");
        }

        user.Plans.Add(new UserPlan
        {
            UserId = user.Id,
            PlanId = plan.Id
        });

        if (!await unitOfWork.Complete()) return BadRequest("Could not subscribe user to plan");

        return Ok();
    }
}
