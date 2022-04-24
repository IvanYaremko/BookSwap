namespace Application.Photos
{
    /// <summary>
    /// This class is used to initiate the settings for cloudinary
    /// </summary>
    public  class CloudinarySettings
    {
        public string CloudName { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }
    }
}