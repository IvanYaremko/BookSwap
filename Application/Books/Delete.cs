
using MediatR;
using Persistence;

namespace Application.Books
{
    /// <summary>
    /// This class implements the CQRS principles.
    /// The MediatR library handles the flow of control.
    /// The Book API Contoller initialises a new Delete.Command class,
    /// passing along the book ID to be removed from the Database.
    /// The Handler class, as the name implies, handles the necessary logic to persist the removal of the book object from the database.
    /// </summary>
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var book = await _context.Books.FindAsync(request.Id);
                // if (book == null) return null;
                
                _context.Remove(book);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to delete the activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}