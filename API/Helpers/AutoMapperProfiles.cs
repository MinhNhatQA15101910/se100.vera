using API.DTOs.Albums;
using API.DTOs.Artists;
using API.DTOs.Comments;
using API.DTOs.Files;
using API.DTOs.Genres;
using API.DTOs.Playlists;
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

        CreateMap<AlbumPhoto, FileDto>();

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

        CreateMap<UpdateUserDto, AppUser>();

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
            )
            .ForMember(
                d => d.Artists,
                o => o.MapFrom(
                    s => s.Artists.Select(x => x.Artist)
                )
            );

        CreateMap<NewSongDto, Song>();

        CreateMap<UpdateSongDto, Song>();

        CreateMap<Genre, GenreDto>();

        CreateMap<AddUpdateGenreDto, Genre>();

        CreateMap<Album, AlbumDto>()
            .ForMember(
                a => a.PhotoUrl,
                o => o.MapFrom(
                    s => s.Photos == null ? null : s.Photos.FirstOrDefault(x => x.IsMain)!.Url
                )
            )
            .ForMember(
                a => a.Songs,
                o => o.MapFrom(s => s.Songs)
            )
            .ForMember(
                a => a.Artists,
                o => o.MapFrom(s => s.Artists.Select(x => x.Artist))
            )
            .ForMember(
                d => d.Genres,
                o => o.MapFrom(
                    s => s.Genres.Select(sg => sg.Genre.GenreName).ToList()
                )
            );

        CreateMap<AppUser, ArtistDto>();

        CreateMap<AlbumSong, SongOrderDto>();

        CreateMap<NewAlbumDto, Album>();

        CreateMap<UpdateAlbumDto, Album>();

        CreateMap<NewPlaylistDto, Playlist>();

        CreateMap<Playlist, PlaylistDto>()
            .ForMember(
                p => p.Songs,
                o => o.MapFrom(
                    s => s.Songs.Select(x => x.Song)
                )
            );

        CreateMap<UpdatePlaylistDto, Playlist>();

        CreateMap<Comment, CommentDto>()
            .ForMember(
                c => c.PublisherName,
                o => o.MapFrom(
                    s => s.Publisher.FirstName + " " + s.Publisher.LastName
                )
            )
            .ForMember(
                c => c.PublisherPhotoUrl,
                o => o.MapFrom(
                    s => s.Publisher.Photos.FirstOrDefault(x => x.IsMain)!.Url
                )
            );

        CreateMap<NewCommentDto, Comment>();
    }

    static string RemoveDiacritics(string text)
    {
        text = text.Replace("đ", "d").Replace("Đ", "D");

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
