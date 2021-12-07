using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
 
    /// <summary>
    /// This class is utilised in the ExceptionMiddle class.
    /// This class contains the appropriate fields to store exception informatin.
    /// </summary>
    public class AppException
    {
        public AppException(int statusCode, string message, string details=null)
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}