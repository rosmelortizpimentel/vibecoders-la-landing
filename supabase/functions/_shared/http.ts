import { corsHeaders } from './cors.ts';

export function jsonResponse(payload: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
}

export function methodNotAllowed() {
  return jsonResponse({ error: 'Method not allowed' }, { status: 405 });
}

export function badRequest(error: string) {
  return jsonResponse({ error }, { status: 400 });
}

export function internalError(error = 'Internal server error') {
  return jsonResponse({ error }, { status: 500 });
}
