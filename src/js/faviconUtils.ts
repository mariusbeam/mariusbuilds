/** Favicon URL for a tool/site link (uses Google's public favicon resolver). */
export function getFaviconUrl(url: string, size = 64): string | null {
  try {
    const hostname = new URL(url).hostname;
    if (!hostname) return null;
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=${size}`;
  } catch {
    return null;
  }
}
