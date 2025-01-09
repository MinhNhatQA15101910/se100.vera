using API.DTOs.Songs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces.IRepositories;

public interface ISongRepository
{
    void AddFavoriteUser(SongFavorite songFavorite);
    Task<Song> AddSongAsync(NewSongDto newSongDto);
    Task<PagedList<SongDto>> GetFavoriteSongsAsync(int userId, SongParams songParams);
    Task<SongFavorite?> GetSongFavoriteAsync(int songId, int userId);
    Task<Song?> GetSongByIdAsync(int id);
    Task<PagedList<SongDto>> GetSongsAsync(SongParams songParams);
    void RemoveFavoriteUser(SongFavorite songFavorite);
    void RemoveSong(Song song);
}
