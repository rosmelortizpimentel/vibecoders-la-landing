/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        'brand-yellow': 'var(--color-brand-yellow)',
        'brand-yellow-soft': 'var(--color-brand-yellow-soft)',
        'brand-black': 'var(--color-brand-black)',
        'brand-white': 'var(--color-brand-white)',
        'brand-blue': 'var(--color-brand-blue)',
        'surface-charcoal': 'var(--color-surface-charcoal)',
        'surface-silver': 'var(--color-surface-silver)',
        'text-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        medium: 'var(--shadow-medium)',
        layered: 'var(--shadow-layered)',
        deep: 'var(--shadow-deep)',
        directional: 'var(--shadow-directional)',
        ambient: 'var(--shadow-ambient)',
      },
    },
  },
};
