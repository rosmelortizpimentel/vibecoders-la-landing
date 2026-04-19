import { callPublicFunction } from '@/lib/public-functions';
import type { AllBuilder } from '@/types/all-builders';
import type { LandingCharla, CharlaDetail } from '@/types/landing-charla';
import type { PublicProfile } from '@/types/public-profile';
import type { ShowcaseApp } from '@/types/showcase-app';

interface AppOwner {
  id: string;
  username: string | null;
  name: string | null;
  avatar_url: string | null;
  tagline: string | null;
  linkedin: string | null;
  twitter: string | null;
  github: string | null;
  youtube: string | null;
  instagram: string | null;
  tiktok: string | null;
  website: string | null;
  lovable: string | null;
}

interface AppFounder {
  id: string;
  user_id: string;
  role: string;
  profile: AppOwner | null;
}

interface AppStatus {
  id?: string;
  name: string;
  slug: string;
}

interface AppCategory {
  id: string;
  name: string;
  slug: string;
}

interface AppStack {
  id: string;
  name: string;
  logo_url: string | null;
}

export interface PublicAppDetail {
  id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  url: string;
  beta_link: string | null;
  beta_active: boolean;
  is_verified: boolean;
  open_to_partnerships: boolean;
  screenshots: string[];
  tags: string[];
  owner: AppOwner | null;
  category: AppCategory | null;
  status: AppStatus | null;
  stacks: AppStack[];
  founders: AppFounder[];
  likes_count: number;
  testers_count: number;
}

export async function fetchLandingBuilders(): Promise<AllBuilder[]> {
  return callPublicFunction<AllBuilder[]>('landing-builders-list');
}

export async function fetchLandingApps(): Promise<ShowcaseApp[]> {
  return callPublicFunction<ShowcaseApp[]>('landing-apps-list');
}

export async function fetchLandingCharlas(): Promise<LandingCharla[]> {
  return callPublicFunction<LandingCharla[]>('landing-charlas-list');
}

export async function fetchDirectoryBuilders(limit: number, offset: number): Promise<AllBuilder[]> {
  return callPublicFunction<AllBuilder[]>('directory-builders-list', {
    query: { limit, offset },
  });
}

export async function fetchDirectoryApps(limit: number, offset: number): Promise<ShowcaseApp[]> {
  return callPublicFunction<ShowcaseApp[]>('directory-apps-list', {
    query: { limit, offset },
  });
}

export async function fetchDirectoryCharlas(): Promise<LandingCharla[]> {
  return callPublicFunction<LandingCharla[]>('directory-charlas-list');
}

export async function fetchPublicBuilderProfile(username: string): Promise<PublicProfile['profile']> {
  return callPublicFunction<PublicProfile['profile']>('public-builder-profile', {
    query: { username },
  });
}

export async function fetchPublicAppDetail(appId: string): Promise<PublicAppDetail> {
  return callPublicFunction<PublicAppDetail>('public-app-detail', {
    query: { app_id: appId },
  });
}

export async function fetchPublicCharlaDetail(identifier: string): Promise<CharlaDetail> {
  return callPublicFunction<CharlaDetail>('public-charla-detail', {
    query: { identifier },
  });
}
