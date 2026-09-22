export function readPreference(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export function writePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Private contexts can disable storage. */
  }
}
export function assetUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
export function safeUrl(url?: string) {
  if (!url) return undefined;
  try {
    return ['https:', 'http:', 'mailto:'].includes(new URL(url).protocol) ? url : undefined;
  } catch {
    return undefined;
  }
}
