export const PLATFORM_URL: string =
  import.meta.env.PUBLIC_PLATFORM_URL || 'https://app.vibecoders.la';

/**
 * Generates a platform CTA URL with a `ref` tracking parameter.
 *
 * @param ref - Source identifier (e.g. 'hero', 'nav', 'pricing')
 * @param path - Optional path within the platform (defaults to '/')
 * @returns Full URL string pointing to the platform with ?ref=<source>
 *
 * @example
 * platformCTA('hero') → 'https://app.vibecoders.la/?ref=hero'
 * platformCTA('nav', '/register') → 'https://app.vibecoders.la/register?ref=nav'
 */
export function platformCTA(ref: string, path = '/'): string {
  const url = new URL(path, PLATFORM_URL);
  url.searchParams.set('ref', ref);
  return url.toString();
}
