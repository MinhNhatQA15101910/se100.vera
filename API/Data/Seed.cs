using API.Entities;

namespace API.Data;

public class Seed
{
    public static async Task SeedPhotos(DataContext context)
    {
        if (await context.Photos.AnyAsync()) return;

        var photoData = await File.ReadAllTextAsync("Data/PhotoSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var photos = JsonSerializer.Deserialize<List<Photo>>(photoData, options);

        if (photos == null) return;

        foreach (var photo in photos)
        {
            context.Photos.Add(photo);
        }

        await context.SaveChangesAsync();
    }

    public static async Task SeedUsers(
        DataContext context,
        UserManager<AppUser> userManager,
        RoleManager<AppRole> roleManager
    )
    {
        if (await userManager.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

        if (users == null) return;

        if (!await roleManager.Roles.AnyAsync())
        {
            var roles = new List<AppRole>
            {
                new() { Name = "Listener" },
                new() { Name = "Artist" },
                new() { Name = "Admin" }
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
        }

        foreach (var user in users)
        {
            await userManager.CreateAsync(user, "Pa$$w0rd");

            if (user.FirstName == "Admin")
            {
                await userManager.AddToRoleAsync(user, "Admin");
            }
            else if (user.ArtistName != null)
            {
                await userManager.AddToRoleAsync(user, "Artist");
            }
            else
            {
                await userManager.AddToRoleAsync(user, "Listener");
            }
        }

        await SeedUserPhotos(context);
    }

    public static async Task SeedUserPhotos(DataContext context)
    {
        var users = await context.Users.ToListAsync();
        var photoId = 1;

        foreach (var user in users)
        {
            var userPhoto = new UserPhoto
            {
                UserId = user.Id,
                PhotoId = photoId++,
                IsMain = true
            };

            context.UserPhotos.Add(userPhoto);
        }

        await context.SaveChangesAsync();
    }

    public static async Task SeedSongs(DataContext context)
    {
        if (await context.Songs.AnyAsync()) return;

        var songData = await File.ReadAllTextAsync("Data/SongSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var songs = JsonSerializer.Deserialize<List<Song>>(songData, options);

        if (songs == null) return;

        foreach (var song in songs)
        {
            context.Songs.Add(song);
        }

        await context.SaveChangesAsync();

        await SeedSongGenres(context);
        //await SeedSongArtist(context);
    }

    public static async Task SeedSongGenres(DataContext context)
    {
        var songs = await context.Songs.ToListAsync();

        foreach (var song in songs)
        {
            var songGenre = new SongGenre
            {
                SongId = song.Id,
                GenreId = Random.Shared.Next(1, 15)
            };

            context.SongGenres.Add(songGenre);
        }
        await context.SaveChangesAsync();
    }

    public static async Task SeedSongArtist(DataContext context)
    {
        var songs = await context.Songs.ToListAsync();

        foreach (var song in songs)
        {
            var songArtist = new ArtistSong
            {
                SongId = song.Id,
                ArtistId = Random.Shared.Next(1, 15)
            };

            context.ArtistSongs.Add(songArtist);
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

        var albums = JsonSerializer.Deserialize<List<Album>>(albumData, options);

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

        var playlists = JsonSerializer.Deserialize<List<Playlist>>(playlistData, options);

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

        var genres = JsonSerializer.Deserialize<List<Genre>>(genreData, options);

        if (genres == null) return;

        foreach (var genre in genres)
        {
            context.Genres.Add(genre);
        }

        await context.SaveChangesAsync();
    }
}
