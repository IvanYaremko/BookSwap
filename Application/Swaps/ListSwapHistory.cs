using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Swaps
{
    /// <summary>
    /// This class implements the CQRS principles.
    /// The MediatR library handles the flow of control.
    /// The Swap API Contoller initialises a new ListSwap.Query class,
    /// passing along the AppUser id.
    /// The Handler class handles the necessary logic to retrieve the SwapRequestsDto objects from the database.
    /// </summary>
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

            /// <summary>
            /// This method is used to handle the logic to get all the BookSwaps objects where the status is "confirmed" of a 
            /// particular user.
            /// This method retrieves the users and the swaps from the database.
            /// The method returns a SwaRqeuestsDto List.
            /// </summary>
            /// <param name="request"></param>
            /// <param name="cancellationToken"></param>
            /// <returns></returns>
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