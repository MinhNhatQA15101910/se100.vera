using API.Entities;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(UserManager<AppUser> userManager)
    {
        if (await userManager.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

        if (users == null) return;

        foreach (var user in users)
        {
            await userManager.CreateAsync(user, "Pa$$w0rd");
        }
    }

    public static async Task SeedSongs(DataContext context)
    {
        if (await context.Songs.AnyAsync()) return;

        var songData = await File.ReadAllTextAsync("Data/SongSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var songs = JsonSerializer.Deserialize<List<AppSong>>(songData, options);

        if (songs == null) return;

        foreach (var song in songs)
        {
            context.Songs.Add(song);
        }

        await context.SaveChangesAsync();
    }

    public static async Task SeedAlbums(DataContext context)
    {
        if (await context.Albums.AnyAsync()) return;

        var albumData = await File.ReadAllTextAsync("Data/AlbumSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var albums = JsonSerializer.Deserialize<List<AppAlbum>>(albumData, options);

        if (albums == null) return;

        foreach (var album in albums)
        {
            context.Albums.Add(album);
        }

        await context.SaveChangesAsync();
    }

    public static async Task SeedPlaylists(DataContext context)
    {
        if (await context.Playlists.AnyAsync()) return;

        var playlistData = await File.ReadAllTextAsync("Data/PlaylistSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var playlists = JsonSerializer.Deserialize<List<AppPlaylist>>(playlistData, options);

        if (playlists == null) return;

        foreach (var playlist in playlists)
        {
            context.Playlists.Add(playlist);
        }

        await context.SaveChangesAsync();
    }

    public static async Task SeedGenres(DataContext context)
    {
        if (await context.Genres.AnyAsync()) return;

        var genreData = await File.ReadAllTextAsync("Data/GenreSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var genres = JsonSerializer.Deserialize<List<AppGenre>>(genreData, options);

        if (genres == null) return;

        foreach (var genre in genres)
        {
            context.Genres.Add(genre);
        }

        await context.SaveChangesAsync();
    }
}
