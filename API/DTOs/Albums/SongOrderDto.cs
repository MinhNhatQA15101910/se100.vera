using API.DTOs.Songs;

namespace API.DTOs.Albums;

public class SongOrderDto
{
    public SongDto? Song { get; set; }
    public int Order { get; set; }
}
