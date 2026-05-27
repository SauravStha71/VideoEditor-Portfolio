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
 * Detect iOS / iPadOS devices.
 * iOS Safari does NOT support WebM/VP9, so f_auto can serve an incompatible
 * format which results in blank / black video tiles.
 */
export function isIOS() {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    // iPadOS 13+ reports as MacIntel with touch support
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

/**
 * Rewrite a Cloudinary video URL to force H.264 MP4 delivery on iOS.
 * Replaces `f_auto` with `f_mp4,vc_h264` so Safari always receives a
 * compatible codec instead of WebM/VP9.
 */
export function toIosSafeVideoUrl(url) {
  return url.replace('/f_auto,q_auto/', '/f_mp4,vc_h264,q_auto/');
}

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
 * On iOS, video URLs are rewritten to force H.264 MP4 for Safari compatibility.
 */
export async function fetchAllMedia() {
  // Dynamic import so Vite can tree-shake and code-split the JSON.
  const manifest = (await import('../data/media-manifest.json')).default;

  const ios = isIOS();

  // Sort by public_id with zero-padded number segments for correct ordering.
  function padNumbers(str) {
    return str.replace(/(\d+)/g, (n) => n.padStart(10, '0'));
  }

  const sorted = [...manifest].sort((a, b) => padNumbers(a.id).localeCompare(padNumbers(b.id)));

  // Rewrite video URLs on iOS to guarantee H.264 MP4 delivery
  if (ios) {
    return sorted.map((item) =>
      item.type === 'video'
        ? { ...item, url: toIosSafeVideoUrl(item.url) }
        : item
    );
  }

  return sorted;
}

/**
 * Load media for a single folder from the manifest.
 * Kept for potential future use.
 */
export async function fetchFolderMedia(folder) {
  const all = await fetchAllMedia();
  return all.filter((item) => item.folder === folder);
}
