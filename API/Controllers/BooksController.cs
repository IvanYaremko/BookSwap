using Application.Books;
using Domain;
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
        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetBooks(){
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(Guid id){
            return await Mediator.Send(new Details.Query{Id = id});
        }

        // IActionResult allows to return a http status without the need of returning an object
        [HttpPost]
        public async Task<IActionResult> CreateBook(Book book)
        {
            return Ok(await Mediator.Send(new Create.Command { Book = book }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(Guid id, Book book)
        {
            book.Id = id;
            return Ok(await Mediator.Send(new Update.Command { Book = book }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}