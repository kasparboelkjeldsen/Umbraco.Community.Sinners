using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.Sinners.Backend.Models;

namespace Umbraco.Community.Sinners.Backend.Services;

public class BlessingService(IScopeProvider scopeProvider)
{
    public HashSet<(string CompositionAlias, string PropertyAlias)> GetBlessings()
    {
        using var scope = scopeProvider.CreateScope();
        var rows = scope.Database.Fetch<BlessingDto>();
        scope.Complete();
        return rows.Select(b => (b.CompositionAlias, b.PropertyAlias)).ToHashSet();
    }

    public void SetBlessed(string compositionAlias, string propertyAlias, bool blessed)
    {
        using var scope = scopeProvider.CreateScope();

        var existing = scope.Database.SingleOrDefault<BlessingDto>(
            "WHERE CompositionAlias = @0 AND PropertyAlias = @1", compositionAlias, propertyAlias);

        if (blessed && existing is null)
            scope.Database.Insert(new BlessingDto { CompositionAlias = compositionAlias, PropertyAlias = propertyAlias });
        else if (!blessed && existing is not null)
            scope.Database.Delete(existing);

        scope.Complete();
    }
}
