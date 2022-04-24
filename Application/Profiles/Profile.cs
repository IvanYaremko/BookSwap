
using Domain;

namespace Application.Profiles
{
    /// <summary>
    /// This class is used as a DTO object to transfer the AppUsers details as a profile.
    /// </summary>
    public class Profile
    {
        public string UserName { get; set; }
        public string DsiplayName { get; set; }
        public string Image { get; set; }

        public string Bio { get; set; }
        public string County { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}