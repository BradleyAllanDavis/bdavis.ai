# Graph Report - bdavis.io  (2026-07-18)

## Corpus Check
- 35 files · ~19,567 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 197 nodes · 178 edges · 41 communities (18 shown, 23 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `811d1457`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

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
- What You Must Do When Invoked
- /graphify
- graphify reference: extra exports and benchmark
- bdavis.ai
- graphify reference: query, path, explain
- sync-resume.mjs
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- CLAUDE.md
- extraction-spec.md
- bd Monogram Favicon
- Extra Export Formats
- Extraction Subagent Spec
- GitHub Clone and Cross-Repo Merge
- Commit Hook and CLAUDE.md Integration
- Query, Path and Explain Flows
- Whisper Video Transcription
- Incremental Update Flow
- graphify Build Pipeline
- graphify Honesty Rules
- graphify Skill Registration
- graphify Query-First Rule
- Cloudflare Pages Auto-Deploy
- Minimal Public Projection Content Rules
- Preact 4.1.3 Version Pin
- Resume Sync Pipeline

## God Nodes (most connected - your core abstractions)
1. `../../layouts/Base.astro` - 12 edges
2. `What You Must Do When Invoked` - 12 edges
3. `/graphify` - 10 edges
4. `graphify reference: extra exports and benchmark` - 8 edges
5. `bdavis.ai` - 7 edges
6. `Resume Content Store` - 6 edges
7. `scripts` - 5 edges
8. `graphify reference: query, path, explain` - 5 edges
9. `Bradley Allan Davis` - 5 edges
10. `../components/Icon.astro` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Rendered Resume PDF` --semantically_similar_to--> `Resume Content Store`  [INFERRED] [semantically similar]
  public/resume.pdf → src/data/resume.yaml
- `bd Monogram Favicon` --conceptually_related_to--> `bdavis.ai Personal Site`  [INFERRED]
  public/favicon.svg → README.md
- `Headshot 176px JPEG` --conceptually_related_to--> `Bradley Allan Davis`  [INFERRED]
  public/images/headshot-176.jpg → src/data/resume.yaml
- `Rendered Resume PDF` --references--> `Bradley Allan Davis`  [EXTRACTED]
  public/resume.pdf → src/data/resume.yaml
- `Self-Hosted Homelab Project` --conceptually_related_to--> `Fleet-Viz Panel`  [INFERRED]
  src/data/resume.yaml → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Resume Rendering Pipeline** — src_data_resume_content_store, src_lib_resume, src_pages_resume, public_resume_rendered_pdf, scripts_sync_resume [EXTRACTED 1.00]
- **graphify Skill Documentation** — _claude_skills_graphify_skill_graphify_pipeline, _claude_skills_graphify_references_extraction_spec_extraction_subagent_spec, _claude_skills_graphify_references_query_query_path_explain_flows, _claude_skills_graphify_references_update_incremental_update_flow, _claude_skills_graphify_references_hooks_commit_hook_integration, _claude_skills_graphify_references_exports_extra_export_formats, _claude_skills_graphify_references_github_and_merge_cross_repo_merge, _claude_skills_graphify_references_add_watch_add_url_and_watch_mode, _claude_skills_graphify_references_transcribe_whisper_transcription [EXTRACTED 1.00]

## Communities (41 total, 23 thin omitted)

### Community 0 - "Resume Rendering Library"
Cohesion: 0.14
Nodes (19): ../components/Icon.astro, accentKey(), Bullet, Content, data, Education, experience, md() (+11 more)

### Community 1 - "Resume Content & Career"
Cohesion: 0.14
Nodes (15): Headshot 176px JPEG, Headshot 176px WebP, Headshot 264px WebP, Headshot 88px WebP, Rendered Resume PDF, Fleet-Viz Panel, Bradley Allan Davis, Resume Content Store (+7 more)

### Community 2 - "Site Identity & Fleet Viz"
Cohesion: 0.25
Nodes (7): FALLBACK, FleetData, FleetViz(), isFleetData(), Machine, Status, ../components/FleetViz

### Community 3 - "Frontend Dependencies"
Cohesion: 0.13
Nodes (15): astro, @astrojs/preact, @fontsource-variable/ibm-plex-sans, @fontsource-variable/jetbrains-mono, @fontsource-variable/source-serif-4, js-yaml, dependencies, astro (+7 more)

### Community 4 - "Package Manifest & Scripts"
Cohesion: 0.15
Nodes (12): devDependencies, @types/js-yaml, name, private, scripts, build, dev, preview (+4 more)

### Community 6 - "Site Pages & Writing"
Cohesion: 0.18
Nodes (5): ../../public-data/stats.json, ../../layouts/Base.astro, nav, posts, ../styles/global.css

### Community 7 - "TypeScript Configuration"
Cohesion: 0.18
Nodes (10): **/*, astro/tsconfigs/strict, .astro/types.d.ts, dist, compilerOptions, jsx, jsxImportSource, exclude (+2 more)

### Community 11 - "What You Must Do When Invoked"
Cohesion: 0.13
Nodes (15): Part A - Structural extraction for code files, Part B - Semantic extraction (parallel subagents), Part C - Merge AST + semantic into final extraction, Step 0 - GitHub repos and multi-path merge (only if a URL or several paths), Step 1 - Ensure graphify is installed, Step 2.5 - Video and audio (only if video files detected), Step 2 - Detect files, Step 3 - Extract entities and relationships (+7 more)

### Community 12 - "/graphify"
Cohesion: 0.20
Nodes (9): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Usage (+1 more)

### Community 13 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 14 - "bdavis.ai"
Cohesion: 0.25
Nodes (7): bdavis.ai, Content rules (standing, for any agent editing copy), Deploy, Develop, Pages, The fleet-viz panel, The resume page

### Community 15 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 16 - "sync-resume.mjs"
Cohesion: 0.33
Nodes (5): destPdf, destYaml, src, srcPdf, yaml

### Community 17 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 18 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 19 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

## Knowledge Gaps
- **114 isolated node(s):** `name`, `type`, `version`, `private`, `dev` (+109 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `../../layouts/Base.astro` connect `Site Pages & Writing` to `Resume Rendering Library`, `Site Identity & Fleet Viz`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Frontend Dependencies` to `Package Manifest & Scripts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `What You Must Do When Invoked` connect `What You Must Do When Invoked` to `/graphify`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _114 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Resume Rendering Library` be split into smaller, more focused modules?**
  _Cohesion score 0.1422924901185771 - nodes in this community are weakly interconnected._
- **Should `Resume Content & Career` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._