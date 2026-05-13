// ─────────────────────────────────────────────
//  Cloudinary delivery helpers
//  Media data is served from the pre-built
//  manifest (media-manifest.json) to avoid
//  CORS issues with the Admin API and to keep
//  the API secret off the client bundle.
// ─────────────────────────────────────────────
export const CLOUD_NAME = 'du6i9l4id';

// Folders to display in the gallery (order determines filter pill order)
export const GALLERY_FOLDERS = [
  'Definity',
  'David Heacock',
  'Mark Manson',
  'Worksport',
  'Arcady',
  'Brandon Dawson',
  'Sandeep Swadia',
];

/**
 * Build an optimised Cloudinary delivery URL.
 * @param {string} publicId
 * @param {'image'|'video'} resourceType
 * @param {object} opts – extra transformations
 */
export function buildUrl(publicId, resourceType = 'image', opts = {}) {
  const transforms = ['f_auto', 'q_auto', ...(opts.extra ?? [])].join(',');
  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${transforms}/${publicId}`;
}

/**
 * Load all media from the local manifest.
 * Returns a flat array sorted vertical-first, then horizontal.
 */
export async function fetchAllMedia() {
  // Dynamic import so Vite can tree-shake and code-split the JSON.
  const manifest = (await import('../data/media-manifest.json')).default;

  // Sort: vertical first, then horizontal
  return [...manifest].sort((a, b) => {
    const aV = a.height > a.width;
    const bV = b.height > b.width;
    if (aV && !bV) return -1;
    if (!aV && bV) return 1;
    return 0;
  });
}

/**
 * Load media for a single folder from the manifest.
 * Kept for potential future use.
 */
export async function fetchFolderMedia(folder) {
  const all = await fetchAllMedia();
  return all.filter((item) => item.folder === folder);
}
