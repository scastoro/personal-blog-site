---
title: 'Context Engineering in Claude Code with Custom Subagents'
description: 'How context engineering and Claude Code subagents work together to reduce context pollution, add guardrails, and scale AI-assisted development.'
pubDate: 2025-09-10
tags: ['Claude Code', 'Subagents', 'Context Engineering', 'AI tooling']
author: 'Sal Castoro'
draft: false
featured: false
twitterCard: 'summary_large_image'
---

# Context Engineering in Claude Code: Custom Subagents as Specialized Helpers

In Claude Code, the shift from prompt engineering toward context engineering + agent delegation becomes particularly meaningful via custom subagents. These subagents let you isolate responsibilities, reduce context pollution, and tailor tool access for each domain. This post zooms into how that works in the Claude Code world.

---

## A Very Brief Primer: Prompt → Context → Agents

I'll skim this: early work with LLMs centered on prompt engineering — trying different phrasings, few-shot examples, etc. But as soon as you hit real scale (multi-file repos, multiple concerns), prompt tweaks alone break down.

Enter context engineering: you start thinking about which information lives in the model's working memory, how it's retrieved, how system prompts are set, and how tools are exposed. In Claude Code, that manifests in `CLAUDE.md`, agent manifests, and subagent context windows.

Then, to scale beyond one monolithic assistant, you use custom subagents, each with its own context, system prompts, and tool permissions, that Claude delegates to when tasks match.

---

## What Are Claude Code Subagents?

According to the Claude Code docs, subagents are pre-configured AI personalities with:

- Their own context window, separate from the main conversation.
- A custom system prompt that defines their role, constraints, style, and domain.
- A bounded tool set (you can restrict what tools the subagent can use).

Because they run in isolated contexts, they help prevent context pollution — for example you don't want your React logic discussion bleeding into your database migration agent's reasoning.

You can both explicitly invoke a subagent (for example "Use the code-reviewer subagent on this diff") or allow Claude Code to automatically delegate tasks if they match a subagent's triggers.

Subagent definitions live as Markdown files:

```markdown
---
name: your-sub-agent-name
description: Description of when this subagent should be invoked
tools: tool1, tool2, tool3 # Optional - inherits all tools if omitted
model: sonnet # Optional - specify model alias or 'inherit'
---

Your subagent's system prompt goes here. This can be multiple paragraphs
and should clearly define the subagent's role, capabilities, and approach
to solving problems.

Include specific instructions, best practices, and any constraints
the subagent should follow.
```

---

## Why Subagents Help: The Context Engineering Benefits

### 1. Context Isolation

Each subagent has its own sandbox — its own memory or working context. That means your primary Claude thread stays focused on high-level orchestration, while domain-specific reasoning lives elsewhere.

### 2. Focused, Specialized Behavior

Because each subagent carries a role-specific system prompt and narrowed tool access, it behaves more predictably in its domain. For instance, a code-review subagent doesn't need tools with write access to analyze code and report back to the main agent.

### 3. Tool and Permission Control

You can restrict which tools a subagent is allowed to use (read-only versus write, etc.). That gives you guardrails and safer delegation.

### 4. Reusability and Shared Workflows

Once you've defined user-scoped subagents (in the `~/.claude/agents/` directory), they can be used across all projects. Since they are just markdown files, you can also copy over specific agents to your desired projects.

### 5. Cleaner Main Context

Because the subagents deal with details, your main Claude conversation doesn't get bloated. This is critical when dealing with large codebases where token budget and context drift are real risks.

---

## Sample Subagent Configs and Use Cases

Here are a few illustrative examples of Claude Code subagents (drawn from the Anthropic docs).

### Code Reviewer Agent

```markdown
---
name: code-reviewer
description: Expert code review specialist. Proactively reviews code for quality, security, and maintainability. Use immediately after writing or modifying code.
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a senior code reviewer ensuring high standards of code quality and security.

When invoked:

1. Run git diff to see recent changes
2. Focus on modified files
3. Begin review immediately

Review checklist:

- Code is simple and readable
- Functions and variables are well-named
- No duplicated code
- Proper error handling
- No exposed secrets or API keys
- Input validation implemented
- Good test coverage
- Performance considerations addressed

Provide feedback organized by priority:

- Critical issues (must fix)
- Warnings (should fix)
- Suggestions (consider improving)

Include specific examples of how to fix issues.
```

You might invoke it explicitly:

> Use code-reviewer on PR #42

Or let Claude auto-delegate when code changes are detected.

Here's another example:

### Debugger Agent

```markdown
---
name: debugger
description: Debugging specialist for errors, test failures, and unexpected behavior. Use proactively when encountering any issues.
tools: Read, Edit, Bash, Grep, Glob
---

You are an expert debugger specializing in root cause analysis.

When invoked:

1. Capture error message and stack trace
2. Identify reproduction steps
3. Isolate the failure location
4. Implement minimal fix
5. Verify solution works

Debugging process:

- Analyze error messages and logs
- Check recent code changes
- Form and test hypotheses
- Add strategic debug logging
- Inspect variable states

For each issue, provide:

- Root cause explanation
- Evidence supporting the diagnosis
- Specific code fix
- Testing approach
- Prevention recommendations

Focus on fixing the underlying issue, not just symptoms.
```

When your main Claude instance encounters any errors, test failures, or unexpected behavior, it can proactively delegate to the debugger agent for systematic troubleshooting.

---

## Best Practices and Lessons for Claude Code Subagents

When working with subagents in Claude Code, here are tips derived from Anthropic's best practices and community experiences:

- Keep subagents narrowly focused — a single domain or task. Avoid overlap.
- Start with Claude-generated definitions — use `/agents` to scaffold them, then refine.
- Limit tool permissions initially — give them only what they need (read-only at first) and expand later.
- Write clear system prompts — with precise responsibilities, constraints, and stylistic expectations.
- Version control agent definitions — store the Markdown manifest files in git so they evolve with your project.
- Chain or orchestrate carefully — if subagents call each other (for example code review → refactor agent → test agent), define clear handoff protocols to avoid context conflicts.
- Consider performance and latency trade-offs — subagents can feel slower than one big agent since context switching and delegation adds overhead.

---

## Putting It All Together: Context plus Subagents in Practice

Here's how this might play out in a real workflow:

1. User starts a task (for example "Implement feature X in the backend").
2. Claude Code loads contextual files (for example `CLAUDE.md`, relevant modules) and reasons at a high level.
3. Claude adds and/or modifies code to accomplish this task
4. Claude identifies a need to review code, so it delegates to `code-reviewer` subagent, passing only the diff.
5. `code-reviewer` uses the tools available to it to examine the code for quality, returns annotated feedback.
6. Claude sees a test failure, delegates that portion to `debugger` subagent.
7. `debugger` inspects logs and stack traces, proposes fixes.
8. Claude integrates suggestions, asks the user if they want to apply changes, or further refine.

Throughout this, each subagent hasn't polluted the main context — only minimal summaries or results bubble up.
