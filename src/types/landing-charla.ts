export interface LandingCharla {
  id: string;
  title: string;
  tagline: string | null;
  banner_url: string | null;
  scheduled_at: string;
  duration_minutes: number | null;
  luma_url: string | null;
  is_past: boolean;
  speaker_name: string | null;
  speaker_tagline: string | null;
  speaker_photo_url: string | null;
}

export interface CharlaDetail {
  id: string;
  title: string;
  description: string | null;
  tagline: string | null;
  banner_url: string | null;
  scheduled_at: string;
  duration_minutes: number | null;
  luma_url: string | null;
  audio_url: string | null;
  is_past: boolean;
  session_number: number;
  speaker_name: string | null;
  speaker_tagline: string | null;
  speaker_photo_url: string | null;
}
