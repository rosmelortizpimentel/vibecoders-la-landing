/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly PUBLIC_PLATFORM_URL: string;
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_USE_SCOPED_PUBLIC_FUNCTIONS?: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
