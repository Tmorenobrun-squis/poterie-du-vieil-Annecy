# La Poterie du Vieil Annecy — Site vitrine

Site vitrine multi-pages pour **La Poterie du Vieil Annecy**, boutique de décoration et d'artisanat sous les arcades du vieil Annecy (15 rue Sainte-Claire, 74000 Annecy).

## Démarrage

```bash
npm install       # Installer les dépendances
npm run dev       # Serveur de développement → http://localhost:5173
npm run build     # Build production → dist/
npm run preview   # Prévisualiser le build
```

## Stack

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens custom via `@theme` dans `src/index.css`)
- **React Router v7** (vraies routes multi-pages, SPA)
- **Framer Motion** (reveals au scroll, transitions de pages, parallaxe, lightbox)
- Déploiement cible : **Vercel** (`vercel.json` inclus avec rewrite SPA)

## Pages

| Route | Page |
|---|---|
| `/` | Accueil — hero plein écran, atouts, aperçu univers, histoire, bandeau visite |
| `/boutique` | La boutique — présentation du lieu, photos intérieures, collectif |
| `/univers` | Nos univers — grille 6 univers avec descriptions |
| `/createurs` | Les créateurs — storytelling + grille 6 créateurs |
| `/galerie` | Galerie — grille masonry 10 photos + lightbox accessible |
| `/contact` | Nous trouver — coordonnées, horaires, carte Google Maps |

## Structure

```
src/
  pages/
    Accueil/index.tsx
    Boutique/index.tsx
    Univers/index.tsx
    Createurs/index.tsx
    Galerie/index.tsx
    Contact/index.tsx
  components/
    layout/
      Header.tsx        # Sticky, transparent sur le hero, sable opaque au scroll
      Footer.tsx        # 3 colonnes : marque, nav, infos pratiques
    ui/
      Edelweiss.tsx     # SVG edelweiss réutilisable (logo)
      SectionReveal.tsx # Wrapper fade+translateY au scroll (Framer Motion)
      BackToTop.tsx     # Bouton retour en haut (apparaît après 400px)
  index.css             # Tailwind v4 @theme + Google Fonts + reset + grain
  App.tsx               # BrowserRouter + Routes + AnimatePresence
  main.tsx
index.html              # SEO : title, meta, Open Graph, JSON-LD LocalBusiness/Store
vercel.json             # Rewrite SPA → index.html
```

## Design system

Tokens dans `src/index.css` via `@theme` (Tailwind v4) :

| Token | Hex | Usage |
|---|---|---|
| `--color-sable` | `#F3EDE3` | Fond principal |
| `--color-argile` | `#E7DACA` | Sections alternées, cards |
| `--color-terracotta` | `#C98B6E` | CTA, accents chauds (signature) |
| `--color-sauge` | `#A7B29A` | Touche nature, secondaire |
| `--color-bleu-orage` | `#8FA3AD` | Accent froid discret |
| `--color-pierre` | `#8A8076` | Texte secondaire |
| `--color-encre` | `#2E2A24` | Texte principal |

Polices : **Fraunces** (titres 700/900), **Mulish** (courant 400/600), **Caveat** (logo/annotations manuscrites).

## À personnaliser avant mise en ligne

### 1. Photos — priorité absolue

Tous les placeholders portent un commentaire `/* Photo finale : /public/images/... */`.
Fournir les photos en WebP (qualité 80, largeur 800–1200 px).

| Page | Fichier cible | Format |
|---|---|---|
| Accueil hero | `public/images/hero-devanture.webp` | Plein écran 1920×1080 |
| Boutique devanture | `public/images/boutique-devanture.webp` | 4:5 portrait |
| Boutique intérieur (×6) | `public/images/interieur-{1-6}.webp` | ratio libre |
| Univers (×6) | `public/images/univers-{slug}.webp` | 3:2 paysage |
| Créateurs (×6) | `public/images/createur-{slug}.webp` | carré 400×400 |
| Galerie (×10) | `public/images/galerie-{1-10}.webp` | ratios variés |

**Droits d'image** : vérifier les droits de chaque photo avant publication.

### 2. Informations à confirmer

- **Horaires exacts** : `src/pages/Contact/index.tsx` → tableau `HORAIRES`
- **Noms et photos des créateurs** : `src/pages/Createurs/index.tsx` → tableau `CREATEURS`
- **Handle Instagram** : `@la_poterie_du_vieil_annecy` (vérifier le handle réel)
- **Année d'ouverture** : à mentionner dans la section histoire (Boutique + Accueil)

### 3. Métadonnées / SEO

- URL réelle : remplacer `https://la-poterie-du-vieil-annecy.fr` dans `index.html`
- Image Open Graph : placer `/public/og-image.jpg` (1200×630 px)
- Favicon : remplacer `/public/favicon.svg`

### 4. Déploiement Vercel

```bash
# Via CLI
npx vercel deploy --prod

# Ou connecter le repo GitHub à Vercel :
# Build command : npm run build
# Output directory : dist
# (vercel.json gère le rewrite SPA)
```

## Accessibilité

- Contrastes AA — texte encre `#2E2A24` sur fond sable `#F3EDE3`
- Skip-link "Passer au contenu principal"
- Focus visible (`outline: 2px solid #C98B6E`)
- `aria-label` sur toutes les icônes et boutons icon-only
- `aria-modal` + `role="dialog"` + navigation clavier (←→ Escape) sur la lightbox
- `prefers-reduced-motion` respecté sur toutes les animations
- `loading="lazy"` sur toutes les images hors hero
- `lang="fr"` + JSON-LD `LocalBusiness`/`Store` dans `index.html`
