# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Personal Website Project

## Project Overview
Building a modern personal website using Astro as the static site generator. The site will serve as a professional presence and creative outlet, featuring a blog for sharing thoughts and expertise, along with personal information pages.

## Core Objectives
- **Performance First**: Leverage Astro's partial hydration for blazing-fast load times
- **SEO Optimized**: Ensure excellent search engine visibility for personal branding
- **Content-Focused**: Easy-to-maintain blog with MDX support for rich content
- **Accessible**: WCAG 2.1 AA compliant for inclusive user experience
- **Responsive**: Beautiful experience across all devices
- **Maintainable**: Clean architecture that's easy to update and extend

## Technical Stack
- **Framework**: Astro (latest version)
- **Styling**: Tailwind CSS for utility-first styling
- **Content**: MDX for blog posts with component embedding
- **Deployment**: Netlify/Vercel (to be determined)
- **Analytics**: Privacy-focused analytics (Plausible/Umami)
- **Version Control**: Git with conventional commits

## Site Architecture

### Pages Structure
```
/                   → Home page with hero, recent posts, brief bio
/about              → Detailed personal/professional information
/blog               → Blog index with pagination
/blog/[slug]        → Individual blog posts
/projects           → Portfolio/project showcase (future enhancement)
/contact            → Contact information and form
/uses               → Tech stack and tools (developer culture page)
```

### Content Structure
```
src/
├── content/
│   ├── blog/       → Blog posts in MDX
│   ├── authors/    → Author bio information
│   └── config.ts   → Content collections configuration
├── components/
│   ├── layout/     → Header, Footer, Navigation
│   ├── blog/       → PostCard, PostList, TagCloud
│   ├── ui/         → Reusable UI components
│   └── mdx/        → Custom MDX components
├── layouts/
│   ├── BaseLayout.astro
│   ├── BlogLayout.astro
│   └── PageLayout.astro
└── styles/
    └── global.css  → Global styles and Tailwind directives
```

## Development Workflows

### Feature Implementation Pipeline
When implementing new features, follow this parallel workflow:

**Phase 1 (Parallel - Planning):**
- ui-designer: Create visual designs and mockups
- design-system-architect: Define design tokens and component patterns
- seo-optimizer: Plan technical SEO structure and meta framework

**Phase 2 (Sequential - Implementation):**
- astro-developer: Build components and pages using design specs

**Phase 3 (Parallel - Enhancement & Quality):**
- accessibility-auditor: WCAG compliance checking and testing
- performance-validator: Performance audits and optimization
- documentation-writer: Create component and API documentation

**Phase 4 (Sequential - Testing):**
- e2e-tester: Run automated tests and cross-browser validation

**Phase 5 (Sequential - Final Review):**
- Final integration testing and deployment preparation


### Component Development Flow
When creating new components, follow this parallel workflow:

**Phase 1 (Parallel - Planning):**
- ui-designer: Create component design specifications
- design-system-architect: Define component patterns and tokens

**Phase 2 (Sequential - Implementation):**
- astro-developer: Implement component using design specifications

**Phase 3 (Parallel - Enhancement & Quality):**
- accessibility-auditor: Verify WCAG compliance and keyboard navigation
- performance-validator: Test component performance impact
- documentation-writer: Create component usage documentation

**Phase 4 (Sequential - Testing):**
- e2e-tester: Test component interactions and integration

## Quality Gates

### Must Pass Before Deployment
- ✅ Lighthouse score > 95 for all metrics
- ✅ No accessibility violations (axe-core)
- ✅ All images optimized and have alt text
- ✅ RSS feed validates
- ✅ Sitemap generates correctly
- ✅ No broken internal links
- ✅ Mobile responsive check passes
- ✅ All e2e tests pass across target browsers
- ✅ Visual regression tests show no unexpected changes
- ✅ Form submissions and user interactions work correctly

### Code Standards
- Components use TypeScript for type safety
- Follow Astro best practices for partial hydration
- CSS follows BEM or utility-first conventions
- Semantic HTML throughout
- Conventional commits for version control

## Design Decisions

