using API.DTOs.Albums;
using API.Entities;
using API.Helpers;

namespace API.Interfaces.IRepositories;

public interface IAlbumRepository
{
    Task<Album> CreateAlbumAsync(NewAlbumDto newAlbumDto);
    Task<Album?> GetAlbumByIdAsync(int id);
    Task<PagedList<AlbumDto>> GetAlbumsAsync(AlbumParams albumParams);
}