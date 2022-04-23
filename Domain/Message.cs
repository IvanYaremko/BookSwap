namespace Domain
{
        public class Message
        {
            public int Id { get; set; }
            public AppUser SendBy { get; set; }
            public string Text { get; set; }
            public BookSwap Swap { get; set; }
            public DateTime SentAt { get; set; } = DateTime.UtcNow;
        }
}