import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

/**
 * Load SKILL.md files from the agent-skills submodule.
 *
 * Uses absolute glob path (env-configurable). On CI: SKILLS_SRC=./agent-skills.
 * Two collections:
 *   - `skills` — top-level curated skills (glob `*/SKILL.md`, excluding rules-gen/ + scripts/)
 *   - `ruleSkills` — auto-generated rule wrappers (glob `rules-gen/* /SKILL.md`)
 */
const SKILLS_SRC = process.env.SKILLS_SRC || 'C:/d/oriz/repos/own/infra/agent-skills'

const skillSchema = z.object({
  name: z.string(),
  description: z.string(),
  'allowed-tools': z.string().optional(),
  hidden: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
})

const skills = defineCollection({
  loader: glob({
    pattern: '*/SKILL.md',
    base: SKILLS_SRC,
    generateId: ({ entry }) => entry.replace(/\/SKILL\.md$/, '').replace(/\\/g, '/'),
  }),
  schema: skillSchema,
})

const ruleSkills = defineCollection({
  loader: glob({
    pattern: 'rules-gen/*/SKILL.md',
    base: SKILLS_SRC,
    generateId: ({ entry }) =>
      entry.replace(/^rules-gen\//, '').replace(/\/SKILL\.md$/, '').replace(/\\/g, '/'),
  }),
  schema: skillSchema,
})

export const collections = { skills, ruleSkills }
