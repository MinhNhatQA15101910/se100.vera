using API.Data;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class UnitOfWork(
    DataContext context,
    IAlbumRepository albumRepository,
    IAlbumSongRepository albumSongRepository,
    IArtistSongRepository artistSongRepository,
    IGenreRepository genreRepository,
    IPlaylistRepository playlistRepository,
    IPlaylistSongRepository playlistSongRepository,
    ISongGenreRepository songGenreRepository,
    ISongRepository songRepository,
    IUserRepository userRepository
) : IUnitOfWork
{
    public IAlbumRepository AlbumRepository => albumRepository;
    public IAlbumSongRepository AlbumSongRepository => albumSongRepository;
    public IArtistSongRepository ArtistSongRepository => artistSongRepository;
    public IGenreRepository GenreRepository => genreRepository;
    public IPlaylistRepository PlaylistRepository => playlistRepository;
    public IPlaylistSongRepository PlaylistSongRepository => playlistSongRepository;
    public ISongGenreRepository SongGenreRepository => songGenreRepository;
    public ISongRepository SongRepository => songRepository;
    public IUserRepository UserRepository => userRepository;

    public async Task<bool> Complete()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public bool HasChanges()
    {
        return context.ChangeTracker.HasChanges();
    }
}
