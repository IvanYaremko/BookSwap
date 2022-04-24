namespace Application.Messages
{
    /// <summary>
    /// The message data transfer class used for SignalR communications.
    /// </summary>
    public class MessageDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}