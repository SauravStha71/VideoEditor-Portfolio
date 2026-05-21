// ─────────────────────────────────────────────
//  Cloudinary delivery helpers
//  Media data is served from the pre-built
//  manifest (media-manifest.json) to avoid
//  CORS issues with the Admin API and to keep
//  the API secret off the client bundle.
// ─────────────────────────────────────────────
// Read from env so the value can be rotated without a code change.
// Add VITE_CLOUDINARY_CLOUD_NAME=du6i9l4id to your .env.local file.
export const CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? 'du6i9l4id';

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
 * Returns a flat array sorted by public_id (zero-padded lexicographic),
 * so numeric prefixes like 01, 02 … 10 are ordered correctly.
 */
export async function fetchAllMedia() {
  // Dynamic import so Vite can tree-shake and code-split the JSON.
  const manifest = (await import('../data/media-manifest.json')).default;

  // Sort by public_id with zero-padded number segments for correct ordering.
  function padNumbers(str) {
    return str.replace(/(\d+)/g, (n) => n.padStart(10, '0'));
  }
  return [...manifest].sort((a, b) => padNumbers(a.id).localeCompare(padNumbers(b.id)));
}

/**
 * Load media for a single folder from the manifest.
 * Kept for potential future use.
 */
export async function fetchFolderMedia(folder) {
  const all = await fetchAllMedia();
  return all.filter((item) => item.folder === folder);
}
