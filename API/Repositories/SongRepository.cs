using API.Data;
using API.DTOs.Songs;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class SongRepository(DataContext context, IMapper mapper) : ISongRepository
{
    public async Task<SongDto?> GetSongByIdAsync(int id)
    {
        var song = await context.Songs.FindAsync(id);

        return mapper.Map<SongDto>(song);
    }

    public async Task<AppSong> AddSongAsync(NewSongDto newSongDto)
    {
        var song = mapper.Map<AppSong>(newSongDto);

        var newSong = await context.Songs.AddAsync(song);

        return newSong.Entity;
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
