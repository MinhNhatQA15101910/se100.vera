using API.DTOs.Albums;
using API.Entities;

namespace API.Interfaces;

public interface IAlbumRepository
{
    Task<Album> CreateAlbumAsync(NewAlbumDto newAlbumDto);
    Task<bool> SaveChangesAsync();
}
