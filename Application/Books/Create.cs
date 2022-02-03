using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Books
{
    /// <summary>
    /// This class implements the CQRS principles.
    /// The MediatR library handles the flow of control.
    /// The Book API Contoller initialises a new Create.Command class,
    /// passing along the book object to be added to the Database.
    /// The Handler class handles the necessary logic to persist the book object into the database.
    /// </summary>
    public class Create
    {
        public class Command : IRequest
        {
            public Book Book { get; set; }
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
                _context.Books.Add(request.Book);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}

