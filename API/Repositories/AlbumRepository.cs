using API.Data;
using API.DTOs.Albums;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class AlbumRepository(DataContext context, IMapper mapper) : IAlbumRepository
{
    public async Task<Album> CreateAlbumAsync(NewAlbumDto newAlbumDto)
    {
        var album = mapper.Map<Album>(newAlbumDto);

        await context.Albums.AddAsync(album);
        await context.SaveChangesAsync();

        return album;
    }

    public async Task<Album?> GetAlbumByIdAsync(int id)
    {
        return await context.Albums
            // Include album photos navigation
            .Include(a => a.Photos).ThenInclude(ap => ap.Photo)
            // Include song photos
            .Include(a => a.Songs).ThenInclude(albumSong => albumSong.Song)
            .ThenInclude(s => s.Photos).ThenInclude(sp => sp.Photo)
            // Include song genres
            .Include(a => a.Songs).ThenInclude(albumSong => albumSong.Song)
            .ThenInclude(s => s.Genres).ThenInclude(sg => sg.Genre)
            // Include song username info
            .Include(a => a.Songs).ThenInclude(albumSong => albumSong.Song)
            .ThenInclude(s => s.Publisher).ThenInclude(p => p.Photos).ThenInclude(pp => pp.Photo)
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
