import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const skills = await getCollection('skills')
  const ruleSkills = await getCollection('ruleSkills')
  const total = skills.length + ruleSkills.length

  const lines: string[] = [
    `# skills.oriz.in — ${total} agent skills`,
    '',
    `## About`,
    `Anthropic-format SKILL.md bundle. Each skill has YAML frontmatter (name/description) + a markdown body describing when to trigger and how the agent should behave.`,
    `Source: https://github.com/chirag127/agent-skills`,
    '',
    `## Curated skills (${skills.length})`,
    '',
  ]

  for (const s of [...skills].sort((a, b) => ((a.data as any).name || a.id).localeCompare((b.data as any).name || b.id))) {
    const d = s.data as any
    lines.push(`### ${d.name || s.id}`)
    lines.push('')
    if (d.description) lines.push(d.description)
    lines.push(`URL: https://skills.oriz.in/${s.id}/`)
    lines.push('')
  }

  lines.push(`## Auto-generated rule skills (${ruleSkills.length})`)
  lines.push('')

  for (const s of [...ruleSkills].sort((a, b) => ((a.data as any).name || a.id).localeCompare((b.data as any).name || b.id))) {
    const d = s.data as any
    const short = (d.name || s.id).replace(/^rule-/, '')
    lines.push(`### rule: ${short}`)
    lines.push('')
    if (d.description) lines.push(d.description)
    lines.push(`URL: https://skills.oriz.in/rules/${s.id}/`)
    lines.push(`Full rule: https://knowledge.oriz.in/rules/${short}/`)
    lines.push('')
  }

  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
