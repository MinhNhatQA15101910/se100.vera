using API.Data;
using API.DTOs.Albums;
using API.Entities;
using API.Helpers;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class AlbumRepository(DataContext context, IMapper mapper) : IAlbumRepository
{
    public void DeleteAlbum(Album album)
    {
        context.Albums.Remove(album);
    }

    public async Task<Album?> GetAlbumByIdAsync(int id)
    {
        return await context.Albums
            // Include album publisher
            .Include(a => a.Publisher).ThenInclude(p => p.Photos)
            // Include album photos navigation
            .Include(a => a.Photos)
            // Include artists
            .Include(a => a.Artists).ThenInclude(aa => aa.Artist)
            // Include song photos
            .Include(a => a.Songs).ThenInclude(albumSong => albumSong.Song)
            .ThenInclude(s => s.Photos)
            // Include song genres
            .Include(a => a.Songs).ThenInclude(albumSong => albumSong.Song)
            .ThenInclude(s => s.Genres).ThenInclude(sg => sg.Genre)
            // Include song username info
            .Include(a => a.Songs).ThenInclude(albumSong => albumSong.Song)
            .ThenInclude(s => s.Publisher).ThenInclude(p => p.Photos)
            // Include favorite users
            .Include(a => a.UserFavorites)
            // Include genre            
            .Include(a => a.Genres).ThenInclude(ag => ag.Genre)
            // Execute query
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<PagedList<AlbumDto>> GetAlbumsAsync(AlbumParams albumParams)
    {
        var query = context.Albums.AsQueryable();

        if (albumParams.PublisherId != null)
        {
            query = query.Where(s => s.PublisherId.ToString() == albumParams.PublisherId);
        }

        if (albumParams.Keyword != null)
        {
            query = query.Where(s => s.AlbumName.ToLower().Contains(albumParams.Keyword.ToLower()));
        }

        if (albumParams.ArtistName != null)
        {
            query = query.Where(s => s.Artists.Any(a => a.Artist.ArtistName!.Contains(albumParams.ArtistName)));
        }

        if (albumParams.GenreName != null)
        {
            query = query.Where(s => s.Genres.Any(a => a.Genre.GenreName.Contains(albumParams.GenreName)));
        }

        query = albumParams.OrderBy switch
        {
            "albumName" => albumParams.SortBy == "asc"
                ? query.OrderBy(s => s.AlbumName)
                : query.OrderByDescending(s => s.AlbumName),
            "artistName" => albumParams.SortBy == "asc"
                ? query.OrderBy(s => s.Publisher.ArtistName)
                : query.OrderByDescending(s => s.Publisher.ArtistName),
            "createdAt" => albumParams.SortBy == "asc"
                ? query.OrderBy(s => s.CreatedAt)
                : query.OrderByDescending(s => s.CreatedAt),
            _ => query.OrderByDescending(s => s.CreatedAt)
        };

        return await PagedList<AlbumDto>.CreateAsync(
            query.ProjectTo<AlbumDto>(mapper.ConfigurationProvider),
            albumParams.PageNumber,
            albumParams.PageSize
        );
    }

    public async Task<PagedList<AlbumDto>> GetFavoriteAlbumsAsync(int userId, AlbumParams albumParams)
    {
        var query = context.Albums.AsQueryable();

        query = query.Where(a => a.UserFavorites.Any(f => f.UserId == userId));

        if (albumParams.Keyword != null)
        {
            query = query.Where(s => s.AlbumName.ToLower().Contains(albumParams.Keyword.ToLower()));
        }

        if (albumParams.ArtistName != null)
        {
            query = query.Where(s => s.Artists.Any(a => a.Artist.ArtistName!.Contains(albumParams.ArtistName)));
        }

        if (albumParams.GenreName != null)
        {
            query = query.Where(s => s.Genres.Any(a => a.Genre.GenreName.Contains(albumParams.GenreName)));
        }

        query = albumParams.OrderBy switch
        {
            "albumName" => albumParams.SortBy == "asc"
                ? query.OrderBy(s => s.AlbumName)
                : query.OrderByDescending(s => s.AlbumName),
            "artistName" => albumParams.SortBy == "asc"
                ? query.OrderBy(s => s.Publisher.ArtistName)
                : query.OrderByDescending(s => s.Publisher.ArtistName),
            "createdAt" => albumParams.SortBy == "asc"
                ? query.OrderBy(s => s.CreatedAt)
                : query.OrderByDescending(s => s.CreatedAt),
            _ => query.OrderByDescending(s => s.CreatedAt)
        };

        return await PagedList<AlbumDto>.CreateAsync(
            query.ProjectTo<AlbumDto>(mapper.ConfigurationProvider),
            albumParams.PageNumber,
            albumParams.PageSize
        );
    }

    public async Task<int> GetTotalAlbumsAsync()
    {
        return await context.Albums.CountAsync();
    }

    public void CreateAlbum(Album album)
    {
        context.Albums.Add(album);
    }
}
