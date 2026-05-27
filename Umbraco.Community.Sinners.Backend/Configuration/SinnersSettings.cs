namespace Umbraco.Community.Sinners.Backend.Configuration;

public class SinnersSettings
{
    public const string SectionName = "Sinners";

    public bool FunAllowed { get; set; } = false;

    /// <summary>
    /// Root folder name for custom (non-built-in) data types. Defaults to "Custom" if not set.
    /// Built-in Umbraco data types always go under "Umbraco".
    /// </summary>
    public string? DatatypePrefix { get; set; }
}
