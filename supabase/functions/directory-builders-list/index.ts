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
    const { data, error } = await supabase.rpc('get_verified_founders', {
      p_limit: limit,
      p_offset: offset,
    });

    if (error) return internalError(error.message);

    const payload = (data ?? []).map((builder: Record<string, unknown>) => ({
      username: builder.username,
      display_name: builder.display_name,
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
