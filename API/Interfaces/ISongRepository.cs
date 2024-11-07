using API.DTOs.Songs;
using API.Entities;

namespace API.Interfaces;

public interface ISongRepository
{
    Task<SongDto?> GetSongByIdAsync(int id);
    Task<Song> AddSongAsync(NewSongDto newSongDto);
    Task<bool> SaveChangesAsync();
}
