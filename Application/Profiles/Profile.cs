
using Domain;

namespace Application.Profiles
{
    public class Profile
    {
        public string UserName { get; set; }
        public string DsiplayName { get; set; }
        public string Image { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}