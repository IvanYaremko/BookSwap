using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Swaps
{
     /// <summary>
    /// This class implements the CQRS principles.
    /// The MediatR library handles the flow of control.
    /// The Swap API Contoller  initialises a new ListSwaps.Query class.
    /// The Handler class, as the name implies, handles the necessary logic to retrieve all BookSwaps from the database.
    /// </summary>
    public class ListSwaps
    {
        public class Query: IRequest<List<BookSwap>> { }

        public class Handler : IRequestHandler<Query, List<BookSwap>>
        {
            private readonly DataContext context;

            public Handler(DataContext context) 
            {
                this.context = context;
            }

            public async Task<List<BookSwap>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Swaps.ToListAsync();
            }
        }
    }
}