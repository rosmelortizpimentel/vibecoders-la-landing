type QueryValue = string | number | boolean | null | undefined;

interface CallPublicFunctionOptions {
  query?: Record<string, QueryValue>;
}

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase env vars. Set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY in .env');
}

function buildFunctionUrl(functionName: string, query?: Record<string, QueryValue>) {
  const url = new URL(`${supabaseUrl}/functions/v1/${functionName}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

export async function callPublicFunction<T>(functionName: string, options: CallPublicFunctionOptions = {}): Promise<T> {
  const response = await fetch(buildFunctionUrl(functionName, options.query), {
    headers: {
      Authorization: `Bearer ${supabaseAnonKey}`,
      apikey: supabaseAnonKey,
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string'
      ? payload.error
      : `Function ${functionName} failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}
