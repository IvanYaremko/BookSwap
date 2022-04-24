using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Swaps
{
    /// <summary>
    /// This class implements the CQRS principles.
    /// The MediatR library handles the flow of control.
    /// The Swap API Contoller initialises a new ListSwapsIRequested.Query class,
    /// passing along the AppUser id.
    /// The Handler class handles the necessary logic to retrieve the SwapRequestsDto objects from the database.
    /// </summary>
    public class ListSwapsIRequested
    {
        public class Query : IRequest<List<SwapRequestsDto>>
        {
            // Id where I am the requestor
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<SwapRequestsDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            /// <summary>
            /// This method returns all the BookSwaps that the user is the requesting appUser.
            /// The return list is in the form of a SwapRequest DTO.
            /// </summary>
            /// <param name="request"></param>
            /// <param name="cancellationToken"></param>
            /// <returns></returns> 
            public async Task<List<SwapRequestsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _context.Users.Include(user => user.Books).Include(user => user.Photos).ToListAsync();
                // swaps where I am the requestor
                var mySwaps = await _context.Swaps.Where(swap => swap.requesterID == request.Id.ToString()).ToListAsync();
                List<SwapRequestsDto> requestsIMadeList = new List<SwapRequestsDto>();
                if (users != null && mySwaps != null)
                {
                    var requestorUser = users.FirstOrDefault(appUser => appUser.Id == request.Id.ToString());
                    foreach (BookSwap s in mySwaps)
                    {
                        if (s.status == "request")
                        {
                            var ownerUser = users.FirstOrDefault(AppUser => AppUser.Id == s.ownerID);
                            var bookIWant = ownerUser.Books.FirstOrDefault(book => book.Id.ToString().ToLower() == s.ownerBookID.ToLower());
                            requestsIMadeList.Add(new SwapRequestsDto
                            {
                                SwapId = s.Id,
                                Owner = ownerUser,
                                Requestor = requestorUser,
                                OwnerBook = bookIWant
                            });
                        }


                    }
                }
                return requestsIMadeList;
            }
        }
    }
}