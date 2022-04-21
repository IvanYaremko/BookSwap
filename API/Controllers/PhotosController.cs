using MediatR;
using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class PhotosController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PhotosController(IMediator mediator)
        {
            _mediator = mediator;
            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name=""> the bracket is an attribute to tell the controller where to find the file</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] AddPhoto.Command command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return Ok(await _mediator.Send(new DeletePhoto.Command { Id = id }));
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMain(string id)
        {
            return Ok(await _mediator.Send(new SetMain.Command { Id = id }));
        }

    }
}