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

## Deploy

Cloudflare Pages, connected to this GitHub repo. Build command `npm run build`,
output directory `dist`. Every push to `main` auto-deploys.
