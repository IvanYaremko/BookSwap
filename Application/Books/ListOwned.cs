using System.Security.Claims;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    // <summary>
    /// This class implements the CQRS principles.
    /// The Book API Contoller  initialises a new ListOwned.Query class.
    /// The Handler class, as the name implies, handles the necessary logic to retrieve all books which the user owns from the database.
    /// </summary>
    public class ListOwned
    {
        /// <summary>
        /// The query class where the property id is the id of the member.
        /// </summary> 
        public class Query : IRequest<List<Book>>
        {
            public Guid Id { get; set; }
        }

        /// <summary>
        /// The handler class that implements the necessary logic
        /// </summary>
        public class Handler : IRequestHandler<Query, List<Book>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContextAccessor;
            /// <summary>
            /// Constructor to inject the necessary object
            /// </summary>
            /// <param name="context">The database context object</param>
            /// <param name="httpContextAccessor">The HttpContext object</param>
            public Handler(DataContext context, IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
                _context = context;

            }

            /// <summary>
            /// This method retrieves all the books from the database via the context object.
            /// Each book is checked if its owned by the AppUser and if the book is currently available in the market.
            /// </summary>
            /// <param name="request">The request where the id of the user is locatted</param>
            /// <param name="cancellationToken"></param>
            /// <returns>A list of books owned by the user</returns>
            public async Task<List<Book>> Handle(Query request, CancellationToken cancellationToken)
            {
                var books = await _context.Books.ToListAsync();
                List<Book> myBooks = new List<Book>();

                foreach (Book b in books)
                {
                    if (b.AppUserId == request.Id.ToString() && b.IsMarket)
                    {
                        myBooks.Add(b);
                    }
                }

                return myBooks;
            }
        }
    }
}