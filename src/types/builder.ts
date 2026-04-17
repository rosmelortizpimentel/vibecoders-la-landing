export interface Builder {
  username: string;
  memberNumber: number;
  name: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  bannerUrl?: string;
  location?: {
    country: string;
    countryCode: string;
    city?: string;
  };
  isPioneer: boolean;
  isContributor: boolean;
  isVerified: boolean;
  tier: 'founder' | 'free' | 'pro';
  availableForChat: boolean;
  availableForConsulting: boolean;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    instagram?: string;
  };
  stats: {
    apps: number;
    followers: number;
    following: number;
  };
  joinedAt: string;
  apps: Array<{
    slug: string;
    name: string;
    tagline: string;
    logoUrl: string;
    isVerified: boolean;
  }>;
}
