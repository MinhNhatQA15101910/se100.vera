#nullable disable

namespace API.Data.Migrations;

/// <inheritdoc />
public partial class ArtistSongsAdded : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.RenameColumn(
            name: "ArtistName",
            table: "Songs",
            newName: "Description");

        migrationBuilder.AlterColumn<string>(
            name: "LyricUrl",
            table: "Songs",
            type: "text",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "text",
            oldNullable: true);

        migrationBuilder.AddColumn<string>(
            name: "LyricPublicId",
            table: "Songs",
            type: "text",
            nullable: true);

        migrationBuilder.AddColumn<string>(
            name: "MusicPublicId",
            table: "Songs",
            type: "text",
            nullable: true);

        migrationBuilder.AddColumn<int>(
            name: "PublisherId",
            table: "Songs",
            type: "integer",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.CreateTable(
            name: "ArtistSong",
            columns: table => new
            {
                ArtistId = table.Column<int>(type: "integer", nullable: false),
                SongId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_ArtistSong", x => new { x.ArtistId, x.SongId });
                table.ForeignKey(
                    name: "FK_ArtistSong_AspNetUsers_ArtistId",
                    column: x => x.ArtistId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_ArtistSong_Songs_SongId",
                    column: x => x.SongId,
                    principalTable: "Songs",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Songs_PublisherId",
            table: "Songs",
            column: "PublisherId");

        migrationBuilder.CreateIndex(
            name: "IX_ArtistSong_SongId",
            table: "ArtistSong",
            column: "SongId");

        migrationBuilder.AddForeignKey(
            name: "FK_Songs_AspNetUsers_PublisherId",
            table: "Songs",
            column: "PublisherId",
            principalTable: "AspNetUsers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_Songs_AspNetUsers_PublisherId",
            table: "Songs");

        migrationBuilder.DropTable(
            name: "ArtistSong");

        migrationBuilder.DropIndex(
            name: "IX_Songs_PublisherId",
            table: "Songs");

        migrationBuilder.DropColumn(
            name: "LyricPublicId",
            table: "Songs");

        migrationBuilder.DropColumn(
            name: "MusicPublicId",
            table: "Songs");

        migrationBuilder.DropColumn(
            name: "PublisherId",
            table: "Songs");

        migrationBuilder.RenameColumn(
            name: "Description",
            table: "Songs",
            newName: "ArtistName");

        migrationBuilder.AlterColumn<string>(
            name: "LyricUrl",
            table: "Songs",
            type: "text",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "text");
    }
}
