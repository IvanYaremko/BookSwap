
using Application.Swaps;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// This controller is used by clients for CRUD operations on book swaps in the database.
    /// This is a thin controller as it has minimum logic. MediatR library is used to handle 
    /// the flow of control for CQRS design.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class SwapController : ControllerBase
    {
        private readonly IMediator mediator;

        public SwapController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateSwap(BookSwap swap)
        {
            return Ok(await mediator.Send(new CreateSwap.Command{swap = swap}));
        }

        [HttpGet]
        public async Task<ActionResult<List<BookSwap>>> GetSwaps()
        {
            return Ok(await mediator.Send(new ListSwaps.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookSwap>> GetBook(Guid id)
        {
            return await mediator.Send(new DetailsSwap.Query{ id = id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSwap(Guid id, string status, string requesterBookId)
        {
            return Ok(await mediator.Send(new UpdateSwap.Command{id = id, status = status, requesterBookId = requesterBookId}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSwap(Guid id)
        {
            return Ok(await mediator.Send(new DeleteSwap.Command{Id = id}));
        }
    }
}