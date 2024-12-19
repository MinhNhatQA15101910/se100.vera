using API.Data;
using API.DTOs.Songs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.Services;

namespace API.Repositories;

public class SongRepository(DataContext context, IMapper mapper) : ISongRepository
{
    public async Task<Song?> GetSongByIdAsync(int id)
    {
        return await context.Songs
            .Include(s => s.Genres).ThenInclude(s => s.Genre)
            .SingleOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Song> AddSongAsync(NewSongDto newSongDto)
    {
        var song = mapper.Map<Song>(newSongDto);

        await context.Songs.AddAsync(song);
        await context.SaveChangesAsync();

        return song;
    }


    public Task<bool> DeleteSongAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<PagedList<SongDto>> GetSongsAsync(SongParams songParams)
    {
        var query = context.Songs.AsQueryable();

        if (songParams.SongName != null)
        {
            query = query.Where(s => s.SongName.Contains(songParams.SongName));
        }

        query = songParams.OrderBy switch
        {
            "songName" => songParams.SortBy == "asc" ? query.OrderBy(s => s.SongName) : query.OrderByDescending(s => s.SongName),
            _ => query.OrderBy(s => s.SongName)
        };

        return await PagedList<SongDto>.CreateAsync(
            query.ProjectTo<SongDto>(mapper.ConfigurationProvider),
            songParams.PageNumber,
            songParams.PageSize
        );
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
