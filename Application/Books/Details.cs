using Domain;
using MediatR;
using Persistence;

namespace Application.Books
{
    /// <summary>
    /// This class implements the CQRS principles.
    /// The MediatR library handles the flow of control.
    /// The Book API Contoller initialises a new Details.Query class,
    /// passing along the book ID to be retrieved to the Database.
    /// The Handler class, as the name implies, handles the necessary logic to retrieve the book details from the database.
    /// </summary>
    public class Details
    {
        public class Query : IRequest<Book>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Book>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            /// <summary>
            /// This method contains the logic which "handles" the request.
            /// The method queries the database for a book object specified by the requested ID
            /// The method uses the Result class to handle errors. This approach is used instead of throwing an Exception back to the API controller.
            /// The API controller uses its own logic in checking the Result object to send back to the client.
            /// </summary>
            /// <param name="request">The object send by the query</param>
            /// <param name="cancellationToken">Used to cancell prolonged requests</param>
            /// <returns>A Result object containing either a book object retrieved from the database or null</returns>
            public async Task<Book> Handle(Query request, CancellationToken cancellationToken)
            {
                var book = await _context.Books.FindAsync(request.Id);
                return book;
            }
        }
    }
}