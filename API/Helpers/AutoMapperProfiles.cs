using API.DTOs.Users;
using API.DTOs.Songs;
using API.Entities;
using API.DTOs.Files;
using API.DTOs.Albums;

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
        CreateMap<NewAlbumDto, Album>();
        CreateMap<Album, AlbumDto>()
            .ForMember(
                a => a.PhotoUrl,
                o => o.MapFrom(
                    s => s.Photos == null ? null : s.Photos.FirstOrDefault(x => x.IsMain)!.Photo.Url
                )
            )
            .ForMember(
                a => a.Photos,
                o => o.MapFrom(
                    s => s.Photos.Select(x => x.Photo.Url).ToList()
                )
            );
        CreateMap<AlbumSong, SongDto>()
            .ForMember(
                s => s.Id,
                o => o.MapFrom(x => x.Song.Id)
            )
            .ForMember(
                s => s.SongName,
                o => o.MapFrom(x => x.Song.SongName)
            )
            .ForMember(
                s => s.PublisherName,
                o => o.MapFrom(x => x.Song.Publisher.UserName)
            )
            .ForMember(
                s => s.PublisherImageUrl,
                o => o.MapFrom(x => x.Song.Publisher.Photos.FirstOrDefault(x => x.IsMain)!.Photo.Url)
            )
            .ForMember(
                s => s.Genres,
                o => o.MapFrom(x => x.Song.Genres.Select(x => x.Genre.GenreName).ToList())
            )
            .ForMember(
                s => s.TotalView,
                o => o.MapFrom(x => x.Song.TotalListeningHours)
            )
            .ForMember(
                s => s.MusicUrl,
                o => o.MapFrom(x => x.Song.MusicUrl)
            )
            .ForMember(
                s => s.LyricUrl,
                o => o.MapFrom(x => x.Song.LyricUrl)
            )
            .ForMember(
                s => s.SongPhotoUrl,
                o => o.MapFrom(x => x.Song.Photos.FirstOrDefault(x => x.IsMain)!.Photo.Url)
            );
    }
}
