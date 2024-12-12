namespace API.Interfaces;

public interface IFileService
{
    Task<ImageUploadResult> UploadImageAsync(string folderPath, IFormFile file);
    Task<UploadResult> UploadAudioAsync(string folderPath, IFormFile file);
    Task<UploadResult> UploadLyricAsync(string folderPath, IFormFile file);
    Task<DeletionResult> DeleteFileAsync(string publicId);
}
