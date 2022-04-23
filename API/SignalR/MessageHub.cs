using System.Web;
using Application.Messages;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class MessageHub : Hub
    {
        private readonly IMediator _mediator;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MessageHub(IMediator mediator, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _mediator = mediator;
        }


        // the client-app connects to the "Hub"
        // the client-app will send the properties that are contained in the CreateMessage, the Id and the Text
        public async Task SendMessage(CreateMessage.Command command)
        {

            var message = await _mediator.Send(command);
            await Clients.Group(command.Id.ToString())
                .SendAsync("ReceiveMessage", message);
        }

        // Hubs dont have route parameters but you can use query strings
        // The client-app will send a query string that contains the swapID
        public override async Task OnConnectedAsync()
        {
      
            var swapId = Context.GetHttpContext().Request.Query["swapId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, swapId);

            var messages = await _mediator.Send(new ListMessages.Query { Id = Guid.Parse(swapId) });
            // // When a client-app connects to this hub, they will recieve a list of messages from the database
            // await Clients.Caller.SendAsync("LoadMessages", messages);
        }

    }
}