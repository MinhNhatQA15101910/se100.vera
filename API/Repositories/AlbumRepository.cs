using API.Data;
using API.DTOs.Albums;
using API.Entities;
using API.Helpers;
using API.Interfaces.IRepositories;

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
            // Include artists
            .Include(a => a.Artists).ThenInclude(aa => aa.Artist)
            // Include song photos
            .Include(a => a.Songs).ThenInclude(albumSong => albumSong.Song)
            .ThenInclude(s => s.Photos).ThenInclude(sp => sp.Photo)
            // Include song genres
            .Include(a => a.Songs).ThenInclude(albumSong => albumSong.Song)
            .ThenInclude(s => s.Genres).ThenInclude(sg => sg.Genre)
            // Include song username info
            .Include(a => a.Songs).ThenInclude(albumSong => albumSong.Song)
            .ThenInclude(s => s.Publisher).ThenInclude(p => p.Photos).ThenInclude(pp => pp.Photo)
            // Execute query
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<PagedList<AlbumDto>> GetAlbumsAsync(AlbumParams albumParams)
    {
        var query = context.Albums.AsQueryable();

        query = query.Where(s => s.Songs.Count > 0);

        if (albumParams.PublisherId != null)
        {
            query = query.Where(s => s.PublisherId.ToString() == albumParams.PublisherId);
        }

        if (albumParams.AlbumName != null)
        {
            query = query.Where(s => s.AlbumName.Contains(albumParams.AlbumName));
        }

        query = albumParams.OrderBy switch
        {
            "albumName" => albumParams.SortBy == "asc" ? query.OrderBy(s => s.AlbumName) : query.OrderByDescending(s => s.AlbumName),
            _ => query.OrderBy(s => s.AlbumName)
        };

        return await PagedList<AlbumDto>.CreateAsync(
            query.ProjectTo<AlbumDto>(mapper.ConfigurationProvider),
            albumParams.PageNumber,
            albumParams.PageSize
        );
    }
}
