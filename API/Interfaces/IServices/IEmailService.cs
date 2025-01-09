using API.Helpers;

namespace API.Interfaces.IServices;

public interface IEmailService
{
    Task SendEmailAsync(EmailMessage message);
}
