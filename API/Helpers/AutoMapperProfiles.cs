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
                    s => s.Photos.FirstOrDefault(x => x.IsMain)!.Photo.Url
                )
            )
            .ForMember(
                d => d.Photos,
                o => o.MapFrom(
                    s => s.Photos.Select(x => new FileDto
                    {
                        Id = x.Photo.Id,
                        Url = x.Photo.Url,
                        IsMain = x.IsMain
                    })
                )
            )
            .ForMember(
                d => d.Roles,
                o => o.MapFrom(
                    s => s.UserRoles.Select(x => x.Role.Name)
                )
            );
        CreateMap<RegisterDto, AppUser>()
            .ForMember(
                u => u.UserName,
                r => r.MapFrom(x => x.FirstName.ToLower() + x.LastName.ToLower())
            );

        CreateMap<Song, SongDto>()
            .ForMember(
                d => d.SongPhotoUrl,
                o => o.MapFrom(
                    s => s.Photos == null ? null : s.Photos.FirstOrDefault(x => x.IsMain)!.Photo.Url
                )
            )
            .ForMember(
                d => d.SongPhotoPublicId,
                o => o.MapFrom(
                    s => s.Photos == null ? null : s.Photos.FirstOrDefault(x => x.IsMain)!.Photo.PublicId
                )
            )
            .ForMember(
                d => d.Genres,
                o => o.MapFrom(
                    s => s.Genres.Select(sg => sg.Genre.GenreName).ToList()
                )
            );
        // .ForMember(
        //     d => d.Artists,
        //     o => o.MapFrom(
        //         s => s.Artists.Select(x => new UserDto
        //         {
        //             Id = x.Artist.Id,
        //             FirstName = x.Artist.FirstName,
        //             LastName = x.Artist.LastName,
        //             Email = x.Artist.Email,
        //             Gender = x.Artist.Gender,
        //             PhotoUrl = x.Artist.Photos.FirstOrDefault(x => x.IsMain)!.Photo.Url
        //         })
        //     )
        // );
        CreateMap<NewSongDto, Song>();
        CreateMap<UpdateSongDto, Song>();
        CreateMap<SongPhoto, FileDto>()
            .ForMember(
                f => f.Id,
                photos => photos.MapFrom(p => p.Photo.Id)
            )
            .ForMember(
                f => f.Url,
                photos => photos.MapFrom(p => p.Photo.Url)
            );
        CreateMap<UserPhoto, FileDto>()
            .ForMember(
                f => f.Id,
                photos => photos.MapFrom(p => p.Photo.Id)
            )
            .ForMember(
                f => f.Url,
                photos => photos.MapFrom(p => p.Photo.Url)
            );
        CreateMap<AlbumPhoto, FileDto>();
        CreateMap<SongGenre, Genre>();
    }
}
