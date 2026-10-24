/** Public Cloudflare R2 bucket that holds Yessenia's photos and videos. */
export const MEDIA_BASE_URL = "https://pub-b9e425d0e6b3429eaa1387d324407f79.r2.dev";

/** Build a full URL for a file in the bucket, e.g. media("about me.jpeg"). Handles spaces and special characters. */
export function media(fileName: string): string {
  return `${MEDIA_BASE_URL}/${encodeURIComponent(fileName)}`;
}
