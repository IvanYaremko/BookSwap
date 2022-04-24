using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    /// <summary>
    /// This class is used to handle the logic to set a main photo in an AppUsers Photos collection
    /// </summary>
    public class SetMain
    {
        public class Command : IRequest<Unit>
        {
            public string Id { get; set; }

        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContextAccessor;

            /// <summary>
            ///  The constructor to inject the required services into the class.
            /// </summary>
            /// <param name="context">The database context</param>
            /// <param name="httpContextAccessor">The httpContext context</param>
            public Handler(DataContext context, IHttpContextAccessor httpContextAccessor)
            {
                _context = context;
                _httpContextAccessor = httpContextAccessor;
            }

            /// <summary>
            /// This method handles the logic to set a photo in the AppUsers Photos collection as a main photo.
            /// The AppUser making the request is retrieved from the http context, along with their photos collection.
            /// The photo to be set as main and the currently set main photo are retrieved from the collection.
            /// The isMain boolean properties are reversed.
            /// </summary>
            /// <param name="request"></param>
            /// <param name="cancellationToken"></param>
            /// <returns></returns>
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                 var user = await _context.Users.Include(user => user.Photos)
                                .FirstOrDefaultAsync(x => x.UserName == _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name));

                var photo = user.Photos.FirstOrDefault(photo => photo.Id == request.Id);
                var currrentMainPhoto = user.Photos.FirstOrDefault(photo => photo.IsMain);
                currrentMainPhoto.IsMain = false;
                photo.IsMain = true;

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}