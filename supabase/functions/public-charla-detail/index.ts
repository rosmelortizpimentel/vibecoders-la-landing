import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseAdmin } from '../_shared/supabase-admin.ts';
import { badRequest, internalError, jsonResponse } from '../_shared/http.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'GET') return badRequest('Only GET is allowed');

  try {
    const url = new URL(req.url);
    const identifier = url.searchParams.get('identifier');

    if (!identifier || identifier.length > 200) {
      return badRequest('identifier is required');
    }

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.rpc('get_charla_detail', {
      p_identifier: identifier,
    });

    if (error) return internalError(error.message);

    const charla = (data ?? [])[0] ?? null;

    if (!charla) {
      return jsonResponse({ error: 'Charla not found' }, { status: 404 });
    }

    const payload = {
      id: charla.id,
      title: charla.title,
      description: charla.description,
      tagline: charla.tagline,
      banner_url: charla.banner_url,
      youtube_cover_url: charla.youtube_cover_url,
      scheduled_at: charla.scheduled_at,
      duration_minutes: charla.duration_minutes,
      luma_url: charla.luma_url,
      recording_url: charla.recording_url,
      is_past: charla.is_past,
      session_number: charla.session_number,
      speaker_name: charla.speaker_name,
      speaker_tagline: charla.speaker_tagline,
      speaker_photo_url: charla.speaker_photo_url,
      speaker_username: charla.speaker_username,
      speaker_twitter: charla.speaker_twitter,
      speaker_github: charla.speaker_github,
      speaker_linkedin: charla.speaker_linkedin,
      speaker_youtube: charla.speaker_youtube,
      speaker_website: charla.speaker_website,
      speaker_lovable: charla.speaker_lovable,
      download_urls: charla.download_urls,
      resources_html: charla.resources_html,
    };

    return jsonResponse(payload);
  } catch (error) {
    return internalError(error instanceof Error ? error.message : 'Internal server error');
  }
});
