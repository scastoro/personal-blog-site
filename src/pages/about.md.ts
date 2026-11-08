import { bio, experiences, skillGroups } from '@/data/profile';
import { SITE_CONFIG } from '@/utils/seo';
import { absoluteURL, frontmatter, markdownResponse } from '@/utils/markdown';

export function GET() {
  const skills = skillGroups.map((group) => `- **${group.name}:** ${group.skills.join(', ')}`);

  const history = experiences.map((job) => {
    const details = job.description.map((item) => `- ${item}`).join('\n');
    const technologies = job.technologies ? `\n\nTechnologies: ${job.technologies.join(', ')}` : '';
    return `### ${job.title}, ${job.company}\n\n${job.period} · ${job.location}\n\n${details}${technologies}`;
  });

  return markdownResponse(`${frontmatter({
    title: `About ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
    url: absoluteURL('/about/'),
  })}

# About ${SITE_CONFIG.name}

${bio.join('\n\n')}

## Skills

${skills.join('\n')}

## Experience

${history.join('\n\n')}

## Contact

- Email: ${SITE_CONFIG.author.email}
- GitHub: ${SITE_CONFIG.social.github}
- LinkedIn: ${SITE_CONFIG.social.linkedin}
- X: ${SITE_CONFIG.social.twitter}
`);
}
