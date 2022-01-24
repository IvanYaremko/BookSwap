using Application.Books;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// This controller is used by clients for CRUD operations on books in the database.
    /// This is a thin controller as it has minimum logic. MediatR library is used to handle 
    /// the flow of control for CQRS design.
    /// </summary>
    public class BooksController : BaseApiController
    {
        /// <summary>
        /// This API endpoint is used by clients to retrieve books from the database.
        /// The method utilises the Mediator Pattern by using MediatR - handles the flow of control.
        /// The HandleResult method returns the appropriate respone back to the client.
        /// </summary>
        /// <returns>Returns a HTTP code with either the list of books or error code</returns>
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        /// <summary>
        /// This API endpoint is used by clients to retrieve a book from the database specified by its ID.
        /// The method utilises the Mediator Pattern by using MediatR - handles the flow of control.
        /// The HandleResult method returns the appropriate respone back to the client.
        /// </summary>
        /// <param name="id">The book id</param>
        /// <returns>Returns a HTTP code with either the specified book or null</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        // IActionResult allows to return a http status without the need of returning an object
        /// <summary>
        /// This API endpoint is used by clients to enter books into the database.
        /// The method utilises the Mediator Pattern by using MediatR - handles the flow of control.
        /// The HandleResult method returns the appropriate respone back to the client.
        /// </summary>
        /// <param name="book">The book object to be created into the database</param>
        /// <returns>Returns a HTTP response</returns>
        [HttpPost]
        public async Task<IActionResult> CreateBook(Book book)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Book = book }));
        }

        /// <summary>
        /// This API endpoint is used by clients to update books in the database.
        /// The method utilises the Mediator Pattern by using MediatR - handles the flow of control.
        /// The HandleResult method returns the appropriate respone back to the client.
        /// </summary>
        /// <param name="id">The book ID to be updated</param>
        /// <param name='book'>The new book values</param>
        /// <returns>Returns a HTTP response</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(Guid id, Book book)
        {
            book.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { Book = book }));
        }

        /// <summary>
        /// This API endpoint is used by clients to delete books from the database.
        /// The method utilises the Mediator Pattern by using MediatR - handles the flow of control.
        /// The HandleResult method returns the appropriate respone back to the client.
        /// </summary>
        /// <param name="id">The book ID to be deleted</param>
        /// <returns>Returns a HTTP response</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}