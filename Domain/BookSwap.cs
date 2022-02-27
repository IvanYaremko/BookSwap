using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class BookSwap
    {
        public Guid Id { get; set; }
        public string BookID { get; set; }
        public string ownerID { get; set; }
        public string requesterID { get; set; }
        public string status { get; set; }
    }
}