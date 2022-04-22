using Domain;

namespace Application.Swaps
{
    public class SwapRequestsDto
    {
        public Guid SwapId { get; set; }
        public AppUser Owner { get; set; }
        public Book OwnerBook { get; set; }
        public AppUser Requestor { get; set; }
        public Book RequestorBook { get; set; }
    }
}