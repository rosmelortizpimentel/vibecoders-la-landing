import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseAdmin } from '../_shared/supabase-admin.ts';
import { badRequest, internalError, jsonResponse } from '../_shared/http.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'GET') return badRequest('Only GET is allowed');

  try {
    const url = new URL(req.url);
    const limitParam = Number(url.searchParams.get('limit') ?? '5');
    const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 10) : 5;

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.rpc('get_verified_founders', {
      p_limit: limit,
      p_offset: 0,
    });

    if (error) return internalError(error.message);

    const payload = (data ?? []).map((builder: Record<string, unknown>) => ({
      display_name: builder.display_name,
      username: builder.username,
      avatar_url: builder.avatar_url,
      tagline: builder.tagline,
      city: builder.city,
      apps_count: builder.apps_count,
      social_links: builder.social_links,
      is_pro: builder.is_pro,
      is_founder: builder.is_founder,
      seeks_partner: builder.seeks_partner,
    }));

    return jsonResponse(payload);
  } catch (error) {
    return internalError(error instanceof Error ? error.message : 'Internal server error');
  }
});
