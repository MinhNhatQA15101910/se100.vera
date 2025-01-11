using API.Data;
using API.DTOs.Songs;
using API.Entities;
using API.Helpers;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class SongRepository(DataContext context, IMapper mapper) : ISongRepository
{
    public async Task<Song?> GetSongByIdAsync(int id)
    {
        return await context.Songs
            .Include(s => s.Photos)
            .Include(s => s.Genres).ThenInclude(g => g.Genre)
            .Include(s => s.Publisher).ThenInclude(p => p.Photos)
            .Include(s => s.Artists).ThenInclude(sa => sa.Artist)
            .Include(s => s.UserFavorites).ThenInclude(sf => sf.User)
            .SingleOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Song> AddSongAsync(NewSongDto newSongDto)
    {
        var song = mapper.Map<Song>(newSongDto);

        await context.Songs.AddAsync(song);
        await context.SaveChangesAsync();

        return song;
    }

    public void RemoveSong(Song song)
    {
        context.Songs.Remove(song);
    }

    public async Task<PagedList<SongDto>> GetSongsAsync(SongParams songParams)
    {
        var query = context.Songs.AsQueryable();

        if (songParams.PublisherId != null)
        {
            query = query.Where(s => s.PublisherId.ToString() == songParams.PublisherId);
        }

        if (songParams.Keyword != null)
        {
            query = query.Where(s => s.SongName.ToLower().Contains(songParams.Keyword.ToLower()));
        }

        if (songParams.ArtistName != null)
        {
            query = query.Where(s => s.Artists.Any(
                sa => sa.Artist.ArtistName != null &&
                sa.Artist.ArtistName.Contains(songParams.ArtistName)
                )
            );
        }

        query = songParams.OrderBy switch
        {
            "songName" => songParams.SortBy == "asc"
                ? query.OrderBy(s => s.SongName)
                : query.OrderByDescending(s => s.SongName),
            "artistName" => songParams.SortBy == "asc"
                ? query.OrderBy(s => s.Publisher.ArtistName)
                : query.OrderByDescending(s => s.Publisher.ArtistName),
            "createdAt" => songParams.SortBy == "asc"
                ? query.OrderBy(s => s.CreatedAt)
                : query.OrderByDescending(s => s.CreatedAt),
            _ => query.OrderByDescending(s => s.CreatedAt)
        };

        return await PagedList<SongDto>.CreateAsync(
            query.ProjectTo<SongDto>(mapper.ConfigurationProvider),
            songParams.PageNumber,
            songParams.PageSize
        );
    }

    public async Task<int> GetTotalSongsAsync()
    {
        return await context.Songs.CountAsync();
    }

    public void AddFavoriteUser(SongFavorite songFavorite)
    {
        context.FavoriteSongs.Add(songFavorite);
    }

    public void RemoveFavoriteUser(SongFavorite songFavorite)
    {
        context.FavoriteSongs.Remove(songFavorite);
    }

    public async Task<SongFavorite?> GetSongFavoriteAsync(int songId, int userId)
    {
        return await context.FavoriteSongs
            .SingleOrDefaultAsync(sf => sf.SongId == songId && sf.UserId == userId);
    }

    public async Task<PagedList<SongDto>> GetFavoriteSongsAsync(int userId, SongParams songParams)
    {
        var query = context.Songs.AsQueryable();

        query = query.Where(s => s.UserFavorites.Any(sf => sf.UserId == userId));

        if (songParams.PublisherId != null)
        {
            query = query.Where(s => s.PublisherId.ToString() == songParams.PublisherId);
        }

        if (songParams.Keyword != null)
        {
            query = query.Where(s => s.SongName.Contains(songParams.Keyword));
        }

        if (songParams.ArtistName != null)
        {
            query = query.Where(s => s.Artists.Any(
                sa => sa.Artist.ArtistName != null &&
                sa.Artist.ArtistName.Contains(songParams.ArtistName)
                )
            );
        }

        query = songParams.OrderBy switch
        {
            "songName" => songParams.SortBy == "asc"
                ? query.OrderBy(s => s.SongName)
                : query.OrderByDescending(s => s.SongName),
            "artist" => songParams.SortBy == "asc"
                ? query.OrderBy(s => s.Artists.FirstOrDefault()!.Artist.ArtistName)
                : query.OrderByDescending(s => s.Artists.FirstOrDefault()!.Artist.ArtistName),
            "createdAt" => songParams.SortBy == "asc"
                ? query.OrderBy(s => s.CreatedAt)
                : query.OrderByDescending(s => s.CreatedAt),
            _ => query.OrderByDescending(s => s.CreatedAt)
        };

        return await PagedList<SongDto>.CreateAsync(
            query.ProjectTo<SongDto>(mapper.ConfigurationProvider),
            songParams.PageNumber,
            songParams.PageSize
        );
    }

    public void AddSong(Song song)
    {
        context.Songs.Add(song);
    }

    public void AddSongGenre(SongGenre songGenre)
    {
        context.SongGenres.Add(songGenre);
    }

    public void AddArtistSong(ArtistSong artistSong)
    {
        context.ArtistSongs.Add(artistSong);
    }
}
