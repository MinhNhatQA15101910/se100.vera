using API.Helpers;

namespace API.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(EmailMessage message);
}
