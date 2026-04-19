/**
 * Shape returned by Supabase Edge Function `public-builder-profile`.
 */
export interface PublicProfile {
  success: boolean;
  profile: {
    id: string;
    username: string;
    avatar_url: string | null;
    avatar_position: string;
    banner_url: string | null;
    banner_position: string;
    name: string;
    tagline: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    accent_color: string;
    font_family: string;
    booking_url: string | null;
    booking_button_text: string;
    member_number: number;
    is_pioneer: boolean;
    show_pioneer_badge: boolean;
    lovable: string | null;
    twitter: string | null;
    github: string | null;
    linkedin: string | null;
    instagram: string | null;
    youtube: string | null;
    tiktok: string | null;
    apps: ProfileApp[];
    tester_apps: TesterContribution[];
    talks: TalkContribution[];
  };
}

export interface TesterContribution {
  id: string;
  name: string;
  tagline: string | null;
  logo_url: string | null;
}

export interface TalkContribution {
  id: string;
  title: string;
  tagline: string | null;
  slug: string | null;
}

export interface ProfileApp {
  id: string;
  url: string;
  name: string;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  is_verified: boolean;
  hours_ideation: number;
  hours_building: number;
  screenshots: string[];
  tags: string[];
  beta_active: boolean;
  open_to_partnerships: boolean;
  partnership_types: string[];
  status: {
    name: string;
    slug: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  stacks: Array<{
    id: string;
    name: string;
    logo_url: string;
    url: string | null;
  }>;
}
