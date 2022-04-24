using System.Security.Claims;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Messages
{
    /// <summary>
    /// This class is used to handle new messages sent by clients.
    /// </summary>
    public class CreateMessage
    {
        /// <summary>
        /// The command class contains the properties of the Id of the swap and the Text sent.
        /// </summary>
        public class Command : IRequest<MessageDto>
        {
            public Guid Id { get; set; }
        
            public string Text { get; set; }
        }

        /// <summary>
        /// The handler class is used to handle the logic of creating a new message and saving it into the data store.
        /// </summary>
        public class Handler : IRequestHandler<Command, MessageDto>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContextAccessor;

            /// <summary>
            /// Constructor used to inject the necessary services
            /// </summary>
            /// <param name="context">The database context</param>
            /// <param name="httpContextAccessor">The HttpContext context</param>
            public Handler(DataContext context, IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
                _context = context;
            }

            /// <summary>
            /// This method retrieves the BookSwap where the two users are messaging each other.
            /// The method also recieves the user who sent the message, this is used for the Message SendBy props
            /// A new message object is created, the properties are initialised with the information from text the client sent.
            /// The message object is then saved into the database, 
            /// A new Message DTO is created with the same property details as message to send back.
            /// </summary>
            /// <param name="request"></param>
            /// <param name="cancellationToken"></param>
            /// <returns></returns>
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