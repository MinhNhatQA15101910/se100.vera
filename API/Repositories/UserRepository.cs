using API.Data;
using API.DTOs.Users;
using API.Entities;
using API.Helpers;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class UserRepository(
    UserManager<AppUser> userManager,
    DataContext context,
    IMapper mapper
) : IUserRepository
{
    public async Task<PagedList<UserDto>> GetArtistsAsync(UserParams userParams)
    {
        var query = context.Users.AsQueryable();

        query = query.Where(u => u.UserRoles.Any(ur => ur.Role.Name == "Artist"));

        // Remove current user
        query = query.Where(u => u.NormalizedEmail != userParams.CurrentEmail!.ToUpper());

        // Filter by gender
        if (userParams.Gender != null)
        {
            query = query.Where(u => u.Gender == userParams.Gender);
        }

        // Filter by first name
        if (userParams.FirstName != null)
        {
            query = query.Where(u => u.FirstName.Contains(userParams.FirstName));
        }

        // Filter by last name
        if (userParams.LastName != null)
        {
            query = query.Where(u => u.LastName.Contains(userParams.LastName));
        }

        // Filter by artist name
        if (userParams.ArtistName != null)
        {
            query = query.Where(
                u => u.ArtistName != null &&
                u.ArtistName.Contains(userParams.ArtistName)
            );
        }

        // Filter by email
        if (userParams.Email != null)
        {
            query = query.Where(u => u.NormalizedEmail == userParams.Email.ToUpper());
        }

        // Order
        query = userParams.OrderBy switch
        {
            "email" => userParams.SortBy == "asc"
                        ? query.OrderBy(u => u.Email)
                        : query.OrderByDescending(u => u.Email),
            "firstName" => userParams.SortBy == "asc"
                        ? query.OrderBy(u => u.FirstName)
                        : query.OrderByDescending(u => u.FirstName),
            "lastName" => userParams.SortBy == "asc"
                        ? query.OrderBy(u => u.LastName)
                        : query.OrderByDescending(u => u.LastName),
            "artistName" => userParams.SortBy == "asc"
                        ? query.OrderBy(u => u.ArtistName)
                        : query.OrderByDescending(u => u.ArtistName),
            _ => query.OrderBy(u => u.Email)
        };

        return await PagedList<UserDto>.CreateAsync(
            query.ProjectTo<UserDto>(mapper.ConfigurationProvider),
            userParams.PageNumber,
            userParams.PageSize
        );
    }

    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
        return await userManager.Users
            .Include(u => u.Photos)
            .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .Include(u => u.Plans).ThenInclude(p => p.Plan)
            .SingleOrDefaultAsync(u => u.Id == id);
    }

    public async Task<PagedList<UserDto>> GetUsersAsync(UserParams userParams)
    {
        var query = context.Users.AsQueryable();

        // Remove current user
        query = query.Where(u => u.NormalizedEmail != userParams.CurrentEmail!.ToUpper());

        // Filter by gender
        if (userParams.Gender != null)
        {
            query = query.Where(u => u.Gender == userParams.Gender);
        }

        // Filter by first name
        if (userParams.FirstName != null)
        {
            query = query.Where(u => u.FirstName.Contains(userParams.FirstName));
        }

        // Filter by last name
        if (userParams.LastName != null)
        {
            query = query.Where(u => u.LastName.Contains(userParams.LastName));
        }

        // Filter by artist name
        if (userParams.ArtistName != null)
        {
            query = query.Where(
                u => u.ArtistName != null &&
                u.ArtistName.Contains(userParams.ArtistName)
            );
        }

        // Filter by email
        if (userParams.Email != null)
        {
            query = query.Where(u => u.NormalizedEmail == userParams.Email.ToUpper());
        }

        // Order
        query = userParams.OrderBy switch
        {
            "email" => userParams.SortBy == "asc"
                        ? query.OrderBy(u => u.Email)
                        : query.OrderByDescending(u => u.Email),
            "firstName" => userParams.SortBy == "asc"
                        ? query.OrderBy(u => u.FirstName)
                        : query.OrderByDescending(u => u.FirstName),
            "lastName" => userParams.SortBy == "asc"
                        ? query.OrderBy(u => u.LastName)
                        : query.OrderByDescending(u => u.LastName),
            "artistName" => userParams.SortBy == "asc"
                        ? query.OrderBy(u => u.ArtistName)
                        : query.OrderByDescending(u => u.ArtistName),
            _ => query.OrderBy(u => u.Email)
        };

        return await PagedList<UserDto>.CreateAsync(
            query.ProjectTo<UserDto>(mapper.ConfigurationProvider),
            userParams.PageNumber,
            userParams.PageSize
        );
    }

    public async Task<int> GetTotalUsersAsync()
    {
        return await context.Users.CountAsync(u => !u.UserRoles.Any(ur => ur.Role.Name == "Admin"));
    }

    public async Task<int> GetTotalArtistsAsync()
    {
        return await context.Users.CountAsync(u => u.UserRoles.Any(ur => ur.Role.Name == "Artist"));
    }
}
