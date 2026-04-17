/**
 * Shape returned by the Supabase RPC `get_all_builders`.
 * Used in the /builders directory page.
 */
export interface AllBuilder {
  username: string;
  display_name: string;
  avatar_url: string | null;
  tagline: string | null;
  city: string | null;
  is_verified: boolean;
  apps_count: number;
  social_links: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  } | null;
}