#nullable disable

namespace API.Data.Migrations;

/// <inheritdoc />
public partial class GenreForArtistAlbumAdded : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.RenameColumn(
            name: "TotalViews",
            table: "Songs",
            newName: "TotalListeningHours");

        migrationBuilder.RenameColumn(
            name: "TotalViews",
            table: "Playlists",
            newName: "TotalListeningHours");

        migrationBuilder.RenameColumn(
            name: "TotalViews",
            table: "Albums",
            newName: "TotalListeningHours");

        migrationBuilder.CreateTable(
            name: "AlbumGenres",
            columns: table => new
            {
                AlbumId = table.Column<int>(type: "integer", nullable: false),
                GenreId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AlbumGenres", x => new { x.AlbumId, x.GenreId });
                table.ForeignKey(
                    name: "FK_AlbumGenres_Albums_AlbumId",
                    column: x => x.AlbumId,
                    principalTable: "Albums",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_AlbumGenres_Genres_GenreId",
                    column: x => x.GenreId,
                    principalTable: "Genres",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "ArtistGenres",
            columns: table => new
            {
                ArtistId = table.Column<int>(type: "integer", nullable: false),
                GenreId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_ArtistGenres", x => new { x.ArtistId, x.GenreId });
                table.ForeignKey(
                    name: "FK_ArtistGenres_AspNetUsers_ArtistId",
                    column: x => x.ArtistId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_ArtistGenres_Genres_GenreId",
                    column: x => x.GenreId,
                    principalTable: "Genres",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_AlbumGenres_GenreId",
            table: "AlbumGenres",
            column: "GenreId");

        migrationBuilder.CreateIndex(
            name: "IX_ArtistGenres_GenreId",
            table: "ArtistGenres",
            column: "GenreId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "AlbumGenres");

        migrationBuilder.DropTable(
            name: "ArtistGenres");

        migrationBuilder.RenameColumn(
            name: "TotalListeningHours",
            table: "Songs",
            newName: "TotalViews");

        migrationBuilder.RenameColumn(
            name: "TotalListeningHours",
            table: "Playlists",
            newName: "TotalViews");

        migrationBuilder.RenameColumn(
            name: "TotalListeningHours",
            table: "Albums",
            newName: "TotalViews");
    }
}
