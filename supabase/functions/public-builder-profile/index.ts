import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseAdmin } from '../_shared/supabase-admin.ts';
import { badRequest, internalError, jsonResponse } from '../_shared/http.ts';

interface ReferralStack {
  id: string;
  name: string;
  logo_url: string | null;
  website_url?: string | null;
  referral_url?: string | null;
  referral_param?: string | null;
  default_referral_code?: string | null;
}

function buildStackReferralUrl(stack: ReferralStack, customCode?: string | null): string | null {
  const code = customCode || stack.default_referral_code;

  if (stack.referral_url && code) {
    return stack.referral_url.replace('{code}', code);
  }

  if (stack.referral_param && code && stack.website_url) {
    try {
      const url = new URL(stack.website_url);
      url.searchParams.set(stack.referral_param, code);
      return url.toString();
    } catch {
      return stack.website_url;
    }
  }

  return stack.website_url || null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'GET') return badRequest('Only GET is allowed');

  try {
    const url = new URL(req.url);
    const username = url.searchParams.get('username');

    if (!username || !/^[a-zA-Z0-9_]{1,20}$/.test(username)) {
      return badRequest('Invalid username');
    }

    const supabase = createSupabaseAdmin();
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        id, username, member_number, is_pioneer, show_pioneer_badge,
        name, tagline, bio, location, website, banner_url, avatar_url,
        avatar_position, banner_position,
        primary_color, accent_color, font_family,
        booking_url, booking_button_text,
        lovable, twitter, github, linkedin, instagram, youtube, tiktok,
        is_contributor, show_contributor_badge
      `)
      .eq('username', username.toLowerCase())
      .maybeSingle();

    if (profileError) return internalError(profileError.message);
    if (!profile) return jsonResponse({ error: 'Profile not found' }, { status: 404 });

    if (profile.booking_url != null) {
      let isPremium = false;

      const { data: userRole } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', profile.id)
        .eq('role', 'founder')
        .maybeSingle();

      if (userRole) {
        isPremium = true;
      } else {
        const { data: userSub } = await supabase
          .from('user_subscriptions')
          .select('subscription_status')
          .eq('user_id', profile.id)
          .in('subscription_status', ['active', 'trialing'])
          .maybeSingle();

        if (userSub) isPremium = true;
      }

      if (!isPremium) {
        profile.booking_url = null;
        profile.booking_button_text = null;
      }
    }

    const { data: foundedApps } = await supabase
      .from('app_founders')
      .select('app_id')
      .eq('user_id', profile.id);

    const coFoundedAppIds = (foundedApps ?? []).map((item: { app_id: string }) => item.app_id);

    let appsQuery = supabase
      .from('apps')
      .select(`
        id, url, name, tagline, description, logo_url, category_id, status_id, display_order, is_verified,
        hours_ideation, hours_building, screenshots, tags, beta_active, user_id, open_to_partnerships, partnership_types,
        app_stacks(stack_id)
      `)
      .eq('is_visible', true);

    if (coFoundedAppIds.length > 0) {
      const formattedIds = coFoundedAppIds.map((id) => `"${id}"`).join(',');
      appsQuery = appsQuery.or(`user_id.eq.${profile.id},id.in.(${formattedIds})`);
    } else {
      appsQuery = appsQuery.eq('user_id', profile.id);
    }

    const [{ data: appsData }, { data: statuses }, { data: categories }, { data: stacks }, { data: userReferrals }] = await Promise.all([
      appsQuery.order('display_order', { ascending: true }),
      supabase.from('app_statuses').select('id, name, slug'),
      supabase.from('app_categories').select('id, name, slug'),
      supabase.from('tech_stacks').select('id, name, logo_url, website_url, referral_url, referral_param, default_referral_code'),
      supabase.from('user_stack_referrals').select('stack_id, referral_code').eq('user_id', profile.id),
    ]);

    const apps = (appsData ?? []).map((app: Record<string, unknown>) => {
      const status = app.status_id && statuses
        ? statuses.find((item: Record<string, unknown>) => item.id === app.status_id)
        : null;

      const category = app.category_id && categories
        ? categories.find((item: Record<string, unknown>) => item.id === app.category_id)
        : null;

      const appStacks = ((app.app_stacks as Array<{ stack_id: string }> | null) ?? [])
        .map((stackRef) => {
          const stack = (stacks ?? []).find((item: ReferralStack) => item.id === stackRef.stack_id);
          if (!stack) return null;

          const userReferral = (userReferrals ?? []).find((item: { stack_id: string; referral_code: string | null }) => item.stack_id === stack.id);

          return {
            id: stack.id,
            name: stack.name,
            logo_url: stack.logo_url,
            url: buildStackReferralUrl(stack, userReferral?.referral_code),
          };
        })
        .filter(Boolean)
        .slice(0, 4);

      return {
        id: app.id,
        url: app.url,
        name: app.name,
        tagline: app.tagline,
        description: app.description,
        logo_url: app.logo_url,
        is_verified: app.is_verified || false,
        hours_ideation: app.hours_ideation || 0,
        hours_building: app.hours_building || 0,
        screenshots: app.screenshots || [],
        tags: app.tags || [],
        beta_active: app.beta_active || false,
        open_to_partnerships: app.open_to_partnerships || false,
        partnership_types: app.partnership_types || [],
        status: status ? { name: status.name, slug: status.slug } : null,
        category: category ? { id: category.id, name: category.name, slug: category.slug } : null,
        stacks: appStacks,
      };
    });

    const { data: testerRows } = await supabase
      .from('beta_testers')
      .select('app_id, joined_at, feedback_count')
      .eq('user_id', profile.id)
      .gt('feedback_count', 0)
      .order('joined_at', { ascending: false });

    const testerAppIds = [...new Set((testerRows ?? []).map((row: { app_id: string }) => row.app_id))];
    let testerApps: Array<{ id: string; name: string; tagline: string | null; logo_url: string | null }> = [];

    if (testerAppIds.length > 0) {
      const { data: testerAppsData } = await supabase
        .from('apps')
        .select('id, name, tagline, logo_url')
        .in('id', testerAppIds)
        .eq('is_visible', true);

      const testerAppsMap = new Map((testerAppsData ?? []).map((app: { id: string; name: string; tagline: string | null; logo_url: string | null }) => [app.id, app]));
      testerApps = testerAppIds
        .map((appId) => testerAppsMap.get(appId))
        .filter((app): app is { id: string; name: string; tagline: string | null; logo_url: string | null } => Boolean(app));
    }

    const { data: speakerRows } = await supabase
      .from('speakers')
      .select('id')
      .eq('user_id', profile.id);

    const speakerIds = (speakerRows ?? []).map((row: { id: string }) => row.id);
    let talks: Array<{ id: string; title: string; tagline: string | null; slug: string | null }> = [];

    if (speakerIds.length > 0) {
      const { data: workshopSpeakerRows } = await supabase
        .from('workshop_speakers')
        .select('workshop_id')
        .in('speaker_id', speakerIds);

      const workshopIds = [...new Set((workshopSpeakerRows ?? []).map((row: { workshop_id: string }) => row.workshop_id))];

      if (workshopIds.length > 0) {
        const { data: talksData } = await supabase
          .from('workshops')
          .select('id, title, tagline, slug')
          .in('id', workshopIds)
          .eq('is_confirmed', true)
          .eq('status', 'published')
          .order('scheduled_at', { ascending: false });

        talks = (talksData ?? []).map((talk: { id: string; title: string; tagline: string | null; slug: string | null }) => ({
          id: talk.id,
          title: talk.title,
          tagline: talk.tagline,
          slug: talk.slug,
        }));
      }
    }

    const payload = {
      id: profile.id,
      username: profile.username,
      avatar_url: profile.avatar_url,
      avatar_position: profile.avatar_position || 'center',
      banner_url: profile.banner_url,
      banner_position: profile.banner_position || 'center',
      name: profile.name,
      tagline: profile.tagline,
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
      accent_color: profile.accent_color,
      primary_color: profile.primary_color || '#3D5AFE',
      font_family: profile.font_family,
      booking_url: profile.booking_url,
      booking_button_text: profile.booking_button_text,
      member_number: (profile.member_number || 1) + 11,
      is_pioneer: profile.is_pioneer || false,
      show_pioneer_badge: profile.show_pioneer_badge ?? true,
      lovable: profile.lovable,
      twitter: profile.twitter,
      github: profile.github,
      linkedin: profile.linkedin,
      instagram: profile.instagram,
      youtube: profile.youtube,
      tiktok: profile.tiktok,
      apps,
      tester_apps: testerApps,
      talks,
    };

    return jsonResponse(payload);
  } catch (error) {
    return internalError(error instanceof Error ? error.message : 'Internal server error');
  }
});
