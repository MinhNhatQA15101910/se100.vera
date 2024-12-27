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

    public async Task<AlbumSong?> GetAlbumSongAsync(int albumId, int songId)
    {
        return await context.AlbumSongs.FindAsync(albumId, songId);
    }

    public Task<List<AlbumSong>> GetAlbumSongsAsync(int songId)
    {
        return context.AlbumSongs
            .Where(x => x.SongId == songId)
            .ToListAsync();
    }

    public void RemoveAlbumSong(AlbumSong albumSong)
    {
        context.AlbumSongs.Remove(albumSong);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
