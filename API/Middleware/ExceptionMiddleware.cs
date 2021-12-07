using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;

namespace API.Middleware
{
    /// <summary>
    /// Documentation for middleware https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-6.0
    /// </summary>
    public class ExceptionMiddleware
    {
                private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        /// <summary>
        /// The constructor method for ExceptionMiddleware.
        /// </summary>
        /// <param name="next">The next task in the pipeline for HTTP requests</param>
        /// <param name="logger">Generic logging interface that uses the ExceptionMiddleware calss</param>
        /// <param name="env">The current hosting environment the application is running in</param>
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        /// <summary>
        /// When a request comes in, it passes through the exception middleware and continue on to the other middleware.
        /// If an exception occurs in the API request, it will be caught in this piece of middleware.
        /// When an exception is caught, the catch block does the following:
        ///     1) log the error internally into the output ternimal
        ///     2) Sets the context type for what this method will be returning
        ///     3) Setts the context response status code, this will be 500
        ///     4) A response is created and checks if the application is in development mode or not:
        ///         - True: Send back full exception with stack trace (utlising the AppException class for appropriate fields)
        ///         - False: Send back a generic server error response (utlising the AppException class for appropriate fields)
        ///     5) Returns a JSON file containing the response
        ///         - Utilising the Json Serializer Options to ensure JSON is correctly structured.
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                    ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new AppException(context.Response.StatusCode, "Server Error");

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}