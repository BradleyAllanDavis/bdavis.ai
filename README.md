# bdavis.ai

Personal site for Bradley Davis. Spare, technical, single column. Built with
[Astro](https://astro.build), deployed to Cloudflare Pages.

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

Cloudflare Pages, connected to this GitHub repo. Build command `npm run build`,
output directory `dist`. Every push to `main` auto-deploys.
