import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const skills = await getCollection('skills')
  const ruleSkills = await getCollection('ruleSkills')

  const docs = [
    ...skills.map(s => {
      const d = s.data as any
      return {
        slug: s.id,
        name: d.name || s.id,
        description: d.description || '',
        kind: 'skill',
        href: `/${s.id}/`,
      }
    }),
    ...ruleSkills.map(s => {
      const d = s.data as any
      return {
        slug: `rules/${s.id}`,
        name: (d.name || s.id).replace(/^rule-/, ''),
        description: d.description || '',
        kind: 'rule',
        href: `/rules/${s.id}/`,
      }
    }),
  ]

  return new Response(JSON.stringify(docs), {
    headers: { 'content-type': 'application/json' },
  })
}
