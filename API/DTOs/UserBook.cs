using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace API.DTOs
{
    public class UserBook
    {
        public string UserId { get; set; }

        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string County { get; set; }
        public string Image { get; set; }

        public ICollection<Book> Books {get; set;}
}
}