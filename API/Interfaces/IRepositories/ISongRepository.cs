using API.DTOs.Songs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces.IRepositories;

public interface ISongRepository
{
    Task<Song?> GetSongByIdAsync(int id);
    Task<Song> AddSongAsync(NewSongDto newSongDto);
    void RemoveSong(Song song);
    Task<PagedList<SongDto>> GetSongsAsync(SongParams songParams);
}