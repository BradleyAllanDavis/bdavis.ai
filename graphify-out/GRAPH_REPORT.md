# Graph Report - .  (2026-07-13)

## Corpus Check
- Corpus is ~19,150 words - fits in a single context window. You may not need a graph.

## Summary
- 125 nodes · 139 edges · 11 communities (10 shown, 1 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Resume Rendering Library
- Resume Content & Career
- Site Identity & Fleet Viz
- Frontend Dependencies
- Package Manifest & Scripts
- graphify Skill Docs
- Site Pages & Writing
- TypeScript Configuration
- YAML Module Typing

## God Nodes (most connected - your core abstractions)
1. `../../layouts/Base.astro` - 12 edges
2. `graphify Build Pipeline` - 11 edges
3. `Resume Content Store` - 7 edges
4. `scripts` - 5 edges
5. `Bradley Allan Davis` - 5 edges
6. `../components/Icon.astro` - 4 edges
7. `Themed` - 4 edges
8. `bdavis.ai Personal Site` - 4 edges
9. `Resume Sync Pipeline` - 4 edges
10. `Headshot 176px JPEG` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Rendered Resume PDF` --semantically_similar_to--> `Resume Content Store`  [INFERRED] [semantically similar]
  public/resume.pdf → src/data/resume.yaml
- `bd Monogram Favicon` --conceptually_related_to--> `bdavis.ai Personal Site`  [INFERRED]
  public/favicon.svg → README.md
- `Headshot 176px JPEG` --conceptually_related_to--> `Bradley Allan Davis`  [INFERRED]
  public/images/headshot-176.jpg → src/data/resume.yaml
- `Resume Sync Pipeline` --references--> `Rendered Resume PDF`  [EXTRACTED]
  README.md → public/resume.pdf
- `Rendered Resume PDF` --references--> `Bradley Allan Davis`  [EXTRACTED]
  public/resume.pdf → src/data/resume.yaml

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Resume Rendering Pipeline** — src_data_resume_content_store, src_lib_resume, src_pages_resume, public_resume_rendered_pdf, scripts_sync_resume [EXTRACTED 1.00]
- **graphify Skill Documentation** — _claude_skills_graphify_skill_graphify_pipeline, _claude_skills_graphify_references_extraction_spec_extraction_subagent_spec, _claude_skills_graphify_references_query_query_path_explain_flows, _claude_skills_graphify_references_update_incremental_update_flow, _claude_skills_graphify_references_hooks_commit_hook_integration, _claude_skills_graphify_references_exports_extra_export_formats, _claude_skills_graphify_references_github_and_merge_cross_repo_merge, _claude_skills_graphify_references_add_watch_add_url_and_watch_mode, _claude_skills_graphify_references_transcribe_whisper_transcription [EXTRACTED 1.00]

## Communities (11 total, 1 thin omitted)

### Community 0 - "Resume Rendering Library"
Cohesion: 0.14
Nodes (19): ../components/Icon.astro, accentKey(), Bullet, Content, data, Education, experience, md() (+11 more)

### Community 1 - "Resume Content & Career"
Cohesion: 0.11
Nodes (19): Headshot 176px JPEG, Headshot 176px WebP, Headshot 264px WebP, Headshot 88px WebP, Rendered Resume PDF, Resume Sync Pipeline, destPdf, destYaml (+11 more)

### Community 2 - "Site Identity & Fleet Viz"
Cohesion: 0.14
Nodes (14): bd Monogram Favicon, bdavis.ai Personal Site, Cloudflare Pages Auto-Deploy, Minimal Public Projection Content Rules, Fleet-Viz Panel, Preact 4.1.3 Version Pin, FALLBACK, FleetData (+6 more)

### Community 3 - "Frontend Dependencies"
Cohesion: 0.13
Nodes (15): astro, @astrojs/preact, @fontsource-variable/ibm-plex-sans, @fontsource-variable/jetbrains-mono, @fontsource-variable/source-serif-4, js-yaml, dependencies, astro (+7 more)

### Community 4 - "Package Manifest & Scripts"
Cohesion: 0.15
Nodes (12): devDependencies, @types/js-yaml, name, private, scripts, build, dev, preview (+4 more)

### Community 5 - "graphify Skill Docs"
Cohesion: 0.17
Nodes (12): Add URL and Watch Mode, Extra Export Formats, Extraction Subagent Spec, GitHub Clone and Cross-Repo Merge, Commit Hook and CLAUDE.md Integration, Query, Path and Explain Flows, Whisper Video Transcription, Incremental Update Flow (+4 more)

### Community 6 - "Site Pages & Writing"
Cohesion: 0.18
Nodes (5): ../../public-data/stats.json, ../../layouts/Base.astro, nav, posts, ../styles/global.css

### Community 7 - "TypeScript Configuration"
Cohesion: 0.18
Nodes (10): **/*, astro/tsconfigs/strict, .astro/types.d.ts, dist, compilerOptions, jsx, jsxImportSource, exclude (+2 more)

## Knowledge Gaps
- **61 isolated node(s):** `name`, `type`, `version`, `private`, `dev` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `../../layouts/Base.astro` connect `Site Pages & Writing` to `Resume Rendering Library`, `Site Identity & Fleet Viz`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `Resume Sync Pipeline` connect `Resume Content & Career` to `Resume Rendering Library`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `Resume Content Store` connect `Resume Content & Career` to `Site Identity & Fleet Viz`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Resume Rendering Library` be split into smaller, more focused modules?**
  _Cohesion score 0.1422924901185771 - nodes in this community are weakly interconnected._
- **Should `Resume Content & Career` be split into smaller, more focused modules?**
  _Cohesion score 0.11052631578947368 - nodes in this community are weakly interconnected._
- **Should `Site Identity & Fleet Viz` be split into smaller, more focused modules?**
  _Cohesion score 0.14166666666666666 - nodes in this community are weakly interconnected._