using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    /// <summary>
    /// This class is used to delete a photo from cloudinary and in the AppUsers Photos collection.
    /// </summary>
    public class DeletePhoto
    {
        /// <summary>
        /// The comand class contains the id property of the photo to be deleted.
        /// </summary>
        public class Command : IRequest<Unit>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;
            private readonly IPhoto _accessor;
            private readonly IHttpContextAccessor _httpContextAccessor;

            /// <summary>
            ///  The constructor to inject the required services into the class.
            /// </summary>
            /// <param name="context">The database context</param>
            /// <param name="accessor">The cloudinary context<</param>
            /// <param name="httpContextAccessor">The httpContext context</param>
            public Handler(DataContext context, IPhoto accessor, IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
                _accessor = accessor;
                _context = context;

            }

            /// <summary>
            /// This method contains the logic to delete the specified photo from cloudinary and database storage.
            /// The method retrieves the user making the request, this AppUser object is necessary to access their Photos Collection.
            /// The desired photo to delete is retrieved from the AppUsers photos collection,
            /// a condition is in place to check if it is a main photo.
            /// The photo is then deleted from cloudinary, and removed from the users collection.
            /// The data context changes are saved.
            /// </summary>
            /// <param name="request"></param>
            /// <param name="cancellationToken"></param>
            /// <returns></returns>
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                 var user = await _context.Users.Include(user => user.Photos)
                                .FirstOrDefaultAsync(x => x.UserName == _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name));

                if (user == null) return Unit.Value;

                /// Don't need to make this async since we retrieved the user and included the photos collection, the photo would already be in memory.
                var photo = user.Photos.FirstOrDefault(photo => photo.Id == request.Id);

                if (photo == null) return Unit.Value;

                // Can't delete main photo
                if(photo.IsMain) return Unit.Value;

                var result = await _accessor.DeletePhoto(photo.Id);

                if(result == null) return Unit.Value;

                user.Photos.Remove(photo);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}