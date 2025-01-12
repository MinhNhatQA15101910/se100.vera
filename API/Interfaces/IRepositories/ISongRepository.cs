using API.DTOs.Songs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces.IRepositories;

public interface ISongRepository
{
    void AddSong(Song song);
    Task<PagedList<SongDto>> GetFavoriteSongsAsync(int userId, SongParams songParams);
    Task<Song?> GetSongByIdAsync(int id);
    Task<PagedList<SongDto>> GetSongsAsync(SongParams songParams);
    Task<int> GetTotalSongsAsync();
    void RemoveSong(Song song);
}
