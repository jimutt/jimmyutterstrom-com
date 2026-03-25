---
title: "Decision-Linked Development: Giving AI agents the context they need to modify your code"
slug: decision-linked-development
status: published
date: '2026-03-25T12:00:00.000Z'
metaDescription: "DLD is an open source framework that links code directly to the decisions behind it, so AI coding agents read the reasoning before modifying anything."
metaTitle: "Decision-Linked Development: Giving AI agents the context they need to modify your code"
---

_AI coding agents write code confidently, but they don't know why your code looks the way it does. DLD (https://github.com/jimutt/dld-kit) is an open source framework that links code directly to the decisions behind it, so agents read the reasoning before modifying anything. This post covers how I got there and what I've learned so far._

## Background

I've been coding since I was 11 or 12, and even though I have a bachelor's degree in embedded systems I'm self-taught in most areas. The main reason I got into this field is curiosity, a drive to understand how things work. That drive was complemented by a creative mind and a joy in building things.

While I find it interesting to understand the fundamentals of how a CPU is constructed at the hardware level, I've always found most joy in creating things that act, move or interact with their environment in other ways. Be it a standard backend service shuffling data between systems, moving pixels around on the screen, or building physical robots.

I suspect many engineers with a similar profile belong to the camp that follows the development of LLMs with both excitement and horror. Horror because we're not sure how the profession will shift, how our skills will be valued, whether we'll be able to adapt quickly enough. Excitement because maybe now is the time we'll actually realise a few more of those side project ideas. Even those of us, myself included, who have aged past 30 and found ourselves in a number of life contexts that consume much of our no longer endless spare time. I don't even have kids, but still find it extremely encouraging that I may now be able to build some of those projects I never thought would see the light of day.

The excitement of being able to realise more ideas is obviously present in professional contexts too, but it's more complex there. It's often combined with aggressive productivity gain targets tied to increased AI use. Many are facing worries that the added complexity from AI-driven development will be difficult to maintain over time with unchanged, or even leaner, staffing. There are many aspects that make the professional adoption of AI more complicated than the personal one, both practically and mentally. And then I'm not even mentioning any of the moral aspects.

## Searching for the right way to leverage the mechanical advantage

The core question I keep coming back to is: how do you best leverage the mechanical advantage of using AI to build complex systems faster while not **only** counting on further future improvements of the performance of the LLMs themselves to guarantee a process that works also in the longer term?

I've been spending the past year or so trying different approaches. In my day job at Storytel, an audiobook and ebook streaming service, I work as a staff engineer with AI adoption as part of my responsibilities, which means I both get to experiment personally and get a broader view of how different teams approach the problem. And I've tried a lot of things: from fairly unstructured "vibe coding" to more disciplined spec-driven development approaches.

The unstructured approach works surprisingly well for small, isolated tasks. And as new models are released it starts working for larger and larger chunks of code. Write a prompt, get code, review it, move on. But once your project grows beyond a certain complexity and the related business context is no longer as clearly mirrored by the code, things start falling apart. The AI doesn't remember why that retry logic has a specific timeout, or why that validation step exists despite looking redundant. And honestly, after a long enough break, or a sufficiently ambitious round of layoffs, neither does anyone else.

Spec-driven development (SDD) was the next thing I explored: write a specification first, then let the AI implement against it. Tools like GitHub's Spec Kit, OpenSpec and similar frameworks have emerged to support this workflow. And they often help in achieving few-prompt implementation with reasonable functional correctness. But I found some friction points. Specs tend to drift from the actual implementation over time. The bigger the project gets, the harder it becomes to keep them in sync. And there's a certain all-or-nothing quality to many SDD approaches: either you write the full spec upfront, or you're back to unstructured prompting. For someone that  often works in a hybrid mode, writing some things manually and having AI fill in other parts, that rigidity can feel like overhead rather than help. It can also be hard to combine with manual programming, where you want the flexibility to make implementation decisions as you go without first updating a spec document.

There's also a more fundamental issue that kept nagging me. Many SDD approaches encourage you to describe every edge case and behavior in the spec before implementation. But human language is inherently imprecise, and trying to exhaustively specify system behavior in prose is a bit like trying to describe a painting in enough detail that someone could reproduce it pixel by pixel. You can get close, but the closer you try to get, the more verbose and ambiguous it becomes. At some point the implementation *is* the spec, and any parallel description of it is just a lossy approximation that you now also need to maintain. It's a variation of the same problem we've seen with overly detailed UML diagrams, exhaustive requirements documents, and every other attempt to fully capture a system in a representation that isn't the system itself.

