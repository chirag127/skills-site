import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import siteShell from '@chirag127/site-shell/astro'

export default defineConfig({
  site: 'https://skills.oriz.in',
  output: 'static',
  vite: { plugins: [tailwindcss()] },
  integrations: [
    react(),
    mdx(),
    sitemap(),
    siteShell({
      name: 'skills',
      tagline: 'The toolbox — 64 skills',
      palette: {
        bg: '#020617',
        fg: '#f4f4f5',
        accent: '#22d3ee',
        accent2: '#bef264',
        muted: '#71717a',
        rule: '#1e293b',
      },
      fonts: { head: 'JetBrains Mono', body: 'Inter', mono: 'JetBrains Mono' },
      githubUrl: 'https://github.com/chirag127/skills-site',
    }),
  ],
  experimental: {},
})
