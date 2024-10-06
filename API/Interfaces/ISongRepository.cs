using API.DTOs.Songs;

namespace API.Interfaces;

public interface ISongRepository
{
    Task<SongDto?> GetSongById(int id);
}