When it comes to ensuring correctness on a detailed level in software systems, my personal opinion is that it should be done through automated tests and not natural language specs. But you **can** of course try to combine the two by finding a good balance. Be it through Gherkin syntax and attempting to elevate the test cases so that they're accessible by more roles than only engineers, or by simply accepting that your tests are written on a level where general coding skills are still required for maintaining and validating their implementation.

## The idea behind DLD

These experiences eventually led me to think about what I actually needed: not a complete specification document, but a way to preserve the *reasoning* behind implementation choices in a format that both I and AI agents could use effectively.

The initial concept for what became Decision-Linked Development (DLD) was actually born from a two-hour car drive. I spent the drive talking through my frustrations and ideas into a voice recorder, then had an LLM help me turn that raw transcript into a structured concept paper. Which felt fitting, given that the whole point of DLD is about capturing knowledge before it evaporates.

The core idea borrows from event sourcing: instead of maintaining a mutable specification document that you have to keep up to date, you maintain an append-only log of decisions. Each decision captures what was decided, why, and which parts of the code it relates to. Decisions can be superseded by newer decisions, but they're never edited or deleted. The full history is preserved.

The key mechanism is the `@decision(DL-XXX)` annotation in code. When an AI agent encounters this annotation while modifying code, it has an explicit signal to look up the referenced decision before proceeding. This transforms "the agent should intuitively know to check for context" from a hope into a reliable trigger. And if the planned change conflicts with an existing decision, the agent tells you about it and suggests recording a new decision instead of silently breaking things.

The consolidated specification, if you want one, is generated from the decision log. It's a derived view, never manually maintained. Like a materialised view in a database: useful for reading, but not the source of truth.

## What it looks like in practice

The framework is used through a set of slash commands. A typical workflow for a new feature looks something like this:

1. `/dld-plan` breaks down the feature into a set of decisions interactively. You describe what you're building, and the agent helps you slice it into reasonably scoped decisions.
2. `/dld-implement DL-001` takes a proposed decision and implements it: writes the code, adds `@decision` annotations, and marks the decision as accepted.
3. `/dld-snapshot` regenerates the overview documentation from the decision log.

For smaller, isolated changes like a bugfix or a single design choice, `/dld-decide` records one decision directly without the planning step.

[![Diagram showing the core workflow described above](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v7uxwc79xn09wwlm5yrv.png)](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v7uxwc79xn09wwlm5yrv.png)

A decision record is a markdown file with YAML frontmatter. Here's a real one from my bird recording project:

```markdown
---
id: DL-045
title: "Species/hour activity matrix on dashboard"
status: accepted
namespace: web
tags: [web-dashboard]
references:
  - path: apps/web/src/components/ActivityMatrix.svelte
  - path: apps/web/src/components/Dashboard.svelte
---

## Context
The dashboard is the landing page. BirdNET-Go has a species/hour
activity matrix that shows detection counts per species per hour —
a compact way to see what's been active and when. This is the primary
visualization for the Gillerkvitter dashboard.

## Decision
Build a species/hour activity matrix as the main dashboard component:
- Rows: Species (sorted by total detections or recency)
- Columns: Hours of the day
- Cells: Detection count, with color intensity reflecting volume
- Default view: 24-hour period, scrolled to show the current 2-3 hours
- Live update: Matrix refreshes via API polling (per DL-040)

## Rationale
The hour-by-species matrix gives an immediate overview of activity
patterns — which species are present and when they're most active.

## Consequences
- Needs a backend query that returns detections grouped by species
  and hour
- Color intensity scale needs careful design to work with the nature
  palette (DL-044)
- Initial scroll position should auto-focus on the current time
```

Notice how it references other decisions inline (DL-040 for the polling approach, DL-044 for the color palette). That cross-referencing happens naturally as decisions accumulate, and it's one of the things that helps the AI agent understand how different parts of the system relate.

And the corresponding code annotation is just a comment:

```typescript
// @decision(DL-008)
function retryWithBackoff(fn: () => Promise<Response>): Promise<Response> {
  // ...
}
```

