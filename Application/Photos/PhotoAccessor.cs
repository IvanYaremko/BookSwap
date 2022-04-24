using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Application.Photos
{
    /// <summary>
    /// This class is used to initialise the cloudinary cloud, to access the upload features.
    /// </summary>
    public class PhotoAccessor : IPhoto
    {
        private readonly Cloudinary _cloud;
        /// <summary>
        /// https://cloudinary.com/documentation/dotnet_image_and_video_upload
        /// This contructor injects the IOptions class with the CloudinarySettings class as its type.
        /// The cloudinary information is accessed in the appsettings.json file via config.
        /// A new account object is initialised with the information from appsettings.json
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

        /// <summary>
        /// The code in this method was used from the ofiicial cloudinary SDK docs and online forums
        /// https://cloudinary.com/documentation/dotnet_integration
        /// https://qawithexperts.com/questions/295/how-to-upload-image-on-cloudinary-in-aspnet-mvc
        /// The method returns the uploaded file as a photo upload result DTO.
        /// </summary>
        /// <param name="file">The image file</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            /// using keyword to remove this variable after it is finished processing
            /// OpenReadStream has its own dispose method
            if (file.Length > 0)
            {
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloud.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
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

        /// <summary>
        /// This medthos is used to delete the photo in cludinary.
        /// </summary>
        /// <param name="publicId">The id of the photo in cloduinary</param>
        /// <returns></returns>
        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloud.DestroyAsync(deleteParams);
            if (result.Result == "ok")
            {
                return result.Result;
            }
            return null;
        }
    }
}