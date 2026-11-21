---
title: "spov: OpenCode in disposable Modal sandboxes"
slug: spov
status: published
date: '2026-11-21T22:46:00.000Z'
metaDescription: "spov is a small open-source launcher and job runner for headless OpenCode sessions in Modal sandboxes, with an optional self-hosted web UI."
metaTitle: "spov: OpenCode in disposable Modal sandboxes"
---

_spov (https://github.com/jimutt/spov) runs OpenCode in disposable Modal sandboxes. Also published on [dev.to](https://dev.to/jimutt/spov-opencode-in-disposable-modal-sandboxes-40ib)._

I wanted to run OpenCode in Modal sandboxes. Then I wanted better support for larger one-shot jobs. And then I wanted a web UI. It resulted in spov: at its core, a simple Modal sandbox for headless OpenCode sessions, with an optional job runner and web control pane.

[![Video introduction to spov: the launch view of spov fly, with a Watch the video button](/images/spov/video-poster.png)](https://spov.dev/#video)

I'm betting on open source to keep winning in the longer run when it comes to developer tooling, even in the agentic era. I love open and customizable OSS harnesses like Pi and OpenCode; the transparency and extensibility they bring is very much something I want from my local development tooling.

Anyway, what I also developed was a wish for an easy way to kick off agent sessions in sandboxed environments. And I've been using Modal's services for some side project experimentation and model training in the past, which made me aware both of their free tier with $30 of credits a month and of their pretty convenient APIs. All in all, it's an easy platform to integrate with. It's focused and opinionated, and seemingly pretty robust too.

So the choice landed on OpenCode + Modal. In its simplest form, you `cd` into a repo and run `spov fly`. You get the standard OpenCode TUI in your terminal, but the OpenCode server runs in a fresh Modal sandbox with only the repositories you chose. When you quit, the agent's commits and changes are synced back to your local checkout.

There are other projects operating in this area, with slightly different ambitions and scopes. Some examples:

- **[Open-Inspect](https://github.com/ColeMurray/background-agents)** is built on the same pieces (OpenCode on Modal), but as an organization-wide background agent in the spirit of Ramp's Inspect: you start sessions from its web UI, Slack, Linear or GitHub, and you get a branch or a pull request back.
- **[Netclode](https://github.com/angristan/netclode)** is a personal cloud agent you drive from an iOS/macOS app, with the sandboxes as microVMs on your own server (k3s, Kata Containers, Tailscale).
- **[OpenHands](https://github.com/OpenHands/OpenHands)** Agent Canvas can run OpenCode as one of many agents, through a headless bridge, so you follow it in Canvas rather than in OpenCode's own UI.

What I was looking for is a bit different: Something I can start from my terminal in the normal OpenCode TUI, when I prefer to, and get the work back on my branch. But I also need it to be capable of working in a more remote-first mode, pulling remotes and pushing back work as PRs to the remote. Another piece on the wish list was: **No real token or key inside the sandbox at all**. They stay in a proxy beside it, and the agent only sees placeholders (in all three above, the agent's environment holds real credentials). 

I wouldn't say it's impossible that I will open up for more plug-and-play sandbox providers in spov, even if I don't have any intentions of supporting anything other than Modal at the moment. But when it comes to agent harness support, it's very unlikely that spov will ever try to become a multi-harness environment. It started out as a very thin launcher and wrapper around OpenCode, and there's a strength in leaning into some of OpenCode's mechanisms rather than going fully generic.

## Git forge support

A lot of tooling in this space assumes your code lives on GitHub. Mine mostly does too, but I didn't want spov to lock in too hard to GitHub. So spov supports GitHub, Forgejo and Gitea (Codeberg, Codefloe or your own instance), and GitLab works as well. A sandbox can clone from and push to any of them, and a job can end in a pull request on whichever forge the repo lives on. Inside the sandbox, the agent gets the forge's own CLI (`gh`, `tea` or `glab`), but never the real token: that stays in the credential proxy, same as the model keys.

GitHub, Codefloe (Forgejo) and gitlab.com are tested end to end against real sandboxes, and Forgejo and Gitea also run in CI. If you're on a self-hosted forge and something doesn't work, do reach out! 

## No managed version (for now)

spov is a personal side project, free and open source under the MIT license, and there's no commercial angle to it. That also means there's no fully managed or hosted version at the moment. Local mode needs no setup at all though: the CLI starts its own small server. For jobs and the dashboard, you run `spov serve` with Postgres on your own infrastructure (there's a Compose file in the repo), and the dashboard signs in with GitHub.

If a hosted version is something you'd want, please reach out or [open a feature request on GitHub](https://github.com/jimutt/spov/issues). Knowing that there's interest is what would make me consider it.

I'm using it for some personal projects, but I'm open-sourcing it in case someone happens to have the exact same preferences and needs ;-)

- GitHub: [github.com/jimutt/spov](https://github.com/jimutt/spov)
- Website: [spov.dev](https://spov.dev)
- Docs: [github.com/jimutt/spov/tree/main/docs](https://github.com/jimutt/spov/tree/main/docs)
