// Bio, skills, and work history. Rendered by the about page and its Markdown version.
export const bio = [
  "I'm a software engineer with six years of experience building full-stack web applications, from commercial insurance quoting platforms to payment portals. I like taking legacy systems and turning them into fast, maintainable software.",
  "I'm currently a software engineer at Avtal in Austin, where I work across the stack with React, TypeScript, and Hono. Before that, I spent three years modernizing commercial insurance platforms at Great American Insurance Group. I'm always excited to learn new technologies and tackle challenging projects.",
  'Outside of work, I build side projects like RunWalk, my iPhone and Apple Watch run/walk training app, play tabletop RPGs, and write about what I learn here on the blog.',
];

export interface SkillGroup {
  name: string;
  /** Heroicons outline path(s) */
  icon: string[];
  /** Tailwind classes for the icon tile */
  tone: string;
  skills: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies?: string[];
}


export const skillGroups: SkillGroup[] = [
  {
    name: 'Frontend',
    icon: ['M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
    tone: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
    skills: ['React', 'TypeScript', 'Next.js', 'Astro', 'Tailwind CSS', 'shadcn/ui', 'SwiftUI'],
  },
  {
    name: 'Backend & Data',
    icon: ['M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2'],
    tone: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
    skills: ['Node.js', 'Hono', 'Express', 'Fastify', 'Go', 'Python', 'REST APIs', 'PostgreSQL', 'MongoDB'],
  },
  {
    name: 'Cloud & DevOps',
    icon: ['M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'],
    tone: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
    skills: ['AWS', 'Cloudflare Workers', 'Azure', 'GitHub Actions', 'Docker', 'CI/CD'],
  },
  {
    name: 'AI & Developer Tools',
    icon: ['M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'],
    tone: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400',
    skills: ['Claude Code', 'Cursor', 'GitHub Copilot', 'LangChain.js', 'Agentic workflows', 'Git'],
  },
];

export const experiences: Experience[] = [
  {
    title: 'Software Engineer',
    company: 'Avtal',
    period: 'April 2026 - Present',
    location: 'Austin, TX',
    description: [
      'Led and completed the migration of the customer payment portal to a modern stack (React, Hono, TypeScript), improving page load times by up to 27%',
      'Contributed to a custom content authoring system for SMS and email communications while migrating templates from the legacy platform'
    ],
    technologies: ['React', 'TypeScript', 'Hono', 'PostgreSQL']
  },
  {
    title: 'Application Engineer',
    company: 'Great American Insurance Group',
    period: 'April 2023 - April 2026',
    location: 'Remote',
    description: [
      'Led modernization of flagship commercial insurance quoting platform, migrating from legacy systems to React and Node.js/Express, resulting in 30% faster page load times and ~20% reduction in quoting errors reported by brokers',
      'Designed and launched a new multi-coverage insurance product from backend schema to frontend UI, contributing to a 12% increase in broker-submitted quotes in its first quarter',
      'Built robust data synchronization pipelines between modern web platform and legacy ERP systems using microservices architecture; resolved schema and nullability mismatches, reducing manual data correction needs by 80%',
      'Delivered technical presentations to 50+ engineers during company meetings on Redux architecture, agentic coding tools, and AI-assisted workflows',
      'Acted as point of contact for onboarding and mentorship, helping ramp up junior devs and collaborating on complex front-end/back-end challenges'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Redux', 'PostgreSQL', 'AWS', 'Microservices']
  },
  {
    title: 'Software Developer',
    company: 'PS Solutions',
    period: 'May 2022 - March 2023',
    location: 'Wilmington, NC',
    description: [
      'Built a PTO request and tracking system in Angular 14 and .NET Core, deployed via Azure',
      'Integrated RingCentral calling functionality into a client CRM using .NET MVC and JavaScript'
    ],
    technologies: ['Angular', 'TypeScript', '.NET Core', '.NET MVC', 'Azure', 'RingCentral API']
  },
  {
    title: 'IT Analyst',
    company: 'Clima Cube Self Storage',
    period: 'January 2021 - April 2022',
    location: 'Hampstead, NC',
    description: [
      'Developed a custom price tracking tool with React and Next.js using TypeScript that increased observability into competitor pricing allowing for frequent rate adjustment'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'CSS', 'AWS']
  }
];
