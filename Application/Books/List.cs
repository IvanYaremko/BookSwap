using System.Security.Claims;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    /// <summary>
    /// This class implements the CQRS principles.
    /// The MediatR library handles the flow of control.
    /// The Book API Contoller  initialises a new List.Query class.
    /// The Handler class, as the name implies, handles the necessary logic to retrieve all book from the database.
    /// </summary>
    public class List
    {
        public class Query : IRequest<Result<List<Book>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Book>>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContextAccessor;
            public Handler(DataContext context, IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
                _context = context;
            }

            /// <summary>
            /// 
            ///  This method contains the logic which "handles" the request.
            ///  The method utilises the Result class for error handling. This is done by querying the database for all books 
            ///  and returning it the Results generic type Value - the API controller returns the appropriate request.
            /// </summary>
            /// <param name="request">The object send by the query</param>
            /// <param name="cancellationToken">Used to cancell prolonged requests</param>
            /// <returns>A Result object containing either a book object retrieved from the database or null</returns>
            public async Task<Result<List<Book>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                // var books = await _context.Books.ToListAsync();
                // var filteredList = books.Where(book => book.AppUserId != userId);

                return Result<List<Book>>.Success(await _context.Books.ToListAsync());
            }
        }
    }
}