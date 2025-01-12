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
      var totalViews = await unitOfWork.SongRepository.GetTotalViewsAsync();
      var totalDownloads = await unitOfWork.SongRepository.GetTotalDownloadsAsync();

      return new StatisticDto
      {
         TotalSongs = totalSongs,
         TotalUsers = totalUsers,
         TotalArtists = totalArtists,
         TotalAlbums = totalAlbums,
         TotalPlaylists = totalPlaylists,
         TotalGenres = totalGenres,
         TotalViews = totalDownloads,
         TotalDownloads = totalViews,
      };
   }
}
