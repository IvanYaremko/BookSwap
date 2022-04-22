using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Swaps
{
    public class ListSwapHistory
    {
        public class Query : IRequest<List<SwapRequestsDto>>
        {
            // Current user ID
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<SwapRequestsDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<SwapRequestsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _context.Users.Include(user => user.Books).Include(user => user.Photos).ToListAsync();
                var swaps = await _context.Swaps.ToListAsync();
                var user = users.FirstOrDefault(appUser => appUser.Id == request.Id.ToString());

                List<SwapRequestsDto> historyList = new List<SwapRequestsDto>();
                foreach (BookSwap b in swaps)
                {
                    if (b.status == "confirmed")
                    {
                        var ownerUser = users.FirstOrDefault(appUser => appUser.Id.ToLower() == b.ownerID.ToLower());
                        var ownerBook = ownerUser.Books.FirstOrDefault(book => book.Id.ToString().ToLower() == b.ownerBookID.ToLower());
                        var requestorUser = users.FirstOrDefault(appUser => appUser.Id.ToLower() == b.requesterID.ToLower());
                        var requestorBook = requestorUser.Books.FirstOrDefault(book => book.Id.ToString().ToLower() == b.requesterBookID.ToLower());

                        historyList.Add(new SwapRequestsDto
                        {
                            SwapId = b.Id,
                            Owner = ownerUser,
                            OwnerBook = ownerBook,
                            Requestor = requestorUser,
                            RequestorBook = requestorBook
                        });
                    }
                }
                return historyList;
            }
        }
    }
}