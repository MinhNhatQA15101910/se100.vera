using API.Data;
using API.DTOs.Songs;
using API.Interfaces;

namespace API.Repositories;

public class SongRepository(DataContext context, IMapper mapper) : ISongRepository
{
    public async Task<SongDto?> GetSongById(int id)
    {
        var song = await context.Songs.FindAsync(id);

        return mapper.Map<SongDto>(song);
    }

}
