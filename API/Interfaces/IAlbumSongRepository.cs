using API.Entities;

namespace API.Interfaces;

public interface IAlbumSongRepository
{
    void AddAlbumSong(AlbumSong albumSong);
    Task<bool> SaveChangesAsync();
}
