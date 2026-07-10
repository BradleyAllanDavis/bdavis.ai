# bdavis.ai

Personal site for Bradley Davis. Spare, technical, single column. Built with
[Astro](https://astro.build), deployed to Cloudflare Pages.

## Content rules (standing, for any agent editing copy)

Before drafting or editing any copy here, read `~/.dotfiles/docs/voice.md`
and the standing charters in the private dotfiles CLAUDE.md. Short version:
this site is a deliberate, minimal public projection — no personal-life
details (home, family specifics, daily life) and no infrastructure
inventory beyond what the existing copy already names. When in doubt, ask
Bradley before adding anything new; the current copy is the ceiling, not a
floor to build on.

`src/data/resume.yaml` is a synced copy of `~/.dotfiles/resume/content.yaml`
(`npm run sync-resume`) — fix content there, not here, or it gets clobbered.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static build -> dist/
npm run preview  # serve the built site
```

## Pages

- `/` — landing
- `/resume` — rendered at build time from `src/data/resume.yaml` + a PDF download
- `/projects` — sparse project list
- `/now` — what I am working on ([now page](https://nownownow.com))

## The resume page

The resume is generated from a single source of truth in the dotfiles repo:
`~/.dotfiles/resume/content.yaml` (the same store that renders the PDF). Cloudflare's
build cannot see `~/.dotfiles`, so a copy is vendored here at `src/data/resume.yaml`
and the PDF at `public/resume.pdf`. `src/lib/resume.ts` parses the YAML at build
time (js-yaml) and renders the `default` profile, so the page and the PDF stay in
lockstep.

After editing the resume, resync:

```bash
# in ~/.dotfiles
just resume
# in this repo
npm run sync-resume   # copies content.yaml + resume.pdf from ~/.dotfiles
git add -A && git commit -m "resume: resync from content store" && git push
```

Pushing triggers a Cloudflare Pages rebuild.

## The fleet-viz panel

The landing page's bordered panel (five dots on a line, under the lede) is a
Preact island (`src/components/FleetViz.tsx`, hydrated via `client:visible`,
so the rest of the page ships with zero JS). It shows the homelab's five
machines by **role only** -- no hostnames, IPs, or service topology; see
`~/.dotfiles/docs/philosophy.md`'s scarcity rule for why.

Data lives in `src/data/fleet.json` (the build-time fallback, rendered with
zero layout shift before hydration) and is duplicated at
`public/public-data/fleet.json` (what the island fetches once, client-side,
after mount). The two are identical today -- there's no live pipeline yet.
When one lands, point it at the `public/public-data/fleet.json` path and the
island already knows how to render whatever it returns; no component changes
needed.

`@astrojs/preact` is pinned to `4.1.3` (no caret) on purpose: newer releases
(5.x/6.x) depend on Vite 7/8, which conflicts with the Vite 6.4.x that Astro
5.18 bundles and breaks the build (`Could not resolve "astro:preact:opts"`).
4.1.3 is the last release whose own `vite` peer range (`^6.4.1`) actually
matches. Don't bump this without checking `npm ls vite` for a matching Vite
major first.

## Deploy

Cloudflare Pages **Direct Uploads** project (`bdavis-ai`) — NOT git-connected,
and Cloudflare forbids converting a Direct Uploads project to git-connected
(API error 8000069), so pushes do NOT auto-deploy. Deploy explicitly after
building:

```bash
npm run build
CLOUDFLARE_API_TOKEN=$(~/.dotfiles/tools/op-read-serialized "op://Automation/Cloudflare-Pages-API/credential") \
  npx -y wrangler pages deploy dist --project-name=bdavis-ai --branch=main
```

Verify at https://bdavis.ai after deploying. A push without a deploy leaves
the live site stale — this bit on 2026-07-10.
