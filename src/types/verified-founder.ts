/**
 * Shape returned by the public edge function `landing-builders-list`.
 * Used in the landing page BuildersMarquee section.
 */
export interface VerifiedFounder {
  display_name: string;
  username: string;
  avatar_url: string | null;
  tagline: string | null;
  city: string | null;
  apps_count: number;
  social_links: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
  is_pro: boolean;
  is_founder: boolean;
  seeks_partner: boolean;
}
