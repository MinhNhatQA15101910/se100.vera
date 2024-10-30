#nullable disable

namespace API.Data.Migrations;

/// <inheritdoc />
public partial class CheckFault : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "PublisherId",
            table: "Songs");

        migrationBuilder.DropColumn(
            name: "SongImageUrl",
            table: "Songs");

        migrationBuilder.DropColumn(
            name: "PublisherId",
            table: "Playlists");

        migrationBuilder.DropColumn(
            name: "PublisherId",
            table: "Albums");

        migrationBuilder.AlterColumn<string>(
            name: "LyricUrl",
            table: "Songs",
            type: "text",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "text");

        migrationBuilder.CreateTable(
            name: "SongPhotos",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Url = table.Column<string>(type: "text", nullable: false),
                IsMain = table.Column<bool>(type: "boolean", nullable: false),
                PublicId = table.Column<string>(type: "text", nullable: true),
                AppSongId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_SongPhotos", x => x.Id);
                table.ForeignKey(
                    name: "FK_SongPhotos_Songs_AppSongId",
                    column: x => x.AppSongId,
                    principalTable: "Songs",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_SongPhotos_AppSongId",
            table: "SongPhotos",
            column: "AppSongId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "SongPhotos");

        migrationBuilder.AlterColumn<string>(
            name: "LyricUrl",
            table: "Songs",
            type: "text",
            nullable: false,
            defaultValue: "",
            oldClrType: typeof(string),
            oldType: "text",
            oldNullable: true);

        migrationBuilder.AddColumn<int>(
            name: "PublisherId",
            table: "Songs",
            type: "integer",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.AddColumn<string>(
            name: "SongImageUrl",
            table: "Songs",
            type: "text",
            nullable: false,
            defaultValue: "");

        migrationBuilder.AddColumn<int>(
            name: "PublisherId",
            table: "Playlists",
            type: "integer",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.AddColumn<int>(
            name: "PublisherId",
            table: "Albums",
            type: "integer",
            nullable: false,
            defaultValue: 0);
    }
}
