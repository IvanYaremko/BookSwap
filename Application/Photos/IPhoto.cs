using Microsoft.AspNetCore.Http;

namespace Application.Photos
{
    /// <summary>
    /// This interface is used to specify the methods the photo accessor class will need to implement.
    /// This class is specified when an instance of this interface needs to be injected.
    /// </summary>
    public interface IPhoto
    {
        /// <summary>
        /// This method is used to add a photo to a AppUsers photo collection.
        /// </summary>
        /// <param name="file">The image file</param>
        /// <returns></returns>
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        /// <summary>
        /// This method is used to delete a photo from a AppUsers Photo collections
        /// </summary>
        /// <param name="publicId">The id of the image to delete</param>
        /// <returns></returns>
        Task<string> DeletePhoto(string publicId);
    }
}