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
    /// The Swap API Contoller  initialises a new UpdateSwap.Command class.
    /// The Handler class, as the name implies, handles the necessary logic to update the BookSwap object from the database.
    /// </summary>
    public class UpdateSwap
    {
        public class Command : IRequest
        {
            public Guid id { get; set; }
            public string status { get; set; }
            public string requesterBookId { get; set; }
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
                var swap = await _context.Swaps.FindAsync(request.id);
                swap.status = request.status;
                swap.requesterBookID = request.requesterBookId;
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}