using API.Entities;

namespace API.Interfaces.IRepositories;

public interface IAlbumSongRepository
{
    void AddAlbumSong(AlbumSong albumSong);
    Task<AlbumSong?> GetAlbumSongAsync(int albumId, int songId);
    Task<List<AlbumSong>> GetAlbumSongsAsync(int songId);
    void RemoveAlbumSong(AlbumSong albumSong);
}