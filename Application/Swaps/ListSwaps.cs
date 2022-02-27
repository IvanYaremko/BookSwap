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