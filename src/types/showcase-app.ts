/**
 * Shape returned by the Supabase RPC `get_showcase_apps`.
 * Used in the landing page AppsShowcase section.
 */
export interface ShowcaseApp {
  id: string;
  app_name: string;
  app_tagline: string | null;
  app_logo_url: string | null;
  app_url: string;
  is_verified: boolean;
  founder_handle: string;
  founder_display_name: string;
  founder_avatar_url: string | null;
  status: {
    name: string;
    slug: string;
  };
  stacks: Array<{
    id: string;
    name: string;
    logo_url: string;
  }> | null;
}