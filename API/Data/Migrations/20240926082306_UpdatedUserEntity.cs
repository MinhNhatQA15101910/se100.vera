#nullable disable

namespace API.Data.Migrations;

/// <inheritdoc />
public partial class UpdatedUserEntity : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
            name: "About",
            table: "Users",
            type: "text",
            nullable: true);

        migrationBuilder.AddColumn<string>(
            name: "ArtistName",
            table: "Users",
            type: "text",
            nullable: true);

        migrationBuilder.AddColumn<DateTime>(
            name: "Created",
            table: "Users",
            type: "timestamp with time zone",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<DateOnly>(
            name: "DateOfBirth",
            table: "Users",
            type: "date",
            nullable: false,
            defaultValue: new DateOnly(1, 1, 1));

        migrationBuilder.AddColumn<string>(
            name: "FirstName",
            table: "Users",
            type: "text",
            nullable: false,
            defaultValue: "");

        migrationBuilder.AddColumn<string>(
            name: "Gender",
            table: "Users",
            type: "text",
            nullable: false,
            defaultValue: "");

        migrationBuilder.AddColumn<string>(
            name: "LastName",
            table: "Users",
            type: "text",
            nullable: false,
            defaultValue: "");

        migrationBuilder.CreateTable(
            name: "Photos",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Url = table.Column<string>(type: "text", nullable: false),
                IsMain = table.Column<bool>(type: "boolean", nullable: false),
                PublicId = table.Column<string>(type: "text", nullable: true),
                AppUserId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Photos", x => x.Id);
                table.ForeignKey(
                    name: "FK_Photos_Users_AppUserId",
                    column: x => x.AppUserId,
                    principalTable: "Users",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Photos_AppUserId",
            table: "Photos",
            column: "AppUserId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "Photos");

        migrationBuilder.DropColumn(
            name: "About",
            table: "Users");

        migrationBuilder.DropColumn(
            name: "ArtistName",
            table: "Users");

        migrationBuilder.DropColumn(
            name: "Created",
            table: "Users");

        migrationBuilder.DropColumn(
            name: "DateOfBirth",
            table: "Users");

        migrationBuilder.DropColumn(
            name: "FirstName",
            table: "Users");

        migrationBuilder.DropColumn(
            name: "Gender",
            table: "Users");

        migrationBuilder.DropColumn(
            name: "LastName",
            table: "Users");
    }
}
