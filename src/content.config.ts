import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { pathToFileURL } from 'node:url'

// Load SKILL.md files from the agent-skills submodule.
// Two collections: `skills` (top-level curated) and `ruleSkills` (auto-generated rule wrappers).

const SKILLS_SRC = process.env.SKILLS_SRC || 'C:/d/oriz/repos/own/infra/agent-skills'
const baseUrl = pathToFileURL(SKILLS_SRC + '/').toString()

const skillSchema = z.object({
  name: z.string(),
  description: z.string(),
  'allowed-tools': z.string().optional(),
  hidden: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
}).passthrough()

const skills = defineCollection({
  loader: glob({
    pattern: ['*/SKILL.md', '!rules-gen/**', '!scripts/**'],
    base: baseUrl,
    generateId: ({ entry }) => entry.replace(/\/SKILL\.md$/, '').replace(/\\/g, '/'),
  }),
  schema: skillSchema,
})

const ruleSkills = defineCollection({
  loader: glob({
    pattern: 'rules-gen/*/SKILL.md',
    base: baseUrl,
    generateId: ({ entry }) =>
      entry.replace(/^rules-gen\//, '').replace(/\/SKILL\.md$/, '').replace(/\\/g, '/'),
  }),
  schema: skillSchema,
})

export const collections = { skills, ruleSkills }