When an AI agent encounters that annotation, it reads DL-008 before touching the function. If the change it's about to make conflicts with the decision, it stops and tells you.

The framework also includes `/dld-audit` for detecting drift between decisions and code, and a `/dld-retrofit` command for bootstrapping decisions from an existing codebase. You don't need to start from scratch.

## What makes it practical for hybrid workflows

One thing I specifically wanted was for this to work in a casual, incremental way. A single decision log means you don't need to spend your thinking effort on deciding what belongs in a user story vs. a detailed implementation plan, whether you need to merge two specs because the feature scope changed, or how to handle a change that partially supersedes an earlier decision. You just record decisions as they come up, at whatever level of abstraction is natural for that particular choice. Some decisions are high-level product choices, others are low-level implementation details driven by infrastructure constraints. They all live in the same flat, sequential log.

You also don't need to use it for everything. It's perfectly fine to use DLD for the parts of your codebase where non-obvious decisions accumulate, and not bother annotating straightforward, idiomatic code that speaks for itself.

There's also a passive mode for teams that want living documentation without changing how they work day to day. You run the initial bootstrap once to generate decisions from the existing codebase, then schedule the audit and snapshot commands to run automatically via CI. The audit detects unreferenced code changes, infers new decisions, and back-annotates the code. No one needs to invoke any DLD commands during their normal workflow.

## Testing it in practice

I've been using DLD on my personal side project, Gillerkvitter, an off-grid bird song recording station running on a solar-powered Raspberry Pi in northern Sweden. It records bird songs, runs them through BirdNET for species identification, and syncs the detections to a cloud server with a web dashboard. The system spans hardware, embedded software, a Bun.js backend API, PostgreSQL, and an Astro/Svelte frontend. Quite a few moving parts.

[![System overview diagram of the main Gillerkvitter components](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/scmotiplxl1e27wipwso.png)](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/scmotiplxl1e27wipwso.png)

The project now has 99 accepted decisions in its log, and so far it's been a really encouraging test case for the framework. The added documentation has really helped both me and the coding agents to easily pick up from a previous session and not lose track of how things are connected. It's the kind of broad, multi-domain project where you can go weeks without touching a particular subsystem, and when you come back, the decision log tells you exactly why things look the way they do.

We're also trying it at Storytel in a team setting, with promising early results. One thing that's been interesting is how reviewing the proposed decisions before implementation can shift verification earlier in the process. You catch misunderstandings at the decision level rather than in code review, which sometimes makes it more comfortable to accept larger implementation PRs. You've already agreed on the approach; the PR is "just" the execution. And nobody had to get a master's degree in PRD writing to get there, since each decision is a small, focused artifact rather than a chapter in an ever-growing requirements novel.

## Being honest about what this is

I want to be upfront: DLD in its current form is a collection of Claude Code skills. In practice that means markdown-based prompts that instruct the AI agent, backed by some Bash scripts for file management and validation. I'm neither ashamed of that, nor do I want to inflate what it is. The skills follow the [Agent Skills](https://agentskills.io) open standard and work with Claude Code today, and through the [Tessl](https://tessl.io/) "package manager" with other AI coding tools as well.

What matters to me is not the sophistication of the implementation, but whether the underlying idea holds up. And so far, based on my own experience and the early team usage at Storytel, it seems at least as promising as other approaches. The decision log is a simple concept, the annotations are just code comments, and the projections are generated markdown files. But combined, they solve a real problem: keeping decision context accessible when AI agents (and humans returning after a break) modify code they didn't write.

## Try it out

If this resonates with your experience of AI-assisted development, you might find DLD useful. The project is open source at [github.com/jimutt/dld-kit](https://github.com/jimutt/dld-kit) and still pre-v1, so expect rough edges and potentially breaking changes to the process. If you've ever come back to a project after a month and wondered "why on earth did I do it this way?", or if you've watched an AI agent cheerfully refactor away a workaround that existed for a very good reason, you know the problem DLD is trying to solve.

I started this post talking about curiosity and the joy of building things. DLD came from the same place: a genuine attempt to figure out how to keep building effectively as the tools change around us. It's not the final answer, but it's a practical step that's working for me so far, right here, right now. I'd love to hear if it works for you too.
