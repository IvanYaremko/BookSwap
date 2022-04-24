using Domain;

namespace Application.Swaps
{
    /// <summary>
    /// This class is used a data transfer object
    /// </summary>
    public class SwapRequestsDto
    {
        public Guid SwapId { get; set; }
        public AppUser Owner { get; set; }
        public Book OwnerBook { get; set; }
        public AppUser Requestor { get; set; }
        public Book RequestorBook { get; set; }
    }
}