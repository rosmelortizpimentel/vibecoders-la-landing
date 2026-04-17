export interface AppListItem {
  slug: string;
  name: string;
  tagline: string;
  logoUrl: string;
  url: string;
  builder: {
    username: string;
    name: string;
    avatarUrl: string;
  };
  category: {
    slug: string;
    label: string;
  };
  status: 'idea' | 'building' | 'beta' | 'launched';
  techStack: Array<{
    slug: string;
    label: string;
  }>;
  metrics: {
    likes: number;
    clicks: number;
  };
  isVerified: boolean;
  launchedAt?: string;
}

export interface AppDetail extends AppListItem {
  description: string;
  screenshots: string[];
  hoursBuilding?: number;
  hoursIdeation?: number;
  betaActive: boolean;
  coFounders?: Array<{
    username: string;
    name: string;
    role: string;
  }>;
  partnershipOpen?: string;
  publicRoadmapUrl?: string;
}
