/**
 * generate-manifest.js
 * ─────────────────────────────────────────────────────────
 * Fetches all media from your Cloudinary folders and writes
 * src/data/media-manifest.json for the Gallery component.
 *
 * Run:  npm run manifest
 * ─────────────────────────────────────────────────────────
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const FOLDERS = [
  'Definity',
  'David Heacock',
  'Mark Manson',
  'Worksport',
  'Arcady',
  'Brandon Dawson',
  'Sandeep Swadia',
];

const VIDEO_FORMATS = new Set(['mp4', 'mov', 'webm', 'avi', 'mkv', 'm4v', 'ogv']);

// ── Helpers ───────────────────────────────────────────────
function basicAuth() {
  return Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
}

function buildUrl(publicId, resourceType = 'image') {
  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/f_auto,q_auto/${publicId}`;
}

function buildPoster(publicId) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_jpg,q_auto,w_800,so_0/${publicId}`;
}

function normalise(resource, folder) {
  const isVideo =
    resource.resource_type === 'video' ||
    VIDEO_FORMATS.has((resource.format ?? '').toLowerCase());

  const type = isVideo ? 'video' : 'image';

  return {
    id:         resource.public_id,
    folder,
    type,
    width:      resource.width  ?? 1280,
    height:     resource.height ?? 720,
    url:        buildUrl(resource.public_id, type),
    poster:     isVideo ? buildPoster(resource.public_id) : undefined,
    isVertical: (resource.height ?? 720) > (resource.width ?? 1280),
  };
}

// ── Fetch one folder ──────────────────────────────────────
async function fetchFolder(folder) {
  const expression = encodeURIComponent(`folder="${folder}"`);
  const url =
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search` +
    `?expression=${expression}&max_results=200`;

  const res = await fetch(url, {
    headers: { Authorization: `Basic ${basicAuth()}` },
  });

  if (!res.ok) {
    console.warn(`  ⚠  Folder "${folder}" — ${res.status} ${res.statusText}`);
    return [];
  }

  const data = await res.json();
  const items = (data.resources ?? []).map((r) => normalise(r, folder));
  console.log(`  ✔  ${folder} — ${items.length} item(s)`);
  return items;
}

// ── Main ──────────────────────────────────────────────────
async function main() {
  console.log('\n🔄  Generating Cloudinary media manifest…\n');

  const results = await Promise.allSettled(FOLDERS.map(fetchFolder));

  const all = results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));

  // Sort: vertical first, then horizontal
  all.sort((a, b) => {
    const aV = a.height > a.width;
    const bV = b.height > b.width;
    if (aV && !bV) return -1;
    if (!aV && bV) return 1;
    return 0;
  });

  // Write output
  const outDir  = join(__dirname, '..', 'src', 'data');
  const outFile = join(outDir, 'media-manifest.json');

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, JSON.stringify(all, null, 2), 'utf-8');

  console.log(`\n✅  Done — ${all.length} total item(s) → src/data/media-manifest.json\n`);
}

main().catch((err) => {
  console.error('\n❌  Manifest generation failed:', err.message);
  process.exit(1);
});
