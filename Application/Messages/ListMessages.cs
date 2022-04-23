using System.Diagnostics;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Messages
{
    public class ListMessages
    {
        public class Query : IRequest<List<MessageDto>>
        {
            // id of the swap where the comments are stored
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<MessageDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<MessageDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var messages = await _context.Messages
                    .OrderByDescending(message => message.SentAt)
                    .ToListAsync();

                Debug.WriteLine(messages);
                List<MessageDto> returnListDto = new List<MessageDto>();
                foreach (Message m in messages)
                {
                    if (m.Swap.Id == request.Id)
                    {
                        returnListDto.Add(new MessageDto
                        {
                            Id = m.Id,
                            UserName = m.SendBy.UserName,
                            DisplayName = m.SendBy.DisplayName,
                            Image = m.SendBy.Photos.FirstOrDefault(p => p.IsMain).Url,
                            Text = m.Text,
                            CreatedAt = m.SentAt
                        });
                    }

                }
                return returnListDto;
            }
        }
    }
}