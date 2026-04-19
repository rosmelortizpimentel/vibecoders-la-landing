import { supabase } from '@/lib/supabase';
import { callPublicFunction } from '@/lib/public-functions';
import type { AllBuilder } from '@/types/all-builders';
import type { LandingCharla, CharlaDetail } from '@/types/landing-charla';
import type { PublicProfile } from '@/types/public-profile';
import type { ShowcaseApp } from '@/types/showcase-app';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
export const USE_SCOPED_PUBLIC_FUNCTIONS = import.meta.env.PUBLIC_USE_SCOPED_PUBLIC_FUNCTIONS === 'true';

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

async function callLegacyEdgeFunction<T>(functionName: string, query: Record<string, string>): Promise<T> {
  const url = new URL(`${supabaseUrl}/functions/v1/${functionName}`);

  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${supabaseAnonKey}`,
      apikey: supabaseAnonKey,
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string'
      ? payload.error
      : `Legacy function ${functionName} failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

export async function fetchLandingBuilders(): Promise<AllBuilder[]> {
  if (USE_SCOPED_PUBLIC_FUNCTIONS) {
    return callPublicFunction<AllBuilder[]>('landing-builders-list');
  }

  const { data, error } = await supabase.rpc('get_verified_founders');
  if (error) throw new Error(error.message);
  return (data ?? []) as AllBuilder[];
}

export async function fetchLandingApps(): Promise<ShowcaseApp[]> {
  if (USE_SCOPED_PUBLIC_FUNCTIONS) {
    return callPublicFunction<ShowcaseApp[]>('landing-apps-list');
  }

  const { data, error } = await supabase.rpc('get_showcase_apps');
  if (error) throw new Error(error.message);
  return (data ?? []) as ShowcaseApp[];
}

export async function fetchLandingCharlas(): Promise<LandingCharla[]> {
  if (USE_SCOPED_PUBLIC_FUNCTIONS) {
    return callPublicFunction<LandingCharla[]>('landing-charlas-list');
  }

  const { data, error } = await supabase.rpc('get_landing_charlas');
  if (error) throw new Error(error.message);
  return (data ?? []) as LandingCharla[];
}

export async function fetchDirectoryBuilders(limit: number, offset: number): Promise<AllBuilder[]> {
  if (USE_SCOPED_PUBLIC_FUNCTIONS) {
    return callPublicFunction<AllBuilder[]>('directory-builders-list', {
      query: { limit, offset },
    });
  }

  const { data, error } = await supabase.rpc('get_verified_founders', {
    p_limit: limit,
    p_offset: offset,
  });
  if (error) throw new Error(error.message);
  return (data ?? []) as AllBuilder[];
}

export async function fetchDirectoryApps(limit: number, offset: number): Promise<ShowcaseApp[]> {
  if (USE_SCOPED_PUBLIC_FUNCTIONS) {
    return callPublicFunction<ShowcaseApp[]>('directory-apps-list', {
      query: { limit, offset },
    });
  }

  const { data, error } = await supabase.rpc('get_showcase_apps', {
    p_limit: limit,
    p_offset: offset,
  });
  if (error) throw new Error(error.message);
  return (data ?? []) as ShowcaseApp[];
}

export async function fetchDirectoryCharlas(): Promise<LandingCharla[]> {
  if (USE_SCOPED_PUBLIC_FUNCTIONS) {
    return callPublicFunction<LandingCharla[]>('directory-charlas-list');
  }

  const { data, error } = await supabase.rpc('get_public_charlas');
  if (error) throw new Error(error.message);
  return (data ?? []) as LandingCharla[];
}

export async function fetchPublicBuilderProfile(username: string): Promise<PublicProfile['profile']> {
  if (USE_SCOPED_PUBLIC_FUNCTIONS) {
    return callPublicFunction<PublicProfile['profile']>('public-builder-profile', {
      query: { username },
    });
  }

  const payload = await callLegacyEdgeFunction<PublicProfile>('get-public-profile', { username });

  if (!payload?.success || !payload.profile) {
    throw new Error('Profile not found');
  }

  return payload.profile;
}

export async function fetchPublicAppDetail(appId: string): Promise<PublicAppDetail> {
  if (USE_SCOPED_PUBLIC_FUNCTIONS) {
    return callPublicFunction<PublicAppDetail>('public-app-detail', {
      query: { app_id: appId },
    });
  }

  return callLegacyEdgeFunction<PublicAppDetail>('get-app-detail', { app_id: appId });
}

export async function fetchPublicCharlaDetail(identifier: string): Promise<CharlaDetail> {
  if (USE_SCOPED_PUBLIC_FUNCTIONS) {
    return callPublicFunction<CharlaDetail>('public-charla-detail', {
      query: { identifier },
    });
  }

  const { data, error } = await supabase.rpc('get_charla_detail', {
    p_identifier: identifier,
  });

  if (error) throw new Error(error.message);

  const charla = ((data ?? [])[0] ?? null) as CharlaDetail | null;
  if (!charla) throw new Error('Charla not found');
  return charla;
}
