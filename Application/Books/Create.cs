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
    /// The Handler class, as the name implies, handles the necessary logic to persist the book object into the database.
    /// </summary>
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Book Book { get; set; }
        }

        /// <summary>
        /// This is a middleware class used to handle validation
        /// The book object is retrieved from the Command class (which was invoked by a client app hitting the API endpoint in the Book Controller)
        /// The constructor initiales the BookValidator which contains the validation rules for the book object passed.
        /// </summary>
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(book => book.Book).SetValidator(new BookValidator());
            }
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
                _context.Books.Add(request.Book);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to enter book entry");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}