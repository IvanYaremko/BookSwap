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
     
    }
}