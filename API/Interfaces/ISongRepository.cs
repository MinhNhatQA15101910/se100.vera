using API.DTOs.Songs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface ISongRepository
{
    Task<SongDto?> GetSongByIdAsync(int id);
    Task<Song> AddSongAsync(NewSongDto newSongDto);
    Task<bool> DeleteSongAsync(int id);
    Task<PagedList<SongDto>> GetSongsAsync(SongParams songParams);
    Task<bool> SaveChangesAsync();
}
