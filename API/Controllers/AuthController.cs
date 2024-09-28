using API.Data;
using API.DTOs.Users;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AuthController(DataContext dataContext, IMapper mapper) : BaseApiController
{
    // Testing
    [HttpGet] // /api/users
    public async Task<ActionResult<UserDto>> GetFirstUser()
    {
        var user = await dataContext.Users.ProjectTo<UserDto>(mapper.ConfigurationProvider).FirstOrDefaultAsync();

        return Ok(user);
    }

    // [HttpPost("signup")]
    // public async Task<ActionResult<UserDto>> Signup(RegisterDto registerDto)
    // {

    // }
}
