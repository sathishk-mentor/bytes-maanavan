import { ByteMetadata, Level, SortOption } from './types';

export function searchBytes(bytes: ByteMetadata[], query: string): ByteMetadata[] {
  if (!query.trim()) {
    return bytes;
  }

  const lowerQuery = query.toLowerCase();

  return bytes.filter(
    (byte) =>
      byte.title.toLowerCase().includes(lowerQuery) ||
      byte.summary.toLowerCase().includes(lowerQuery) ||
      byte.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function filterByLevel(bytes: ByteMetadata[], level: Level): ByteMetadata[] {
  if (level === 'all') {
    return bytes;
  }

  return bytes.filter((byte) => byte.level === level);
}

export function sortBytes(bytes: ByteMetadata[], sortBy: SortOption): ByteMetadata[] {
  const bytesCopy = [...bytes];

  switch (sortBy) {
    case 'order':
      return bytesCopy.sort((a, b) => a.order - b.order);

    case 'title':
      return bytesCopy.sort((a, b) => a.title.localeCompare(b.title));

    case 'recent':
      return bytesCopy.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

    default:
      return bytesCopy;
  }
}

export function applyFilters(
  bytes: ByteMetadata[],
  searchQuery: string,
  levelFilter: Level,
  sortOption: SortOption
): ByteMetadata[] {
  let result = bytes;

  // Apply search
  if (searchQuery) {
    result = searchBytes(result, searchQuery);
  }

  // Apply level filter
  result = filterByLevel(result, levelFilter);

  // Apply sort
  result = sortBytes(result, sortOption);

  return result;
}
