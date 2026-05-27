using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Services;

namespace Umbraco.Community.Sinners.Backend.Services;

public class RootMediaService(IMediaService mediaService)
{
    public IEnumerable<RootMediaItemModel> GetRootMediaItems()
    {
        return mediaService.GetRootMedia()
            .Where(m => m.ContentType.Alias != Constants.Conventions.MediaTypes.Folder)
            .Select(m => new RootMediaItemModel
            {
                Key = m.Key,
                Name = m.Name ?? m.Key.ToString(),
                MediaTypeAlias = m.ContentType.Alias,
                CreateDate = m.CreateDate,
            })
            .OrderBy(m => m.Name);
    }
}

public record RootMediaItemModel
{
    public required Guid Key { get; init; }
    public required string Name { get; init; }
    public required string MediaTypeAlias { get; init; }
    public required DateTime CreateDate { get; init; }
}
