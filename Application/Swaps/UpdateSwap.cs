using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Swaps
{
    public class UpdateSwap
    {
        public class Command : IRequest
        {
            public Guid id { get; set; }
            public string status { get; set; }
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
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}