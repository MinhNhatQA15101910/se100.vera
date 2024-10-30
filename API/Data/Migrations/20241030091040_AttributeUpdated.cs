#nullable disable

namespace API.Data.Migrations;

/// <inheritdoc />
public partial class AttributeUpdated : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_Payments_AspNetUsers_UserId",
            table: "Payments");

        migrationBuilder.DropForeignKey(
            name: "FK_SubscriptionPlans_AspNetUsers_UserId",
            table: "SubscriptionPlans");

        migrationBuilder.RenameColumn(
            name: "UserId",
            table: "SubscriptionPlans",
            newName: "ListenerId");

        migrationBuilder.RenameIndex(
            name: "IX_SubscriptionPlans_UserId",
            table: "SubscriptionPlans",
            newName: "IX_SubscriptionPlans_ListenerId");

        migrationBuilder.RenameColumn(
            name: "UploadDate",
            table: "Songs",
            newName: "UpdatedAt");

        migrationBuilder.RenameColumn(
            name: "UserId",
            table: "Payments",
            newName: "ListenerId");

        migrationBuilder.RenameIndex(
            name: "IX_Payments_UserId",
            table: "Payments",
            newName: "IX_Payments_ListenerId");

        migrationBuilder.RenameColumn(
            name: "Created",
            table: "AspNetUsers",
            newName: "UpdatedAt");

        migrationBuilder.RenameColumn(
            name: "UploadDate",
            table: "Albums",
            newName: "UpdatedAt");

        migrationBuilder.AddColumn<DateTime>(
            name: "CreatedAt",
            table: "SubscriptionPlans",
            type: "timestamp with time zone",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<DateTime>(
            name: "UpdatedAt",
            table: "SubscriptionPlans",
            type: "timestamp with time zone",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<DateTime>(
            name: "CreatedAt",
            table: "Songs",
            type: "timestamp with time zone",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<DateTime>(
            name: "CreatedAt",
            table: "Playlists",
            type: "timestamp with time zone",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<DateTime>(
            name: "UpdatedAt",
            table: "Playlists",
            type: "timestamp with time zone",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<DateTime>(
            name: "CreatedAt",
            table: "Payments",
            type: "timestamp with time zone",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<DateTime>(
            name: "UpdatedAt",
            table: "Payments",
            type: "timestamp with time zone",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<DateTime>(
            name: "CreatedAt",
            table: "Genres",
            type: "timestamp with time zone",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<DateTime>(
            name: "UpdatedAt",
            table: "Genres",
            type: "timestamp with time zone",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<DateTime>(
            name: "CreatedAt",
            table: "AspNetUsers",
            type: "timestamp with time zone",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<DateTime>(
            name: "CreatedAt",
            table: "Albums",
            type: "timestamp with time zone",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddForeignKey(
            name: "FK_Payments_AspNetUsers_ListenerId",
            table: "Payments",
            column: "ListenerId",
            principalTable: "AspNetUsers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            name: "FK_SubscriptionPlans_AspNetUsers_ListenerId",
            table: "SubscriptionPlans",
            column: "ListenerId",
            principalTable: "AspNetUsers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_Payments_AspNetUsers_ListenerId",
            table: "Payments");

        migrationBuilder.DropForeignKey(
            name: "FK_SubscriptionPlans_AspNetUsers_ListenerId",
            table: "SubscriptionPlans");

        migrationBuilder.DropColumn(
            name: "CreatedAt",
            table: "SubscriptionPlans");

        migrationBuilder.DropColumn(
            name: "UpdatedAt",
            table: "SubscriptionPlans");

        migrationBuilder.DropColumn(
            name: "CreatedAt",
            table: "Songs");

        migrationBuilder.DropColumn(
            name: "CreatedAt",
            table: "Playlists");

        migrationBuilder.DropColumn(
            name: "UpdatedAt",
            table: "Playlists");

        migrationBuilder.DropColumn(
            name: "CreatedAt",
            table: "Payments");

        migrationBuilder.DropColumn(
            name: "UpdatedAt",
            table: "Payments");

        migrationBuilder.DropColumn(
            name: "CreatedAt",
            table: "Genres");

        migrationBuilder.DropColumn(
            name: "UpdatedAt",
            table: "Genres");

        migrationBuilder.DropColumn(
            name: "CreatedAt",
            table: "AspNetUsers");

        migrationBuilder.DropColumn(
            name: "CreatedAt",
            table: "Albums");

        migrationBuilder.RenameColumn(
            name: "ListenerId",
            table: "SubscriptionPlans",
            newName: "UserId");

        migrationBuilder.RenameIndex(
            name: "IX_SubscriptionPlans_ListenerId",
            table: "SubscriptionPlans",
            newName: "IX_SubscriptionPlans_UserId");

        migrationBuilder.RenameColumn(
            name: "UpdatedAt",
            table: "Songs",
            newName: "UploadDate");

        migrationBuilder.RenameColumn(
            name: "ListenerId",
            table: "Payments",
            newName: "UserId");

        migrationBuilder.RenameIndex(
            name: "IX_Payments_ListenerId",
            table: "Payments",
            newName: "IX_Payments_UserId");

        migrationBuilder.RenameColumn(
            name: "UpdatedAt",
            table: "AspNetUsers",
            newName: "Created");

        migrationBuilder.RenameColumn(
            name: "UpdatedAt",
            table: "Albums",
            newName: "UploadDate");

        migrationBuilder.AddForeignKey(
            name: "FK_Payments_AspNetUsers_UserId",
            table: "Payments",
            column: "UserId",
            principalTable: "AspNetUsers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            name: "FK_SubscriptionPlans_AspNetUsers_UserId",
            table: "SubscriptionPlans",
            column: "UserId",
            principalTable: "AspNetUsers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }
}
