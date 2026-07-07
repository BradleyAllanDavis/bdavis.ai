#!/usr/bin/env node
// Copy the canonical resume content store from the dotfiles repo into this repo so
// the Cloudflare build (which cannot see ~/.dotfiles) renders the same data as the
// PDF. Run after editing the resume: `just resume` in dotfiles, then
// `npm run sync-resume` here, then commit + push.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const src = path.join(os.homedir(), '.dotfiles', 'resume', 'content.yaml');
const destYaml = path.resolve('src/data/resume.yaml');
const srcPdf = path.join(os.homedir(), '.dotfiles', 'resume', 'resume.pdf');
const destPdf = path.resolve('public/resume.pdf');

if (!fs.existsSync(src)) {
  console.error(`sync-resume: source not found: ${src}`);
  console.error('Run this on a machine with ~/.dotfiles checked out.');
  process.exit(1);
}

fs.mkdirSync(path.dirname(destYaml), { recursive: true });
const yaml = fs.readFileSync(src, 'utf8').replace(/^\s*phone:.*\n/m, '');
fs.writeFileSync(destYaml, yaml);
console.log(`synced ${src} -> ${destYaml} (phone stripped)`);

if (fs.existsSync(srcPdf)) {
  fs.mkdirSync(path.dirname(destPdf), { recursive: true });
  fs.copyFileSync(srcPdf, destPdf);
  console.log(`synced ${srcPdf} -> ${destPdf}`);
} else {
  console.warn(`sync-resume: ${srcPdf} missing; run \`just resume\` in dotfiles first.`);
}
