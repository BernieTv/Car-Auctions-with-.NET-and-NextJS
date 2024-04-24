namespace Contracts;

public class AuctionsFinished
{
    public bool ItemSold { get; set; }

    public string AuctionsId { get; set; }

    public string Winner { get; set; }

    public string Seller { get; set; }

    public int? Amount { get; set; }
}