### Styling Philosophy
- **Minimalist**: Clean, focused design that doesn't distract from content
- **Typography-First**: Excellent reading experience with proper hierarchy
- **Dark Mode**: System-aware with manual toggle
- **Micro-interactions**: Subtle animations that feel polished
- **Consistent Spacing**: Use Tailwind's spacing scale throughout

### Content Strategy
- **Blog Topics**: Web development, technology insights, personal projects
- **Posting Frequency**: Aim for 2-4 posts per month
- **Content Types**: Tutorials, thoughts, project breakdowns, book reviews
- **Writing Style**: Conversational yet informative, with code examples

### Performance Budget
- First Contentful Paint: < 1.2s
- Time to Interactive: < 2.5s
- Cumulative Layout Shift: < 0.1
- JavaScript Bundle: < 50KB for initial load

## Sub-Agent Coordination

### Agent Overview
Specialized agents are available for different aspects of development. Each agent has specific expertise and tool access optimized for their role. For detailed information about each agent's capabilities, responsibilities, and tool access, see the individual agent files in `.claude/agents/`:

- **astro-developer**: Astro components, pages, and integrations
- **ui-designer**: Component designs and user experience
- **design-system-architect**: Design systems and tokens
- **seo-optimizer**: SEO optimization and meta tags
- **performance-validator**: Performance audits and optimization
- **accessibility-auditor**: WCAG compliance and testing
- **documentation-writer**: Technical documentation
- **e2e-tester**: End-to-end testing with Playwright

### Parallel Execution Protocol

**CRITICAL: Always launch independent tasks in parallel using multiple Task calls in a single message.**

**Parallel Task Rules:**
1. **Multiple Task calls in ONE message** = True parallel execution
2. **Separate messages** = Serial execution (avoid unless dependencies exist)
3. **Default assumption**: Tasks are parallelizable unless proven otherwise

**Examples:**
```
✅ CORRECT - Parallel execution:
- Single message with multiple <invoke name="Task"> calls
- Independent agents working simultaneously

❌ INCORRECT - Serial execution:
- Separate messages for each Task call
- Waiting for completion before next task
```

**When to use Parallel vs Serial:**
- **Parallel**: Design + Development, Multiple pages, Testing phases
- **Serial**: Foundation → Components → Pages (clear dependencies)

### Agent Communication Protocol
Agents should announce their status with:
- `STATUS: [AGENT]_STARTED` - Beginning work
- `STATUS: [AGENT]_COMPLETE` - Work finished
- `NEEDS: [AGENT]` - Requires another agent's input
- `BLOCKED: [REASON]` - Cannot proceed

## Current Project State

### Completed
- [ ] Project setup and initialization
- [ ] Astro installation and configuration
- [ ] Tailwind CSS integration
- [ ] Basic layout components
- [ ] Blog post collection setup

### In Progress
- [ ] Home page design
- [ ] About page content
- [ ] First blog post

### Upcoming
- [ ] Contact form implementation
- [ ] RSS feed setup
- [ ] SEO optimization
- [ ] Deployment configuration
- [ ] Analytics integration

## Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Content
npm run new:post     # Create new blog post
npm run check:links  # Verify internal links
npm run optimize:images # Optimize image assets

# Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run test:a11y    # Accessibility tests
npm run lighthouse   # Performance audit

# Testing
npm run test:e2e     # Run end-to-end tests
npm run test:visual  # Run visual regression tests
npm run test:cross   # Run cross-browser tests
```

## Getting Started Checklist

When beginning a session:
1. Check current project state above
2. Review any pending tasks
3. Verify development environment is running
4. Consider which workflow applies to the task
5. Invoke appropriate sub-agents for the work

## Future Enhancements (v2)

- **Newsletter**: Email subscription with ConvertKit/Buttondown
- **Comments**: Privacy-focused commenting system
- **Search**: Full-text search with Pagefind
- **Projects Page**: Showcase of development work
- **Reading List**: Book reviews and recommendations
- **Now Page**: Current focus and activities
- **Internationalization**: Multi-language support
- **Web Mentions**: Social interactions integration

## Success Metrics

- Page load time under 2 seconds on 3G
- 100% accessibility score
- SEO score > 95
- Regular content publishing maintained
- Positive user feedback on design and usability
- Growing organic traffic month-over-month

---

*This document serves as the single source of truth for project decisions and workflows. Update it as the project evolves.*