// ─────────────────────────────────────────────
//  Cloudinary configuration
//  NOTE: For a production site, move api_secret
//  to a server-side proxy so it is never public.
// ─────────────────────────────────────────────
export const CLOUD_NAME  = 'du6i9l4id';
const API_KEY    = '641667991118832';
const API_SECRET = 'un2jZDgzyZOsJ8rn7G0U-vpwM4o';

// Folders to display in the gallery
export const GALLERY_FOLDERS = [
  'Definity',
  'David Heacock',
  'Mark Manson',
  'Worksport',
  'Arcady',
  'Brandon Dawson',
  'Sandeep Swadia',
];

// Basic-auth header (base64 of "api_key:api_secret")
function basicAuth() {
  return btoa(`${API_KEY}:${API_SECRET}`);
}

/**
 * Build an optimised Cloudinary delivery URL.
 * @param {string} publicId
 * @param {'image'|'video'} resourceType
 * @param {object}  opts – extra transformations
 */
export function buildUrl(publicId, resourceType = 'image', opts = {}) {
  const transforms = ['f_auto', 'q_auto', ...(opts.extra ?? [])].join(',');
  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${transforms}/${publicId}`;
}

/**
 * Fetch all resources inside a Cloudinary folder.
 * Uses the Admin API Search endpoint with Basic Auth.
 * Returns an array of normalised media objects.
 */
export async function fetchFolderMedia(folder) {
  // Use the Search API with Basic Auth.
  // width/height/format/resource_type are returned by default — no &fields needed.
  const expression = encodeURIComponent(`folder="${folder}"`);
  const url =
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search` +
    `?expression=${expression}&max_results=100`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicAuth()}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Cloudinary error for folder "${folder}": ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return (data.resources ?? []).map((r) => normalise(r, folder));
}

/**
 * Fetch media from all GALLERY_FOLDERS in parallel.
 * Returns a flat, sorted array (vertical first, then horizontal).
 */
export async function fetchAllMedia() {
  const results = await Promise.allSettled(
    GALLERY_FOLDERS.map((folder) => fetchFolderMedia(folder))
  );

  const flat = results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));

  // Sort: vertical first, then horizontal
  return flat.sort((a, b) => {
    const aVertical = a.height > a.width;
    const bVertical = b.height > b.width;
    if (aVertical && !bVertical) return -1;
    if (!aVertical && bVertical) return 1;
    return 0;
  });
}

// ─── Internal helpers ────────────────────────────────────────────────────────

const VIDEO_FORMATS = new Set(['mp4', 'mov', 'webm', 'avi', 'mkv', 'm4v', 'ogv']);

function normalise(resource, folder) {
  const isVideo =
    resource.resource_type === 'video' ||
    VIDEO_FORMATS.has((resource.format ?? '').toLowerCase());

  const type = isVideo ? 'video' : 'image';

  return {
    id:        resource.public_id,
    folder,
    type,
    width:     resource.width  ?? 1280,
    height:    resource.height ?? 720,
    url:       buildUrl(resource.public_id, type),
    // Poster = first-frame JPEG thumbnail from Cloudinary's video pipeline
    poster: isVideo
      ? `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_jpg,q_auto,w_800,so_0/${resource.public_id}`
      : undefined,
    isVertical: (resource.height ?? 720) > (resource.width ?? 1280),
  };
}
