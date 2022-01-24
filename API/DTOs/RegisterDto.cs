using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    /// <summary>
    /// This DTO object is what the API controller recieves from a client application to register
    /// </summary>
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$", ErrorMessage = "Password must be complex - between 4 to 12 characters in length")]
        public string Password { get; set; }
    }
}