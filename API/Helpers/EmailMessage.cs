namespace API.Helpers;

public class EmailMessage(string? displayName, string to, string subject, string content)
{
    public MailboxAddress To { get; set; } = new MailboxAddress(displayName ?? "", to);
    public string Subject { get; set; } = subject;
    public string Content { get; set; } = content;
}
