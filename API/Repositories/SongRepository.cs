using API.Data;
using API.DTOs.Songs;
using API.Entities;
using API.Interfaces;
using API.Services;

namespace API.Repositories;

public class SongRepository(DataContext context, IMapper mapper, IFileService _fileService) : ISongRepository
{
    public async Task<SongDto?> GetSongByIdAsync(int id)
    {
        var song = await context.Songs.FindAsync(id);

        return mapper.Map<SongDto>(song);
    }

    public async Task<Song> AddSongAsync(NewSongDto newSongDto)
    {
        var song = mapper.Map<Song>(newSongDto);

        if (newSongDto.MusicFile != null)
        {
            var uploadResult = await _fileService.UploadAudioResult(song.SongName, newSongDto.MusicFile);
            song.MusicUrl = uploadResult.Url.ToString();

        }

        if (newSongDto.PhotoFiles != null)
        {
            foreach (var photo in newSongDto.PhotoFiles)
            {
                var uploadResult = await _fileService.UploadImageAsync(song.SongName, photo);
            }
        }

        if (newSongDto.LyricFile != null)
        {
            var uploadResult = await _fileService.UploadImageAsync(song.SongName, newSongDto.LyricFile);
            song.LyricUrl = uploadResult.Url.ToString();
        }

        var newSong = await context.Songs.AddAsync(song);
        return newSong.Entity;
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
