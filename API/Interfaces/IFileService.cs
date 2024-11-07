namespace API.Interfaces;

public interface IFileService
{
    Task<ImageUploadResult> UploadImageAsync(string folderPath, IFormFile file);
    Task<UploadResult> UploadAudioResult(string folderPath, IFormFile file);
    Task<DeletionResult> DeleteFileAsync(string publicId);
}
