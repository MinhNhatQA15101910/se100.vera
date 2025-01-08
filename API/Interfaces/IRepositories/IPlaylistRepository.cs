using API.Entities;
using API.DTOs.Playlists;

namespace API.Interfaces.IRepositories;

public interface IPlaylistRepository
{
   Task<Playlist> CreatePlaylistAsync(NewPlaylistDto newPlaylistDto);
   Task<Playlist?> GetPlaylistByIdAsync(int id);
}
