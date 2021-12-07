using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Books
{
    /// <summary>
    /// This class implements the CQRS principles.
    /// The MediatR library handles the flow of control.
    /// The Book API Contoller  initialises a new Delete.Command class,
    /// passing along the book object to be deleted from the Database.
    /// The Handler class, as the name implies, handles the necessary logic to remove the book object from the database.
    /// </summary>
    public class Update
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var book = await _context.Books.FindAsync(request.Book.Id);
                if(book == null) return null;
                // Map values from the book object send to the api to the book object existing in the db
                _mapper.Map(request.Book, book);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to update the activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}