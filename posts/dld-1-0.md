---
title: "DLD Kit 1.0 is out"
slug: dld-kit-1-0
status: published
date: '2026-11-03T12:00:00.000Z'
metaDescription: "DLD Kit 1.0 is released. Bundled as an NPM package, review model configuration and stability fixes."
metaTitle: "DLD Kit 1.0 is out"
---

_DLD Kit 1.0 (https://github.com/jimutt/dld-kit) is released. Here's a summary of what changed since the 0.x versions, mainly the move to an npm package._

If you missed the [original post](/blog/2026/03/25/decision-linked-development), DLD (Decision-Linked Development) is a set of skills that make your coding agent record the decisions behind your code, and read them again before it changes anything. It has been about eight months since I started building it, it's now in use in a number of personal projects & repositories at my day job at Storytel. DLD takes a somewhat relaxed stance, in the sense that it doesn't try to reach for exhaustive specs, and it's comment based `@decision`-annotations tying entries from the decision log to code is its main distinguishing feature from other delta-oriented spec driven approaches.

Nowadays (November 2026) software factories & attempts to bridge more of the software development lifecycle in an agent-friendly way is on the tip of many peoples' tongues. DLD does not in it current shape offer anything in that area. It has however been injected and used for the code implementation parts of such pipelines, and I'm experimenting in a separate repository with optional DLD addon that adds pipeline-oriented features to DLD; some of it appears promising, but if integrated into core DLD they'll likely be oriented more towards solo projects and smaller OSS projects rather than enterprise settings. 

## From copied skills to an npm package

Before I started releasing DLD as 1.0 release candidates, you'd install DLD by copying a bunch of skills into your repo (or through Tessl), and each skill carried its own bash scripts. It worked and I like the simplicity, but it was a bit clumsy. Bash scripts that need to run on everything from Linux to Windows are not something I want to maintain, and the test suite was turning into something that was not of the most readable kind. 

Now DLD is distributed as npm package called `dld-kit`. In your repo, run:

```sh
npx dld-kit init
```

It asks which agent harnesses your team uses, writes the config, the skills and a short always-on rule, and you commit the result. Teammates don't have to install anything. To upgrade later it's `npx dld-kit@latest update`. If you rather don't want to have the DLD "binary" (not really the correct term for an .mjs file) checked in to the repo, you can gitignore it and use `npx dld update` to bring it in locally. 

The bash scripts are gone as well. The skills now call a small Node CLI that's bundled into them, so everything runs the same way on every platform. You need Node.js 22+ and git.

If you're coming from 0.x, your decision records, config and index carry over untouched. There's an [upgrade guide](https://github.com/jimutt/dld-kit/blob/main/docs/upgrading-from-0x.md) with the few manual steps.

## Other harnesses than Claude Code

DLD started out as a Claude Code thing, but `init` now supports Claude Code, Codex, Cursor, OpenCode, Pi and Antigravity. There's also a Claude Code plugin and plugins for Codex and Copilot CLI, and if you already manage your skills with `npx skills` or `gh skill` it works with those too. The always-on rule is now installed in the file each agent actually loads, instead of being tacked on to the end of `CLAUDE.md`.

## What else is new

- Decisions are drafts until they reach your main branch, in the sense that the agent will be less reluctant than earlier to adjust prose in non-accepted decisions as long as they haven't been integrated yet (in line with the general philosophy of DLD). `decision_edits` in the config decides how strict it is, and there's a command you can run in CI to enforce it.

- `/dld-snapshot` only generates `OVERVIEW.md` now, since the old `SNAPSHOT.md` turned out to be redundant. It was never well thought-through, and a number of end to end evaluations proved that it provided no measurable value for agents (contrary to `INDEX.md` and `OVERVIEW.md` which often improve agent decision recall & precision). You can still define your own generated documents in the config.

- `/dld-plan` can have a subagent review the decisions it wrote, and you can pick which model the reviewers run on. There's also a `dld.local.yaml` for settings that are just for you and shouldn't be committed. Subagent reviews for the `plan` step are disabled by default. Enable them by setting `plan_review: true`. 

A couple of smaller things. `/dld-audit` now notices most cases when a decision's text says it amends or supersedes another one but the link is missing from its metadata, and `/dld-reindex` commits the renames on top of your branch instead of squashing it, unless you ask for that.

From 1.0 on the versions follow semver, for everything a project builds on: the record format, annotations, config files, commands and the installed layout. So an update shouldn't break your setup unless the major version changes.

## Try it

```sh
npx dld-kit init
```

The [README](https://github.com/jimutt/dld-kit) has the rest. And please open an issue in the GitHub repo if something doesn't work, or if you'd like to see support for another agent.
