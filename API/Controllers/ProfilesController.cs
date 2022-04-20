using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfilesController : ControllerBase
    {
        private readonly IMediator mediator;

        public ProfilesController(IMediator mediator)
        {
            this.mediator = mediator;

        }

        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> GetProfile(string username)
        {
            return Ok(await mediator.Send(new Details.Query { UserName = username }));
        }
    }
}