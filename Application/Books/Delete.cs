
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
        public class Command : IRequest<Unit>
        {
            public Guid Id { get; set; }
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
                var book = await _context.Books.FindAsync(request.Id);
                // if (book == null) return null;
                
                _context.Remove(book);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}