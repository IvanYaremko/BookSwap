using System.Security.Claims;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Messages
{
    public class CreateMessage
    {
        public class Command : IRequest<MessageDto>
        {
            // id of the swap
            public Guid Id { get; set; }
            public string Text { get; set; }
        }

        public class Handler : IRequestHandler<Command, MessageDto>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Handler(DataContext context, IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
                _context = context;
            }

            // Need to return from here because the AppUser props are required
            public async Task<MessageDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var swap = await _context.Swaps.FindAsync(request.Id);

                if (swap != null)
                {
                    var user = await _context.Users.Include(appUser => appUser.Photos)
                            .FirstOrDefaultAsync(appUser => appUser.UserName == _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name));

                    var message = new Message
                    {
                        SendBy = user,
                        Swap = swap,
                        Text = request.Text
                    };

                    swap.Messages.Add(message);


                    await _context.SaveChangesAsync();

                    var messageDto = new MessageDto
                    {
                        Id = message.Id,
                        UserName = user.UserName,
                        DisplayName = user.DisplayName,
                        Image = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                        Text = message.Text,
                        CreatedAt = message.SentAt
                    };

                    return messageDto;
                }

                return null;
            }
        }
    }
}