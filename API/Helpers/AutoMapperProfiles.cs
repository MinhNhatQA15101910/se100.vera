using API.DTOs.Artists;
using API.DTOs.Files;
using API.DTOs.Genres;
using API.DTOs.Songs;
using API.DTOs.Users;
using API.Entities;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<UserPhoto, FileDto>();

        CreateMap<SongPhoto, FileDto>();

        CreateMap<AppUser, UserDto>()
            .ForMember(
                d => d.PhotoUrl,
                o => o.MapFrom(
                    s => s.Photos.FirstOrDefault(x => x.IsMain)!.Url
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
                r => r.MapFrom(x => RemoveDiacritics(
                    x.FirstName.Replace(" ", "").ToLower() + x.LastName.Replace(" ", "").ToLower()
                    )
                )
            );

        CreateMap<Song, SongDto>()
            .ForMember(
                d => d.PublisherName,
                o => o.MapFrom(
                    s => s.Publisher.ArtistName
                )
            )
            .ForMember(
                d => d.PublisherImageUrl,
                o => o.MapFrom(
                    s => s.Publisher.Photos.FirstOrDefault(x => x.IsMain)!.Url
                )
            )
            .ForMember(
                d => d.PhotoUrl,
                o => o.MapFrom(
                    s => s.Photos == null ? null : s.Photos.FirstOrDefault(x => x.IsMain)!.Url
                )
            )
            .ForMember(
                d => d.Genres,
                o => o.MapFrom(
                    s => s.Genres.Select(sg => sg.Genre.GenreName).ToList()
                )
            );

        CreateMap<ArtistSong, ArtistDto>()
            .ForMember(
                d => d.Id,
                o => o.MapFrom(
                    s => s.Artist.Id
                )
            )
            .ForMember(
                d => d.ArtistName,
                o => o.MapFrom(
                    s => s.Artist.ArtistName
                )
            );

        CreateMap<NewSongDto, Song>();

        CreateMap<UpdateSongDto, Song>();

        CreateMap<Genre, GenreDto>();

        CreateMap<AddUpdateGenreDto, Genre>();
        // CreateMap<ArtistSong, UserDto>()
        //     .ForMember(
        //         d => d.Id,
        //         o => o.MapFrom(
        //             s => s.Artist.Id
        //         )
        //     )
        //     .ForMember(
        //         d => d.Email,
        //         o => o.MapFrom(
        //             s => s.Artist.Email
        //         )
        //     )
        //     .ForMember(
        //         d => d.FirstName,
        //         o => o.MapFrom(
        //             s => s.Artist.FirstName
        //         )
        //     )
        //     .ForMember(
        //         d => d.LastName,
        //         o => o.MapFrom(
        //             s => s.Artist.LastName
        //         )
        //     )
        //     .ForMember(
        //         d => d.ArtistName,
        //         o => o.MapFrom(
        //             s => s.Artist.ArtistName
        //         )
        //     )
        //     .ForMember(
        //         d => d.PhotoUrl,
        //         o => o.MapFrom(
        //             s => s.Artist.Photos.FirstOrDefault(x => x.IsMain)!.Photo.Url
        //         )
        //     )
        //     .ForMember(
        //         d => d.Gender,
        //         o => o.MapFrom(s => s.Artist.Gender)
        //     )
        //     .ForMember(
        //         d => d.DateOfBirth,
        //         o => o.MapFrom(s => s.Artist.DateOfBirth)
        //     )
        //     .ForMember(
        //         d => d.About,
        //         o => o.MapFrom(s => s.Artist.About)
        //     )
        //     .ForMember(
        //         d => d.CreatedAt,
        //         o => o.MapFrom(s => s.Artist.CreatedAt)
        //     )
        //     .ForMember(
        //         d => d.Photos,
        //         o => o.MapFrom(
        //             s => s.Artist.Photos.Select(x => new FileDto
        //             {
        //                 Id = x.Photo.Id,
        //                 Url = x.Photo.Url,
        //                 IsMain = x.IsMain
        //             })
        //         )
        //     )
        //     .ForMember(
        //         d => d.Roles,
        //         o => o.MapFrom(
        //             s => s.Artist.UserRoles.Select(x => x.Role.Name)
        //         )
        //     );
        // CreateMap<ArtistSong, ArtistDto>()
        //     .ForMember(
        //         d => d.Id,
        //         o => o.MapFrom(
        //             s => s.Artist.Id
        //         )
        //     )
        //     .ForMember(
        //         d => d.ArtistName,
        //         o => o.MapFrom(
        //             s => s.Artist.ArtistName
        //         )
        //     );
        // CreateMap<SongPhoto, FileDto>()
        //     .ForMember(
        //         f => f.Id,
        //         photos => photos.MapFrom(p => p.Photo.Id)
        //     )
        //     .ForMember(
        //         f => f.Url,
        //         photos => photos.MapFrom(p => p.Photo.Url)
        //     );

        // CreateMap<UserPhoto, FileDto>()
        //     .ForMember(
        //         f => f.Id,
        //         photos => photos.MapFrom(p => p.Photo.Id)
        //     )
        //     .ForMember(
        //         f => f.Url,
        //         photos => photos.MapFrom(p => p.Photo.Url)
        //     );
        // CreateMap<AlbumPhoto, FileDto>();
        // CreateMap<SongGenre, Genre>();
        // CreateMap<NewAlbumDto, Album>();
        // CreateMap<Album, AlbumDto>()
        //     .ForMember(
        //         a => a.PhotoUrl,
        //         o => o.MapFrom(
        //             s => s.Photos == null ? null : s.Photos.FirstOrDefault(x => x.IsMain)!.Photo.Url
        //         )
        //     )
        //     .ForMember(
        //         a => a.Photos,
        //         o => o.MapFrom(
        //             s => s.Photos.Select(x => x.Photo.Url).ToList()
        //         )
        //     );
        // CreateMap<AlbumSong, SongOrderDto>()
        //     .ForMember(
        //         s => s.Song,
        //         o => o.MapFrom(x => x.Song)
        //     );
        // CreateMap<ArtistAlbum, ArtistDto>()
        //     .ForMember(
        //         a => a.Id,
        //         o => o.MapFrom(x => x.Artist.Id)
        //     )
        //     .ForMember(
        //         a => a.ArtistName,
        //         o => o.MapFrom(x => x.Artist.ArtistName)
        //     );
        // CreateMap<NewPlaylistDto, Playlist>();
        // CreateMap<UpdatePlaylistDto, Playlist>()
        //     .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        // CreateMap<Playlist, PlaylistDto>();
        // CreateMap<UpdateAlbumDto, Album>();
    }

    static string RemoveDiacritics(string text)
    {
        var normalizedString = text.Normalize(NormalizationForm.FormD);
        var stringBuilder = new StringBuilder();

        foreach (var c in normalizedString)
        {
            var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
            if (unicodeCategory != UnicodeCategory.NonSpacingMark)
            {
                stringBuilder.Append(c);
            }
        }

        return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
    }
}
