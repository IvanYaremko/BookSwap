using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Swaps
{
    /// <summary>
    /// This class implements the CQRS principles.
    /// The MediatR library handles the flow of control.
    /// The Swap API Contoller initialises a new DetailsSwap.Query class,
    /// passing along the BookSwap id  to be retrieved to the Database.
    /// The Handler class handles the necessary logic to retrieve the BookSwap object from the database.
    /// </summary>

    public class DetailsSwap
    {
        public class Query : IRequest<BookSwap>
        {
            public Guid id { get; set; }
        }

        public class Handler : IRequestHandler<Query, BookSwap>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<BookSwap> Handle(Query request, CancellationToken cancellationToken)
            {
                var swapDetails = await _context.Swaps.FindAsync(request.id);
                return swapDetails;
            }
        }
    }
}