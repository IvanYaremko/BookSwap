using MediatR;
using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// This controller is used to manage the Photos of members
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class PhotosController : ControllerBase
    {
        private readonly IMediator _mediator;

        /// <summary>
        /// API controller to inject the mediator object
        /// </summary>
        /// <param name="mediator">The mediator manager used for CQRS</param>
        public PhotosController(IMediator mediator)
        {
            _mediator = mediator;

        }

        /// <summary>
        /// This endpoint adds a photo to the users Photos. The Command paramater has a props File, the controller 
        /// will expect to recieve a File object through HTTP, thus te Add.Photo command class can be used as its the same props.
        /// The endpoint invokes the mediator send method to send down the command.
        /// </summary>
        /// <param name=""> the bracket is an attribute to tell the controller where to find the file</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] AddPhoto.Command command)
        {
            return Ok(await _mediator.Send(command));
        }

        /// <summary>
        ///  This endpoint is used to delete a photo from the users.
        ///  The endpoint invoked the delete photo command through mediator and passes the photo id.
        /// </summary>
        /// <param name="id">The id of the photo to delete</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return Ok(await _mediator.Send(new DeletePhoto.Command { Id = id }));
        }

        /// <summary>
        /// This endpoint is used to set a main image for a profile of a member.
        /// The endpoint sends the id of the photo to the set main command via mediator.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>The id of the photo to set as main</returns>
        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMain(string id)
        {
            return Ok(await _mediator.Send(new SetMain.Command { Id = id }));
        }

    }
}