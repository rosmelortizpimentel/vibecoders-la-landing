/**
 * Shape returned by the Supabase RPC `get_verified_founders`.
 * Used in the /builders directory page.
 */
export interface AllBuilder {
  username: string;
  display_name: string;
  avatar_url: string | null;
  tagline: string | null;
  city: string | null;
  apps_count: number;
  social_links: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  } | null;
  is_pro: boolean;
  is_founder: boolean;
  seeks_partner: boolean;
}
