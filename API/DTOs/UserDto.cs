using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    /// <summary>
    /// This DTO object is used by the API controllers to return data back to the client application
    /// </summary>
    public class UserDto
    {
        public string Id { get; set; }

        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }

        public string County { get; set; }
    }
}