using Domain;
using FluentValidation;

namespace Application.Books
{
    /// <summary>
    /// This class is used to validate the book object.
    /// This is done by FluentValiadtion library.
    /// </summary>
    public class BookValidator : AbstractValidator<Book>
    {
        public BookValidator()
        {
            RuleFor(book => book.Title).NotEmpty();
            RuleFor(book => book.Author).NotEmpty();
            RuleFor(book => book.Synopsys).NotEmpty();
            RuleFor(book => book.Pages).NotEmpty();
            RuleFor(book => book.Binding).NotEmpty();
            RuleFor(book => book.Isbn13).NotEmpty();
            RuleFor(book => book.Image).NotEmpty();
        }
    }
}