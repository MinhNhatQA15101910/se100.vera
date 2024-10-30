#nullable disable

namespace API.Data.Migrations;

/// <inheritdoc />
public partial class AlbumSongAdded : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_ArtistSong_AspNetUsers_ArtistId",
            table: "ArtistSong");

        migrationBuilder.DropForeignKey(
            name: "FK_ArtistSong_Songs_SongId",
            table: "ArtistSong");

        migrationBuilder.DropPrimaryKey(
            name: "PK_ArtistSong",
            table: "ArtistSong");

        migrationBuilder.DropColumn(
            name: "AlbumImageUrl",
            table: "Albums");

        migrationBuilder.RenameTable(
            name: "ArtistSong",
            newName: "ArtistSongs");

        migrationBuilder.RenameColumn(
            name: "TotalView",
            table: "Albums",
            newName: "TotalViews");

        migrationBuilder.RenameColumn(
            name: "TotalSong",
            table: "Albums",
            newName: "TotalSongs");

        migrationBuilder.RenameIndex(
            name: "IX_ArtistSong_SongId",
            table: "ArtistSongs",
            newName: "IX_ArtistSongs_SongId");

        migrationBuilder.AddPrimaryKey(
            name: "PK_ArtistSongs",
            table: "ArtistSongs",
            columns: new[] { "ArtistId", "SongId" });

        migrationBuilder.CreateTable(
            name: "AlbumPhoto",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Url = table.Column<string>(type: "text", nullable: false),
                IsMain = table.Column<bool>(type: "boolean", nullable: false),
                PublicId = table.Column<string>(type: "text", nullable: true),
                AlbumId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AlbumPhoto", x => x.Id);
                table.ForeignKey(
                    name: "FK_AlbumPhoto_Albums_AlbumId",
                    column: x => x.AlbumId,
                    principalTable: "Albums",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "AlbumSongs",
            columns: table => new
            {
                AlbumId = table.Column<int>(type: "integer", nullable: false),
                SongId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AlbumSongs", x => new { x.AlbumId, x.SongId });
                table.ForeignKey(
                    name: "FK_AlbumSongs_Albums_AlbumId",
                    column: x => x.AlbumId,
                    principalTable: "Albums",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_AlbumSongs_Songs_SongId",
                    column: x => x.SongId,
                    principalTable: "Songs",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_AlbumPhoto_AlbumId",
            table: "AlbumPhoto",
            column: "AlbumId");

        migrationBuilder.CreateIndex(
            name: "IX_AlbumSongs_SongId",
            table: "AlbumSongs",
            column: "SongId");

        migrationBuilder.AddForeignKey(
            name: "FK_ArtistSongs_AspNetUsers_ArtistId",
            table: "ArtistSongs",
            column: "ArtistId",
            principalTable: "AspNetUsers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            name: "FK_ArtistSongs_Songs_SongId",
            table: "ArtistSongs",
            column: "SongId",
            principalTable: "Songs",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_ArtistSongs_AspNetUsers_ArtistId",
            table: "ArtistSongs");

        migrationBuilder.DropForeignKey(
            name: "FK_ArtistSongs_Songs_SongId",
            table: "ArtistSongs");

        migrationBuilder.DropTable(
            name: "AlbumPhoto");

        migrationBuilder.DropTable(
            name: "AlbumSongs");

        migrationBuilder.DropPrimaryKey(
            name: "PK_ArtistSongs",
            table: "ArtistSongs");

        migrationBuilder.RenameTable(
            name: "ArtistSongs",
            newName: "ArtistSong");

        migrationBuilder.RenameColumn(
            name: "TotalViews",
            table: "Albums",
            newName: "TotalView");

        migrationBuilder.RenameColumn(
            name: "TotalSongs",
            table: "Albums",
            newName: "TotalSong");

        migrationBuilder.RenameIndex(
            name: "IX_ArtistSongs_SongId",
            table: "ArtistSong",
            newName: "IX_ArtistSong_SongId");

        migrationBuilder.AddColumn<string>(
            name: "AlbumImageUrl",
            table: "Albums",
            type: "text",
            nullable: false,
            defaultValue: "");

        migrationBuilder.AddPrimaryKey(
            name: "PK_ArtistSong",
            table: "ArtistSong",
            columns: new[] { "ArtistId", "SongId" });

        migrationBuilder.AddForeignKey(
            name: "FK_ArtistSong_AspNetUsers_ArtistId",
            table: "ArtistSong",
            column: "ArtistId",
            principalTable: "AspNetUsers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            name: "FK_ArtistSong_Songs_SongId",
            table: "ArtistSong",
            column: "SongId",
            principalTable: "Songs",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }
}
