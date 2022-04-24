using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// This controller is used to manage the profile settings of a member
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ProfilesController : ControllerBase
    {
        private readonly IMediator mediator;

        /// <summary>
        /// Constructor to inject the mediator object
        /// </summary>
        /// <param name="mediator"></param>
        public ProfilesController(IMediator mediator)
        {
            this.mediator = mediator;

        }

        /// <summary>
        /// Endpoint used to to retrieve the profile of a member
        /// </summary>
        /// <param name="username">The username profile</param>
        /// <returns></returns>
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> GetProfile(string username)
        {
            return Ok(await mediator.Send(new Details.Query { UserName = username }));
        }

        /// <summary>
        /// This endpoint is used to update the profile information.
        /// The endpoint expects a profle object to update the information within the database.
        /// </summary>
        /// <param name="profile">The profile object.</param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpdateProfile(Profile profile)
        {
            return Ok(await mediator.Send(new UpdateProfile.Command{Profile = profile}));
        }
    }
}