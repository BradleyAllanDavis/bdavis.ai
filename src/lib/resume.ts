// Build-time loader for the resume page. Parses the vendored resume.yaml (a copy
// of ~/.dotfiles/resume/content.yaml, kept in sync via `npm run sync-resume`) and
// exposes the `default` profile's content: all non-archived roles, all bullets,
// all non-draft projects. This mirrors the section order of the generated PDF so
// the page and the PDF can never drift.
import yaml from 'js-yaml';
// Inlined at build time by Vite, so it works in both dev and the bundled SSG
// output (no runtime filesystem lookup).
import raw from '../data/resume.yaml?raw';

type Themed = { themes?: string[]; strength?: number };
interface Bullet extends Themed { id?: string; text: string }
interface Role { company: string; url?: string; title: string; dates: string; location?: string; archive?: boolean; bullets: Bullet[] }
interface Project extends Themed { id?: string; name: string; text: string; draft?: boolean }
interface SkillGroup extends Themed { name: string; pinned?: boolean; tags: string[] }
interface Education { school: string; url?: string; degree: string; dates: string; location?: string; coursework?: string }

interface Content {
  basics: { name: string; email: string; phone: string; website: string; linkedin: string; github: string; location: string };
  taglines: Record<string, string>;
  summary_fragments: Bullet[];
  ai_engineering?: { capabilities: string[] };
  experience: Role[];
  projects: Project[];
  skill_groups: SkillGroup[];
  education: Education[];
  beyond_keyboard: string;
}

const data = yaml.load(raw) as Content;

// `**bold**` -> <strong>, mirroring render.py's markup. Escape HTML first so the
// source stays the single point of authoring.
export function md(s: string): string {
  const esc = s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return esc.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

// Theme -> CSS accent-var key, mirroring the fixed map in global.css
// (--accent-ai-native etc.). Keep in sync with the closed theme vocabulary
// documented at the top of resume.yaml.
const THEME_ACCENT: Record<string, string> = {
  'ai-native': 'ai-native',
  backend: 'backend',
  'distributed-systems': 'distributed-systems',
  infra: 'infra',
  leadership: 'leadership',
  payments: 'payments',
  devex: 'devex',
};

// A role's "dominant" theme: sum each bullet's strength into every theme it
// carries, take the highest total. Ties break on whichever theme appears
// earliest in bullet order (first bullet, then first-listed theme within
// that bullet) -- deterministic, and it favors the theme the role leads
// with rather than an alphabetical accident.
function dominantTheme(bullets: Bullet[]): string | undefined {
  const weight = new Map<string, number>();
  const firstSeen = new Map<string, number>();
  let order = 0;
  for (const b of bullets) {
    for (const t of b.themes ?? []) {
      weight.set(t, (weight.get(t) ?? 0) + (b.strength ?? 0));
      if (!firstSeen.has(t)) firstSeen.set(t, order);
      order++;
    }
  }
  let best: string | undefined;
  for (const [theme, w] of weight) {
    if (
      best === undefined ||
      w > weight.get(best)! ||
      (w === weight.get(best)! && firstSeen.get(theme)! < firstSeen.get(best)!)
    ) {
      best = theme;
    }
  }
  return best;
}

export function accentKey(themes: string[] | undefined): string | undefined {
  const primary = themes?.[0];
  return primary ? THEME_ACCENT[primary] : undefined;
}

export const basics = data.basics;
export const tagline = data.taglines.default;
// All summary fragments, in authored order (web isn't one-page constrained).
export const summary = data.summary_fragments;
export const aiCapabilities = data.ai_engineering?.capabilities ?? [];
export const experience = data.experience
  .filter((r) => !r.archive)
  .map((r) => ({ ...r, accentKey: THEME_ACCENT[dominantTheme(r.bullets) ?? ''] as string | undefined }));
// Skip drafts, exactly like render.py — bdavis.ai hides itself until it's live.
export const projects = data.projects.filter((p) => !p.draft);
export const skillGroups = (() => {
  const pinned = data.skill_groups.filter((g) => g.pinned);
  const rest = data.skill_groups.filter((g) => !g.pinned);
  return [...pinned, ...rest];
})();
export const education = data.education;
export const beyondKeyboard = data.beyond_keyboard;
