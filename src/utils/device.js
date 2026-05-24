/**
 * device.js — Touch / pointer-type detection utilities.
 *
 * Why `pointer: coarse` instead of screen width?
 * ─────────────────────────────────────────────────
 * Screen width alone mis-classifies surface-type devices (e.g. Surface Pro
 * or iPad in landscape mode) and large-screen Android phones.
 * `pointer: coarse` is the CSS/JS standard that accurately reflects whether
 * the primary input is a finger (coarse) or a mouse/trackpad (fine),
 * regardless of screen dimensions.
 *
 * `navigator.maxTouchPoints > 0` is the fallback for environments where
 * matchMedia isn't available (SSR, very old browsers).
 */

/**
 * Returns true if the device's primary pointer is a touch input (finger).
 * Evaluated once per call — suitable for use during component render or
 * inside a useEffect (not reactive to device changes at runtime).
 */
export function isTouchDevice() {
  if (typeof window === 'undefined') return false; // SSR guard
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    navigator.maxTouchPoints > 0
  );
}
