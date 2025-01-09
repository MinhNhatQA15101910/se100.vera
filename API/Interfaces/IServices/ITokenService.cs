using API.Controllers;
using API.Entities;

namespace API.Interfaces.IServices;

public interface ITokenService
{
    Task<string> CreateTokenAsync(AppUser user);
    string CreateVerifyPincodeTokenAsync(string email, PincodeAction action);
}
