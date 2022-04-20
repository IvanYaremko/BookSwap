using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Application.Photos
{
    public class PhotoAccessor : IPhoto
    {
        private readonly Cloudinary _cloud;
        /// <summary>
        /// https://cloudinary.com/documentation/dotnet_image_and_video_upload
        /// </summary>
        /// <param name="config"></param>
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloud = new Cloudinary(account);
        }

        public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            /// using keyword to remove this variable after it is finished processing
            /// OpenReadStream has its own dispose method
            if(file.Length > 0){
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloud.UploadAsync(uploadParams);

                if(uploadResult.Error != null)
                {
                    throw new Exception(uploadResult.Error.Message);
                }

                return new PhotoUploadResult
                {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString(),
                };
            }

            return null;
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloud.DestroyAsync(deleteParams);
            if(result.Result == "ok")
            {
                return result.Result;
            }
            return null;
        }
    }
}