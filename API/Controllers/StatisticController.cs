using API.DTOs.Statistic;
using API.Interfaces.IRepositories;

namespace API.Controllers;

public class StatisticController(
   IUnitOfWork unitOfWork
) : BaseApiController
{
   [HttpGet]
   [Authorize(Roles = "Admin")]
   public async Task<ActionResult<StatisticDto>> GetAllStatistics()
   {
      var totalSongs = await unitOfWork.SongRepository.GetTotalSongsAsync();
      var totalUsers = await unitOfWork.UserRepository.GetTotalUsersAsync();
      var totalArtists = await unitOfWork.UserRepository.GetTotalArtistsAsync();
      var totalAlbums = await unitOfWork.AlbumRepository.GetTotalAlbumsAsync();
      var totalPlaylists = await unitOfWork.PlaylistRepository.GetTotalPlaylistsAsync();
      var totalGenres = await unitOfWork.GenreRepository.GetTotalGenresAsync();

      return new StatisticDto
      {
         totalSongs = totalSongs,
         totalUsers = totalUsers,
         totalArtists = totalArtists,
         totalAlbums = totalAlbums,
         totalPlaylists = totalPlaylists,
         totalGenres = totalGenres
      };
   }
}
