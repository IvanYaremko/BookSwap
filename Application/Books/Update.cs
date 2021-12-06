using AutoMapper;
using Domain;
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
        public class Command : IRequest
        {
            public Book Book { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var book = await _context.Books.FindAsync(request.Book.Id);
                // Map values from the book object send to the api to the book object existing in the db
                _mapper.Map(request.Book, book);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}