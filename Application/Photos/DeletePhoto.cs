using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class DeletePhoto
    {
        public class Command : IRequest<Unit>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit>
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