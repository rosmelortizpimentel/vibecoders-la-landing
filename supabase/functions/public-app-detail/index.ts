import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseAdmin } from '../_shared/supabase-admin.ts';
import { badRequest, internalError, jsonResponse } from '../_shared/http.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'GET') return badRequest('Only GET is allowed');

  try {
    const url = new URL(req.url);
    const appId = url.searchParams.get('app_id');

    if (!appId) return badRequest('app_id is required');

    const supabase = createSupabaseAdmin();
    const { data: app, error: appError } = await supabase
      .from('apps')
      .select(`
        id, user_id, name, tagline, description, logo_url, url, beta_link, beta_active,
        is_verified, open_to_partnerships, screenshots, tags, created_at,
        owner:profiles!apps_user_id_fkey(id, username, name, avatar_url, tagline, linkedin, twitter, github, youtube, instagram, tiktok, website, lovable),
        category:app_categories(id, name, slug, icon),
        status:app_statuses(id, name, slug, color, icon),
        app_stacks(stack_id, tech_stacks(id, name, logo_url))
      `)
      .eq('id', appId)
      .eq('is_visible', true)
      .single();

    if (appError) return internalError(appError.message);
    if (!app) return jsonResponse({ error: 'App not found' }, { status: 404 });

    const [{ count: testersCount }, { data: founders }, { count: likesCount }] = await Promise.all([
      supabase.from('beta_testers').select('*', { count: 'exact', head: true }).eq('app_id', appId).eq('status', 'accepted'),
      supabase
        .from('app_founders')
        .select(`
          id,
          user_id,
          role,
          created_at,
          profile:profiles(id, username, name, avatar_url, tagline, linkedin, twitter, github, youtube, instagram, tiktok, website, lovable)
        `)
        .eq('app_id', appId)
        .order('created_at', { ascending: true }),
      supabase.from('app_likes').select('*', { count: 'exact', head: true }).eq('app_id', appId),
    ]);

    const ownerFounder = {
      id: 'owner',
      user_id: app.user_id,
      role: 'owner',
      profile: app.owner,
    };

    const uniqueFounders = [ownerFounder, ...(founders ?? [])].filter((founder, index, items) => {
      return items.findIndex((candidate) => candidate.user_id === founder.user_id) === index;
    });

    const payload = {
      id: app.id,
      name: app.name,
      tagline: app.tagline,
      description: app.description,
      logo_url: app.logo_url,
      url: app.url,
      beta_link: app.beta_link,
      beta_active: app.beta_active || false,
      is_verified: app.is_verified || false,
      open_to_partnerships: app.open_to_partnerships || false,
      screenshots: app.screenshots || [],
      tags: app.tags || [],
      owner: app.owner,
      category: app.category,
      status: app.status,
      stacks: (app.app_stacks ?? []).map((entry: { tech_stacks: { id: string; name: string; logo_url: string | null } }) => entry.tech_stacks),
      founders: uniqueFounders,
      likes_count: likesCount || 0,
      testers_count: testersCount || 0,
    };

    return jsonResponse(payload);
  } catch (error) {
    return internalError(error instanceof Error ? error.message : 'Internal server error');
  }
});
