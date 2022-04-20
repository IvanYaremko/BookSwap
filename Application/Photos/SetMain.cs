using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
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

            public Handler(DataContext context, IHttpContextAccessor httpContextAccessor)
            {
                _context = context;
                _httpContextAccessor = httpContextAccessor;
            }

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