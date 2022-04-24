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
    /// The Swap API Contoller initialises a new CreateSwap.Command class,
    /// passing along the BookSwap object to be added to the Database.
    /// The Handler class handles the necessary logic to persist the BookSwap object into the database.
    /// </summary>
    public class CreateSwap
    {
        public class Command : IRequest
        {
            public BookSwap swap { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Swaps.Add(request.swap);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}