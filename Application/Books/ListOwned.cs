using System.Security.Claims;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class ListOwned
    {
        public class Query : IRequest<List<Book>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Book>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContextAccessor;
            public Handler(DataContext context, IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
                _context = context;

            }

            public async Task<List<Book>> Handle(Query request, CancellationToken cancellationToken)
            {
                var books = await _context.Books.ToListAsync();
                List<Book> myBooks = new List<Book>();
                
                foreach(Book b in books)
                {
                    if(b.AppUserId == request.Id.ToString()) {
                        myBooks.Add(b);
                    }
                }

                return myBooks;
            }
        }
    }
}