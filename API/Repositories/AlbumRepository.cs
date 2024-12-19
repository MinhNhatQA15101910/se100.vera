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

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
