using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    /// <summary>
    /// This class is used to update profile details.
    /// </summary>
    public class UpdateProfile
    {
        public class Command : IRequest
        {
            public Profile Profile { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Handler(DataContext context, IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
                _context = context;
            }

            /// <summary>
            /// This method handles the logic to update a profile.
            /// The AppUse is retrieved, and null coalescing is used to check if there are any changes between
            /// what is stored in the data base and what the user sent.
            /// </summary>
            /// <param name="request"></param>
            /// <param name="cancellationToken"></param>
            /// <returns></returns>
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(user => user.Photos)
                               .FirstOrDefaultAsync(x => x.UserName == _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name));

                user.Bio = request.Profile.Bio ?? user.Bio;
                user.County = request.Profile.County ?? user.County;
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
