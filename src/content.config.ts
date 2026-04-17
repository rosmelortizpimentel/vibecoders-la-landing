import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─── Blog ─────────────────────────────────────────────────────────────────────
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(80),
    description: z.string().max(180),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    author: z.object({
      name: z.string(),
      username: z.string(),
      avatarUrl: z.string().url().optional(),
    }),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cluster: z.enum([
      'vibe-coding',
      'lanzamientos',
      'tutoriales',
      'decisiones-tecnicas',
      'opinion',
    ]),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

// ─── Charlas ──────────────────────────────────────────────────────────────────
const charlas = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/charlas' }),
  schema: z.object({
    sessionNumber: z.number().int().positive(),
    title: z.string(),
    tagline: z.string().max(180),
    speaker: z.object({
      name: z.string(),
      username: z.string().optional(),
      role: z.string(),
      bio: z.string(),
      avatarUrl: z.string().url().optional(),
      linkedinUrl: z.string().url().optional(),
      twitterUrl: z.string().url().optional(),
      websiteUrl: z.string().url().optional(),
    }),
    recordedAt: z.date(),
    durationMinutes: z.number().int().positive().optional(),
    videoUrl: z.string().url().optional(),
    videoEmbedId: z.string().optional(),
    thumbnail: z.string().optional(),
    transcript: z.string().optional(),
    topics: z.array(z.string()).default([]),
    resources: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
          type: z.enum(['article', 'tool', 'repo', 'video', 'other']),
        })
      )
      .default([]),
    timestamps: z
      .array(
        z.object({
          seconds: z.number().int().nonnegative(),
          label: z.string(),
        })
      )
      .default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// ─── Recursos ─────────────────────────────────────────────────────────────────
const recursos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/recursos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['prompt', 'template', 'guide', 'snippet', 'spec']),
    tags: z.array(z.string()).default([]),
    compatibleTools: z.array(z.string()).default([]),
    difficulty: z
      .enum(['beginner', 'intermediate', 'advanced'])
      .default('beginner'),
    downloadUrl: z.string().url().optional(),
    publishedAt: z.date(),
    author: z.object({
      name: z.string(),
      username: z.string().optional(),
    }),
    draft: z.boolean().default(false),
  }),
});

// ─── Tools ────────────────────────────────────────────────────────────────────
const tools = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/tools' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    category: z.enum([
      'ai-code-editor',
      'no-code-builder',
      'design-tool',
      'backend-as-service',
      'agent-framework',
      'deployment',
      'other',
    ]),
    website: z.string().url(),
    referralUrl: z.string().url().optional(),
    logo: z.string(),
    pricing: z.enum(['free', 'freemium', 'paid', 'trial']),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    bestFor: z.array(z.string()),
    alternatives: z.array(z.string()).default([]),
    reviewedBy: z
      .object({
        name: z.string(),
        username: z.string().optional(),
      })
      .optional(),
    rating: z.number().min(0).max(5).optional(),
    publishedAt: z.date(),
    draft: z.boolean().default(false),
  }),
});

// ─── Learn ────────────────────────────────────────────────────────────────────
const learn = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/learn' }),
  schema: z.object({
    moduleNumber: z.number().int().positive(),
    title: z.string(),
    description: z.string(),
    durationMinutes: z.number().int().positive(),
    prerequisites: z.array(z.string()).default([]),
    outcomes: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

// ─── Glosario ─────────────────────────────────────────────────────────────────
const glosario = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/glosario' }),
  schema: z.object({
    term: z.string(),
    acronym: z.string().optional(),
    shortDefinition: z.string().max(200),
    category: z.enum([
      'ai-fundamentals',
      'agents',
      'tools',
      'workflows',
      'metrics',
      'methodologies',
      'other',
    ]),
    relatedTerms: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// ─── Export ───────────────────────────────────────────────────────────────────
export const collections = {
  blog,
  charlas,
  recursos,
  tools,
  learn,
  glosario,
};
