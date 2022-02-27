using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Swaps
{
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