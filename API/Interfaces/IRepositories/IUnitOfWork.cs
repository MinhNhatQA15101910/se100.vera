namespace API.Interfaces.IRepositories;

public interface IUnitOfWork
{
    IAlbumPhotoRepository AlbumPhotoRepository { get; }
    IAlbumRepository AlbumRepository { get; }
    IAlbumSongRepository AlbumSongRepository { get; }
    IArtistSongRepository ArtistSongRepository { get; }
    IGenreRepository GenreRepository { get; }
    IPhotoRepository PhotoRepository { get; }
    IPlaylistRepository PlaylistRepository { get; }
    IPlaylistSongRepository PlaylistSongRepository { get; }
    ISongGenreRepository SongGenreRepository { get; }
    ISongPhotoRepository SongPhotoRepository { get; }
    ISongRepository SongRepository { get; }
    IUserPhotoRepository UserPhotoRepository { get; }
    IUserRepository UserRepository { get; }
    Task<bool> Complete();
    bool HasChanges();
}
