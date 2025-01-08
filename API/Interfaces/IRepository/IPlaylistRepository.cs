using API.Entities;
using API.DTOs.Playlists;

namespace API.Interfaces;

public interface IPlaylistRepository
{
   Task<Playlist> CreatePlaylistAsync(NewPlaylistDto newPlaylistDto);
   Task<Playlist?> GetPlaylistByIdAsync(int id);
   Task<bool> SaveChangesAsync();
}
