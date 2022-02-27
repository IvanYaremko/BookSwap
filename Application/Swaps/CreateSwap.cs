using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Swaps
{
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