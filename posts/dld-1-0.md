---
title: "DLD Kit 1.0 is out"
slug: dld-kit-1-0
status: published
date: '2026-11-03T12:00:00.000Z'
metaDescription: "DLD Kit 1.0 is released. It's now an npm package, installs with a single command and supports most of the common coding agents."
metaTitle: "DLD Kit 1.0 is out"
---

_DLD Kit 1.0 (https://github.com/jimutt/dld-kit) is released. This post is a short summary of what changed since the 0.x versions, mainly the move to an npm package._

If you missed the [original post](/blog/2026/03/25/decision-linked-development), DLD (Decision-Linked Development) is a set of skills that make your coding agent record the decisions behind your code, and read them again before it changes anything. It has been about eight months since I started building it, and I've been using it on its own repo the whole time. There are 91 decision records in there now, so I'd say it has had a decent amount of testing.

## From copied skills to an npm package

Before 1.0 you installed DLD by copying a bunch of skills into your repo (or through Tessl), and each skill carried its own bash scripts. It worked, but it was a bit clumsy, and bash scripts that need to run on everything from Linux to Windows is not something I want to maintain. Updating was also mostly a matter of remembering to do it.

Now it's an npm package called `dld-kit`. In your repo, run:

```sh
npx dld-kit init
```

It asks which agents your team uses, writes the config, the skills and a short always-on rule, and you commit the result. Teammates don't have to install anything. To upgrade later it's `npx dld-kit@latest update`.

The bash scripts are gone as well. The skills now call a small Node CLI that's bundled into them, so everything runs the same way on every platform. The only requirements are Node.js 22+ and git.

If you're coming from 0.x, your decision records, config and index carry over untouched. There's an [upgrade guide](https://github.com/jimutt/dld-kit/blob/main/docs/upgrading-from-0x.md) with the few manual steps.

## Other agents than Claude Code

DLD started out as a Claude Code thing, but `init` now supports Claude Code, Codex, Cursor, OpenCode, Pi and Antigravity. There's also a Claude Code plugin, Codex and Copilot CLI plugins, and it works with `npx skills` and `gh skill` if you already manage your skills that way. The always-on rule is now installed in the file each agent actually loads, instead of being tacked on to the end of `CLAUDE.md`.

## What else is new

- **Decisions are drafts until they reach your main branch.** After that the text is protected, and the agent has to record an amendment or a superseding decision instead of quietly rewriting history. `decision_edits` in the config decides how strict it is, and there's a command you can run in CI to enforce it.
- **`/dld-snapshot` only generates `OVERVIEW.md` now.** The old `SNAPSHOT.md` turned out to be redundant. You can still define your own generated documents in the config.
- **Configurable reviews.** `/dld-plan` can have a subagent review the decisions it wrote, and you can pick which model the reviewers run on. There's also a `dld.local.yaml` for settings that are just for you and shouldn't be committed.
- **Smarter audits.** `/dld-audit` now notices when a decision's text says it amends or supersedes another one, but the link is missing from its metadata.
- **Fewer rough edges in `/dld-reindex`.** It commits the renames on top of your branch instead of squashing it, unless you ask for that.

From 1.0 on the versions follow semver, for everything a project builds on: the record format, annotations, config files, commands and the installed layout. So an update shouldn't break your setup unless the major version changes.

## Try it

```sh
npx dld-kit init
```

The [README](https://github.com/jimutt/dld-kit) has the rest. Please open an issue in the GitHub repo if something doesn't work, or if you'd like to see support for another agent.
