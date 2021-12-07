using Application.Books;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// This class is inherited by all controllers.
    /// It contains common logic that are required by all controllers.
    /// The MediatR library is used to handle CQRS implementation.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        // if _mediator is null, Mediator will be assigned the object right of the coalescent
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        /// <summary>
        ///  Action Result allows the return of HTTP codes back to the client
        ///  Method takes in as a paramater a Result object of a generic type.
        ///  Returns an appropriate response based on the conditions met
        /// </summary>
        /// <typeparam name="T">Generic type</typeparam>
        /// <param name="result">The result object</param>
        /// <returns>Returns the appropriate HTTP code back to the client.</returns>
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if(result == null) return NotFound();
            if (result.isSuccess && result.Value != null) return Ok(result.Value);
            if (result.isSuccess && result.Value == null) return NotFound();
            return BadRequest(result.Error);
        }

    }
}