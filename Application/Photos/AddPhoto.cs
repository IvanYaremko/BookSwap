using System.Security.Claims;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class AddPhoto
    {

        public class Command : IRequest<Photo>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly DataContext _context;
            private readonly IPhoto _accessor;
            private readonly IHttpContextAccessor _httpContextAccessor;
            public Handler(DataContext context, IPhoto accessor, IHttpContextAccessor httpContextAccessor)
            {
            _httpContextAccessor = httpContextAccessor;
                _accessor = accessor;
                _context = context;
            }

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

                if(!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

                user.Photos.Add(photo);

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return photo;

                return null;
            }
        }
    }
}