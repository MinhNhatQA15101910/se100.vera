using API.Controllers;

namespace API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string? GetEmail(this ClaimsPrincipal user)
    {
        var email = user.FindFirstValue(ClaimTypes.Email);

        return email;
    }

    public static int GetUserId(this ClaimsPrincipal user)
    {
        var userId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier) ?? "-1");

        return userId;
    }

    public static PincodeAction GetAction(this ClaimsPrincipal user)
    {
        var actionString = user.FindFirstValue("action")
            ?? throw new Exception("Cannot get action from token");

        PincodeAction action = actionString == "Signup"
            ? PincodeAction.Signup
            : actionString == "VerifyEmail"
                ? PincodeAction.VerifyEmail
                : PincodeAction.None;

        return action;
    }
}
