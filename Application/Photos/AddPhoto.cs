using System.Security.Claims;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    /// <summary>
    /// This class is used to as a CQRS handler to add a photo to cloudinary and to the AppUsers Photo Collection.
    /// </summary>
    public class AddPhoto
    {
        /// <summary>
        /// The command class uses a IFormFile object
        /// </summary>
        public class Command : IRequest<Photo>
        {
            public IFormFile File { get; set; }
        }

        /// <summary>
        /// The handler class handles the necessary logic.
        /// </summary>
        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly DataContext _context;
            private readonly IPhoto _accessor;
            private readonly IHttpContextAccessor _httpContextAccessor;
            /// <summary>
            ///  The constructor to inject the required services into the class.
            /// </summary>
            /// <param name="context">The database context</param>
            /// <param name="accessor">The cloudinary context</param>
            /// <param name="httpContextAccessor">The httpContext context</param>
            public Handler(DataContext context, IPhoto accessor, IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
                _accessor = accessor;
                _context = context;
            }

            /// <summary>
            /// This method retrieves the AppUser making the command along with their Photos collection.
            /// The new photo is uplaoded to cloudinary, and the returned upload photo result object is used to
            /// populate the properties of a new Photo object so that it can be added into the database.
            /// A condition exists to check if the AppUser has set a Main photo, if not then this photo will be set a main.
            /// </summary>
            /// <param name="request"></param>
            /// <param name="cancellationToken"></param>
            /// <returns></returns>
            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(user => user.Photos)
                                .FirstOrDefaultAsync(x => x.UserName == _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name));

                if (user == null) return null;

                var uploadResult = await _accessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = uploadResult.Url,
                    Id = uploadResult.PublicId,
                };

                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

                user.Photos.Add(photo);

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return photo;

                return null;
            }
        }
    }
}