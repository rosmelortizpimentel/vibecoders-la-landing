import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseAdmin } from '../_shared/supabase-admin.ts';
import { internalError, jsonResponse, badRequest } from '../_shared/http.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'GET') return badRequest('Only GET is allowed');

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.rpc('get_public_charlas');

    if (error) return internalError(error.message);

    const payload = (data ?? []).map((charla: Record<string, unknown>) => ({
      id: charla.id,
      title: charla.title,
      tagline: charla.tagline,
      banner_url: charla.banner_url,
      scheduled_at: charla.scheduled_at,
      duration_minutes: charla.duration_minutes,
      luma_url: charla.luma_url,
      is_past: charla.is_past,
      speaker_name: charla.speaker_name,
      speaker_tagline: charla.speaker_tagline,
      speaker_photo_url: charla.speaker_photo_url,
      slug: charla.slug,
    }));

    return jsonResponse(payload);
  } catch (error) {
    return internalError(error instanceof Error ? error.message : 'Internal server error');
  }
});
