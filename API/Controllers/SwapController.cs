
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
        /// <summary>
        /// Constructor is used to inject the mediator object.
        /// </summary>
        /// <param name="mediator"></param> 
        public SwapController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        /// <summary>
        ///  Endpoint used to create a swap.
        ///  The BookSwap object is passed into the create swap command.
        /// </summary>
        /// <param name="swap">The BookSwap Object.</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateSwap(BookSwap swap)
        {
            return Ok(await mediator.Send(new CreateSwap.Command { swap = swap }));
        }
        /// <summary>
        ///  Endpoint to retreive all the swaps in the database.
        ///  The lsit swaps query command is invoked.
        /// </summary>
        /// <returns>A list of BookSwap objects</returns>
        [HttpGet]
        public async Task<ActionResult<List<BookSwap>>> GetSwaps()
        {
            return Ok(await mediator.Send(new ListSwaps.Query()));
        }
        /// <summary>
        /// This endpoint is used to retrieve all the BookSwap objects where the the requestor id is the user id.
        /// </summary>
        /// <param name="id">The id of the user.</param>
        /// <returns></returns>
        [HttpGet("{id}/ir")]
        public async Task<ActionResult<List<BookSwap>>> GetSwapsIRequested(Guid id)
        {
            return Ok(await mediator.Send(new ListSwapsIRequested.Query { Id = id }));
        }
        /// <summary>
        /// The endpoint is used to retrieve all the BookSwap objects where the owner id is the user id.
        /// </summary>
        /// <param name="id">The if od the user</param>
        /// <returns></returns>
        [HttpGet("{id}/rm")]
        public async Task<ActionResult<List<BookSwap>>> GetSwapsRequestedFromMe(Guid id)
        {
            return Ok(await mediator.Send(new ListSwapsRequestedFromMe.Query { Id = id }));
        }

        /// <summary>
        /// Endpoint is used to retrieve all the BookSwap objects of the user where the status property is "confirmed"
        /// </summary>
        /// <param name="id">The id of the user</param>
        /// <returns>A list of "confirmed" swaps</returns>
        [HttpGet("{id}/history")]
        public async Task<ActionResult<List<BookSwap>>> GetSwapHistory(Guid id)
        {
            return Ok(await mediator.Send(new ListSwapHistory.Query{Id = id}));
        }

        /// <summary>
        /// Enpoint is used to retrieve a particular swap from the database.
        /// </summary>
        /// <param name="id">The id of the swap</param>
        /// <returns>The bookSwap object</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<BookSwap>> GetSwap(Guid id)
        {
            return await mediator.Send(new DetailsSwap.Query { id = id });
        }

        /// <summary>
        /// This endpoint is used to update two properties of the the BookSwap object.
        /// 1) change status from "request" to "confirm"
        /// 2) set the requestor book id to the id the swapped book
        /// </summary>
        /// <param name="id">Id of the swap</param>
        /// <param name="swap">The swap object.</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSwap(Guid id, BookSwap swap)
        {
            return Ok(await mediator.Send(new UpdateSwap.Command { id = id, status = swap.status, requesterBookId = swap.requesterBookID }));
        }
        /// <summary>
        /// Endpoint is used to delete a swap from the database.
        /// This endpoint is invoked at the "negotiation" stage of the swapping process where the owner of the requested book can decline the swap.
        /// </summary>
        /// <param name="id">The id of the BookSwap object</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSwap(Guid id)
        {
            return Ok(await mediator.Send(new DeleteSwap.Command { Id = id }));
        }
    }
}