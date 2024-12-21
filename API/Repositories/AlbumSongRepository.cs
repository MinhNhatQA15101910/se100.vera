using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class AlbumSongRepository(DataContext context) : IAlbumSongRepository
{
    public void AddAlbumSong(AlbumSong albumSong)
    {
        context.AlbumSongs.Add(albumSong);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
