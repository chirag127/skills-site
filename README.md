# skills-site

Astro source for [skills.oriz.in](https://skills.oriz.in) — the toolbox, ~64 agent skills wired to Claude Code, rendered as a cool-tech dark grid.

## Stack

- **Astro 5** — static-site generation
- **Tailwind v4** — utility CSS
- **React 19** — islands
- **FlexSearch** — client-side search over names + descriptions
- **[@chirag127/site-shell](https://github.com/chirag127/site-shell)** — shared wordmark, footer, Bunny Fonts loader
- **Content**: absolute glob at `C:/d/oriz/repos/own/infra/agent-skills` (env: `SKILLS_SRC`)

## Design — The Toolbox

Cool tech dark. Slate-950 (`#020617`) ground, cyan (`#22d3ee`) blink-cursor accent, lime (`#bef264`) success/rule badges. JetBrains Mono for structural text, Inter for body copy. Every card wears a `$ skill invoke <name>` terminal prompt as its header. Dark-only — no theme swap.

Per [`per-app-distinctive-frontend-design`](https://knowledge.oriz.in/rules/design/per-app-distinctive-frontend-design/).

## Collections

Two content collections load from the same `agent-skills` tree:

- `skills` — top-level curated skills (glob `*/SKILL.md`)
- `ruleSkills` — auto-generated wrappers over `knowledge/rules/*` (glob `rules-gen/*/SKILL.md`)

Both use a simple Zod schema — SKILL.md frontmatter is just `name` + `description` (+ optional `allowed-tools`, `hidden`).

## Dev

```bash
pnpm install
SKILLS_SRC=/absolute/path/to/agent-skills pnpm dev
```

## Deploy

```bash
pnpm deploy   # astro build + wrangler pages deploy dist
```

## License

MIT.
