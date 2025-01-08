using API.Data;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class UnitOfWork(
    DataContext context,
    IAlbumPhotoRepository albumPhotoRepository,
    IAlbumRepository albumRepository,
    IAlbumSongRepository albumSongRepository,
    IArtistSongRepository artistSongRepository,
    IGenreRepository genreRepository,
    IPhotoRepository photoRepository,
    IPlaylistRepository playlistRepository,
    IPlaylistSongRepository playlistSongRepository,
    ISongGenreRepository songGenreRepository,
    ISongPhotoRepository songPhotoRepository,
    ISongRepository songRepository,
    IUserPhotoRepository userPhotoRepository,
    IUserRepository userRepository
) : IUnitOfWork
{
    public IAlbumPhotoRepository AlbumPhotoRepository => albumPhotoRepository;
    public IAlbumRepository AlbumRepository => albumRepository;
    public IAlbumSongRepository AlbumSongRepository => albumSongRepository;
    public IArtistSongRepository ArtistSongRepository => artistSongRepository;
    public IGenreRepository GenreRepository => genreRepository;
    public IPhotoRepository PhotoRepository => photoRepository;
    public IPlaylistRepository PlaylistRepository => playlistRepository;
    public IPlaylistSongRepository PlaylistSongRepository => playlistSongRepository;
    public ISongGenreRepository SongGenreRepository => songGenreRepository;
    public ISongPhotoRepository SongPhotoRepository => songPhotoRepository;
    public ISongRepository SongRepository => songRepository;
    public IUserPhotoRepository UserPhotoRepository => userPhotoRepository;
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
