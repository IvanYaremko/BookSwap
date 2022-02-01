using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class BookAppUser
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid BookId { get; set; }
        public Book Book { get; set; }
    }
}