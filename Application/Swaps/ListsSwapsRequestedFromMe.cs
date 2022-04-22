using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Swaps
{
    public class ListSwapsRequestedFromMe
    {
        public class Query : IRequest<List<SwapRequestsDto>>
        {
            // my AppUser id
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
                // users
                var users = await _context.Users.Include(user => user.Books).Include(user => user.Photos).ToListAsync();
                // swaps where I am the owner
                var mySwaps = await _context.Swaps.Where(swap => swap.ownerID == request.Id.ToString()).ToListAsync();
                List<SwapRequestsDto> requestedFromMeList = new List<SwapRequestsDto>();
                if (users != null && mySwaps != null)
                {
                    var ownerUser = users.FirstOrDefault(appUser => appUser.Id == request.Id.ToString());
                    foreach (BookSwap s in mySwaps)
                    {
                        if (s.status == "request")
                        {
                            var reqUser = users.FirstOrDefault(AppUser => AppUser.Id == s.requesterID);
                            var bookIOwn = ownerUser.Books.FirstOrDefault(book => book.Id.ToString() == s.ownerBookID.ToLower());
                            requestedFromMeList.Add(new SwapRequestsDto
                            {
                                SwapId = s.Id,
                                Owner = ownerUser,
                                Requestor = reqUser,
                                OwnerBook = bookIOwn
                            });
                        }
                    }
                }
                return requestedFromMeList;
            }
        }
    }
}