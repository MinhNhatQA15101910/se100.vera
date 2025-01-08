using API.Entities;

namespace API.Interfaces.IServices;

public interface ITokenService
{
    Task<string> CreateTokenAsync(AppUser user);
}
