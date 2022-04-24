using System.Web;
using Application.Messages;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    /// <summary>
    /// This MessageHub is a SignalR hub which acts similarly as a controller.
    /// The members with confiremd swaps are able to send messages to each other.
    /// Each BookSwap id is a unique "hub" where only the two members of that swap can access.
    /// </summary>
    public class MessageHub : Hub
    {
        private readonly IMediator _mediator;
        private readonly IHttpContextAccessor _httpContextAccessor;
        /// <summary>
        /// Constructor to inject the mediator object.
        /// </summary>
        /// <param name="mediator"></param>
        public MessageHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// The client send a message to this hub by specifing the method name "SendMessage"
        /// when invoked the hub on the client side. The CreateMessage Command class has the same properties
        /// the client is tranfering thus can be used as a DTO
        /// </summary>
        /// <param name="command">The properties from the client, the message.</param>
        /// <returns></returns>
                public async Task SendMessage(CreateMessage.Command command)
        {

            var message = await _mediator.Send(command);
            await Clients.Group(command.Id.ToString())
                .SendAsync("ReceiveMessage", message);
        }

        /// <summary>
        /// When a client enters a chat this method is automatically invoked client side.
        /// The uniqude id of the hub is retrieved from the paramets of the HTTP query stwing ?swapId=xxxxx
        /// This method adds the client to the unique group, retrieves all the messages associated with the group and 
        /// sends it back to the client.
        /// </summary>
        /// <returns></returns>
        public override async Task OnConnectedAsync()
        {
      
            var swapId = Context.GetHttpContext().Request.Query["swapId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, swapId);

            var messages = await _mediator.Send(new ListMessages.Query { Id = Guid.Parse(swapId) });
        
            await Clients.Caller.SendAsync("LoadMessages", messages);
        }

    }
}