using API.Helpers;
using API.Interfaces;

namespace API.Services;

public class FileService : IFileService
{
    private readonly Cloudinary _cloudinary;

    public FileService(IOptions<CloudinarySettings> config)
    {
        var acc = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );

        _cloudinary = new Cloudinary(acc);
    }

    public async Task<DeletionResult> DeleteFileAsync(string publicId)
    {
        var deletionParams = new DeletionParams(publicId);

        var deletionResult = await _cloudinary.DestroyAsync(deletionParams);
        return deletionResult;
    }

    public async Task<UploadResult> UploadAudioResult(string folderPath, IFormFile file)
    {
        var uploadResult = new VideoUploadResult();

        if (file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new VideoUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = "Vera - Music listening app/audio/" + folderPath
            };

            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        return uploadResult;
    }

    public async Task<UploadResult> UploadLyricAsync(string folderPath, IFormFile file)
    {
        var uploadResult = new RawUploadResult();
        if (file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new RawUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = "Vera - Music listening app/lyrics" + folderPath
            };

            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        return uploadResult;
    }

    public async Task<ImageUploadResult> UploadImageAsync(string folderPath, IFormFile file)
    {
        var uploadResult = new ImageUploadResult();

        if (file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Transformation = new Transformation()
                    .Height(500)
                    .Width(500)
                    .Crop("fill")
                    .Gravity("face"),
                Folder = "Vera - Music listening app/images/" + folderPath
            };

            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        return uploadResult;
    }
}
