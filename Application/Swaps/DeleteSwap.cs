using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Swaps
{
    /// <summary>
    /// This class implements the CQRS principles.
    /// The MediatR library handles the flow of control.
    /// The Swap API Contoller initialises a new DeleteSwap.Command class,
    /// passing along the BookSwap id  to be added to the Database.
    /// The Handler class handles the necessary logic to delete the BookSwap object from the database.
    /// </summary>

    public class DeleteSwap
    {
        public class Command : IRequest<Unit>
        {
            public Guid Id { get; set; }
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
                var swap = await _context.Swaps.FindAsync(request.Id);
                _context.Remove(swap);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}