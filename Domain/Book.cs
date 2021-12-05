namespace Domain;
public class Book{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Author { get; set; }
    public string? Synopsys { get; set; }
    public int Pages { get; set; }
    public string? Binding { get; set; }
    public string? Isbn13 { get; set; }
    public string? Image { get; set; }
    // public Member? BookOwner { get; set; }
}
