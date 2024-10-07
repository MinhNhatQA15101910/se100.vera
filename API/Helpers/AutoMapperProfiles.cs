using API.DTOs.Users;
using API.Entities;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, UserDto>()
            .ForMember(
                d => d.PhotoUrl,
                o => o.MapFrom(
                    s => s.Photos.FirstOrDefault(x => x.IsMain)!.Url
                )
            );
        CreateMap<Photo, PhotoDto>();
        CreateMap<RegisterDto, AppUser>();
    }
}
