/**
 * Shape returned by the Supabase RPC `get_showcase_apps`.
 * Used in the landing page AppsShowcase section.
 */
export interface ShowcaseApp {
  id: string;
  app_name: string;
  app_tagline: string;
  app_logo_url: string;
  app_url: string;
  is_verified: boolean;
  founder_handle: string;
  founder_display_name: string;
  founder_avatar_url: string;
  founder_social_links: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    youtube?: string;
    instagram?: string;
    tiktok?: string;
    website?: string;
    lovable?: string;
  } | null;
  status: {
    name: string;
    slug: string;
  } | null;
  stacks: Array<{
    id: string;
    name: string;
    logo_url: string;
  }> | null;
  beta_active: boolean;
  open_to_partnerships: boolean;
  created_at: string;
}