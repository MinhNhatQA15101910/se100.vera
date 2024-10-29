using API.DTOs.Users;
using API.DTOs.Songs;
using API.Entities;
using API.DTOs.Files;

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
        CreateMap<UserPhoto, FileDto>();
        CreateMap<RegisterDto, AppUser>()
            .ForMember(
                u => u.UserName,
                r => r.MapFrom(x => x.FirstName.ToLower() + x.LastName.ToLower())
            );

        CreateMap<AppSong, SongDto>()
            .ForMember(
                d => d.SongPhotoUrl,
                o => o.MapFrom(
                    s => s.SongPhotos == null ? null : s.SongPhotos.FirstOrDefault(x => x.IsMain)!.Url
                )
            );
        CreateMap<SongPhoto, FileDto>();
        CreateMap<NewSongDto, AppSong>();
    }
}
