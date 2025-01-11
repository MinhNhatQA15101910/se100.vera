using API.DTOs.Albums;
using API.Entities;
using API.Helpers;

namespace API.Interfaces.IRepositories;

public interface IAlbumRepository
{
    void CreateAlbum(Album album);
    Task<Album> CreateAlbumAsync(NewAlbumDto newAlbumDto);
    void DeleteAlbum(Album album);
    Task<Album?> GetAlbumByIdAsync(int id);
    Task<PagedList<AlbumDto>> GetAlbumsAsync(AlbumParams albumParams);
    Task<PagedList<AlbumDto>> GetFavoriteAlbumsAsync(int userId, AlbumParams albumParams);
    Task<int> GetTotalAlbumsAsync();
}
