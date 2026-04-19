import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseAdmin } from '../_shared/supabase-admin.ts';
import { badRequest, internalError, jsonResponse } from '../_shared/http.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'GET') return badRequest('Only GET is allowed');

  try {
    const url = new URL(req.url);
    const limitParam = Number(url.searchParams.get('limit') ?? '20');
    const offsetParam = Number(url.searchParams.get('offset') ?? '0');
    const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 50) : 20;
    const offset = Number.isFinite(offsetParam) ? Math.max(offsetParam, 0) : 0;

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.rpc('get_showcase_apps', {
      p_limit: limit,
      p_offset: offset,
    });

    if (error) return internalError(error.message);

    const payload = (data ?? []).map((app: Record<string, unknown>) => ({
      id: app.id,
      app_name: app.app_name,
      app_tagline: app.app_tagline,
      app_logo_url: app.app_logo_url,
      app_url: app.app_url,
      is_verified: app.is_verified,
      founder_handle: app.founder_handle,
      founder_display_name: app.founder_display_name,
      founder_avatar_url: app.founder_avatar_url,
      founder_social_links: app.founder_social_links,
      status: app.status,
      stacks: app.stacks,
      beta_active: app.beta_active,
      open_to_partnerships: app.open_to_partnerships,
      created_at: app.created_at,
    }));

    return jsonResponse(payload);
  } catch (error) {
    return internalError(error instanceof Error ? error.message : 'Internal server error');
  }
});
