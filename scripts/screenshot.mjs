/**
 * Prend une capture pleine page du dev server (localhost:5173)
 * et la sauvegarde dans .claude/screenshots/latest.png
 *
 * Codes de sortie :
 *   0 — serveur injoignable ou pas de changements (pas de réveil)
 *   2 — capture prise, réveil du modèle (asyncRewake)
 */

import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCREENSHOT_DIR = path.join(ROOT, '.claude', 'screenshots');
const LATEST = path.join(SCREENSHOT_DIR, 'latest.png');
const URL = 'http://localhost:5173';

async function serverIsUp() {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 2500);
    const r = await fetch(URL, { signal: ctrl.signal });
    clearTimeout(t);
    return r.ok || r.status < 500;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await serverIsUp())) {
    // Serveur non démarré — sortie silencieuse, pas de réveil
    process.exit(0);
  }

  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 20000 });

    // Scroller lentement pour déclencher tous les useInView (Framer Motion)
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= height; y += 400) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(120);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    // Laisser les animations finir
    await page.waitForTimeout(800);
    await page.screenshot({ path: LATEST, fullPage: true });
  } finally {
    await browser.close();
  }

  // JSON pour le hook asyncRewake — injecte le contexte dans le prochain tour
  const msg = {
    hookSpecificOutput: {
      hookEventName: 'Stop',
      additionalContext: [
        `[CAPTURE DISPONIBLE] ${LATEST}`,
        '',
        "Lis cette image avec le Read tool et compare chaque section à la maquette originale.",
        "Identifie les écarts : layout, couleurs, typographie, espacements, formes (arches, coins arrondis).",
        "Si tu vois des problèmes, corrige-les directement dans les composants concernés.",
      ].join('\n'),
    },
  };

  process.stdout.write(JSON.stringify(msg));
  process.exit(2); // réveil asyncRewake
}

main().catch((err) => {
  process.stderr.write(`screenshot.mjs: ${err.message}\n`);
  process.exit(0); // erreur non bloquante
});
