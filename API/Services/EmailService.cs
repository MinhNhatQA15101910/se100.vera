using API.Helpers;
using API.Interfaces.IServices;

namespace API.Services;

public class EmailService(IOptions<EmailSenderSettings> config) : IEmailService
{
    public async Task SendEmailAsync(EmailMessage message)
    {
        var emailMessage = CreateMailMessage(message);

        await SendAsync(emailMessage);
    }

    private MimeMessage CreateMailMessage(EmailMessage message)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress(config.Value.DisplayName, config.Value.From));
        emailMessage.To.Add(message.To);
        emailMessage.Subject = message.Subject;
        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
        {
            Text = message.Content
        };

        return emailMessage;
    }

    private async Task SendAsync(MimeMessage mailMessage)
    {
        using var client = new MailKit.Net.Smtp.SmtpClient();
        await client.ConnectAsync(config.Value.SmtpServer, config.Value.Port, true);
        client.AuthenticationMechanisms.Remove("XOAUTH2");
        await client.AuthenticateAsync(config.Value.UserName, config.Value.Password);

        var result = await client.SendAsync(mailMessage);

        await client.DisconnectAsync(true);
    }
}
