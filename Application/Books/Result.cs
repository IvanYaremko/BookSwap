using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Books
{
    /// <summary>
    /// This class is used for error handling when a client is using a HTTP request to the API.
    /// This is a subsitute for throwing Exceptions in the Handler classes back to the API.
    /// Exceptions are heavy and costly - the Result class applies similar logic for Success and Failures when querying the Database.
    /// </summary>
    /// <typeparam name="T">Generyic type</typeparam>
    public class Result<T>
    {
        public bool isSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }
        public static Result<T> Success(T value) => new Result<T> { isSuccess = true, Value = value };
        public static Result<T> Failure(string error) => new Result<T> { isSuccess = false, Error = error };

    }
}