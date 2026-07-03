import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context: any) {
  const skills = await getCollection('skills')
  const ruleSkills = await getCollection('ruleSkills')

  const items = [
    ...skills.map(s => {
      const d = s.data as any
      return {
        title: d.name || s.id,
        description: d.description || '',
        link: `/${s.id}/`,
        pubDate: new Date(),
      }
    }),
    ...ruleSkills.map(s => {
      const d = s.data as any
      return {
        title: `rule: ${(d.name || s.id).replace(/^rule-/, '')}`,
        description: d.description || '',
        link: `/rules/${s.id}/`,
        pubDate: new Date(),
      }
    }),
  ].sort((a, b) => a.title.localeCompare(b.title))

  return rss({
    title: 'skills.oriz.in',
    description: 'The toolbox — agent skills wired to Claude Code',
    site: context.site!.toString(),
    items,
  })
}
