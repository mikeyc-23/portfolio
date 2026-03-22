# Portfolio Website — Design Spec
**Date:** 2026-03-15
**Author:** Michael Corrado (with Claude)
**Status:** Approved for implementation

---

## Overview

A personal portfolio website for Michael Corrado, BrainStation Software Engineering graduate (2025). The site is a React SPA with two distinct visual modes — a terminal/console mode and a clean editorial mode — plus a split-screen entry page that lets visitors self-select which experience they want.

The portfolio exists to serve two audiences simultaneously without compromising either: recruiters who need to quickly assess Michael's skills and experience, and developers/technical people who will appreciate the craft and personality behind the terminal aesthetic.

Reference mock: `portfolio/mock.html` (open directly in browser, no server needed)

---

## Entry Screen

The first thing every visitor sees is a full-screen vertical split. This is validated in the mock (`EntryScreen` section).

**Left half — Developer:**
- Background: `#0a0a08`
- Large monospace "DEVELOPER" text, phosphor green (`#b8ff6e`)
- Subtle ASCII texture / scanline overlay
- On hover: left half expands to ~55% width, right contracts to ~45%. Green glow intensifies.

**Right half — Recruiter:**
- Background: `#f5f0e8` (warm cream)
- Large serif "RECRUITER" text in dark olive (`#3a4a1e`)
- Vibrant green (`#16a34a`) accent line or underline
- On hover: right half expands to 55%, left contracts to 45%.

**Interaction:**
- Clicking either half navigates to that mode (terminal or light)
- Analytics counter stub: `fetch('/api/visit/:type')` is called on click but wrapped in a `try/catch` — if the backend is not available the navigation still proceeds
- A small "not sure? explore on your own →" text link centered at the very bottom defaults to terminal mode (the more interesting first impression for anyone curious enough to read fine print)

**Mobile:** On screens under 768px, the entry screen stacks vertically (RECRUITER on top, DEVELOPER below, each 50vh). Same click behavior.

---

## Dark Mode — Terminal SPA

### Visual Language
- Background: `#0a0a08`
- Primary text / accent: `#b8ff6e` (phosphor green)
- Dim text: `#3a5a20`
- Secondary text: `#8ac860`
- Font: `'Courier New', Courier, monospace`
- Scanline overlay: `repeating-linear-gradient` at ~5% opacity, fixed, across entire page

### Chrome
- macOS-style traffic light dots (red/yellow/green) + centered window title
- Tab navigation below: `SUMMARY | ABOUT | PROJECTS | SKILLS | CONTACT | MORE+`
- Active tab highlighted when its section is in view — uses `IntersectionObserver` with `root` set to the `.terminal-scroll` container (not `document`)
- Bottom status bar: `● ONLINE · UTF-8 · MAIN · TORONTO` + `[ BUILD LIGHT MODE ]` button (right-aligned)

### Hero Section
Two-column layout (50/50), separated by a 1px `#1a2a0e` border.

**Left column:**
- ASCII block-letter name ("MICHAEL / CORRADO") at `0.65rem` monospace — decorative, not the primary name legibility carrier
- Identity key-value block: `ROLE`, `GRAD`, `LOCATION`, `STATUS` (open to work), `GITHUB`
- Fake terminal command sequence: `cat about.txt` → output lines → blinking cursor

**Right column:**
- Background: `#060806`
- Full ASCII art portrait rendered as a `<pre>` element, colored `#7ab848`, `font-size: 0.3rem`
- Scanline overlay (`::after` pseudo-element) on top of portrait

### Scrollable Sections
The scrollable area is a `div` with `overflow-y: auto` and a fixed height (`calc(100vh - chrome height)`). `IntersectionObserver` must use this div as the `root` option.

Each section fades and slides up (`opacity: 0 → 1`, `translateY(18px → 0)`) when it enters the scroll container's viewport:

1. **ABOUT** — Bio paragraph, header `// 01 — ABOUT`
2. **PROJECTS** — Card grid. Each card: number, `▸ NAME`, stack, description, `→ View project` / `→ View on GitHub` link. If a project has no `liveUrl`, the link reads `→ View on GitHub` and points to `githubUrl`.
3. **SKILLS** — Tag grid
4. **CONTACT** — 2×2 grid: Email, LinkedIn, GitHub, Location. Include a `↓ Download Resume` link here as a fifth item spanning full width.

### "Build Light Mode" Transition
1. Terminal mode fades out (400ms)
2. Build screen appears: terminal-style fake compile log + animated progress bar
3. Log lines appear sequentially (~300ms gaps). Includes `⚠ ASCII portrait replaced with actual face`
4. ~3.5s total, then light mode fades in
5. **Reverse transition ("⌨ Terminal" button):** Light mode fades out → terminal mode fades back in. Scroll position in terminal resets to top. Build log is cleared. No build animation plays in reverse — it's an instant crossfade.

---

## Light Mode — Editorial SPA

### Visual Language
- Background: `#f5f0e8` (warm cream)
- Primary headings: `#3a4a1e` (deep olive)
- Accent / CTA: `#16a34a` (vibrant green)
- Body text: `#5a5840`
- Muted / label text: `#7a8a4a`
- Card backgrounds: `#ede8dc`
- Borders: `#d0c8b0`
- Font: `Georgia, serif` for headings; `system-ui, -apple-system, sans-serif` for body
- Botanical ASCII decorations as subtle background accents (see below)

### Nav
- Logo: `MC.` in Georgia serif, dark olive
- Links (smooth scroll, mixed case): Work · Skills · Contact
- `↓ Resume` download link
- `⌨ Terminal` button (dark olive fill, cream text) — returns to dark mode via instant crossfade

### Hero Section
Two-column layout (50/50), separated by a 2px `#3a4a1e` border.

**Left column:**
- Eyebrow: role / location / year in small caps
- Name: `MICHAEL` / `CORRADO` (Georgia, bold, large). "CORRADO" in `#16a34a`
- Bio paragraph
- Tech skill chips (bordered, fill on hover)
- Decorative ASCII tree ghosted in background at ~10% opacity

**Right column:**
- Solid `#16a34a` background
- Real photo of Michael (full-bleed, `object-fit: cover`)
- Halftone dot overlay (`radial-gradient` pattern, 20% opacity)
- Name/title tag in bottom-left corner (cream background, olive text)
- *Note: light mode intentionally has no standalone About section. The bio in the hero serves this purpose.*

### Scrollable Sections
Same `IntersectionObserver` pattern as dark mode, with `root` set to `.light-scroll` container:

1. **Selected Work** — Project cards. Olive bottom border, serif name, hover lift + shadow. `liveUrl` renders as "View project →", absent `liveUrl` renders as "View on GitHub →".
2. **Skills** — Pill tags, hover fills dark olive
3. **Get In Touch** — Contact grid with left green border accent. Includes `↓ Download Resume` link.
4. **Footer** — Dark olive bg, `MC.` logo, tagline, `Built with React`

### Botanical Decorations
ASCII art trees/plants used as decorative elements only — not interactive, `user-select: none`, `pointer-events: none`:
- Large ghosted tree in hero left-column background (~10% opacity)
- Repeating plant divider between sections: `* \|/ ^^^` row pattern in muted olive
- One small plant/tree silhouette per section as a right-column accent at low opacity

---

## Styling Approach

**SCSS with BEM-inspired naming.** No CSS Modules, no Styled Components. Install with `npm install -D sass` — Vite supports it natively, no extra config.

**File structure:**
```
src/styles/
├── _variables.scss   — all design tokens (colors, fonts, breakpoints)
├── _mixins.scss      — scanline overlay, scroll-reveal, shared patterns
├── _entry.scss       — entry screen styles  (e- prefix)
├── _terminal.scss    — terminal mode styles (t- prefix)
├── _light.scss       — light mode styles    (l- prefix)
├── _build.scss       — build transition     (b- prefix)
└── main.scss         — imports all partials
```

**Design tokens (core variables):**
```scss
// Dark mode
$bg-dark:        #0a0a08;
$green-primary:  #b8ff6e;
$green-dim:      #3a5a20;
$green-mid:      #8ac860;

// Light mode
$bg-light:       #f5f0e8;
$olive-dark:     #3a4a1e;
$green-accent:   #16a34a;
$text-body:      #5a5840;
$card-bg:        #ede8dc;

// Shared
$font-mono:      'Courier New', Courier, monospace;
$font-serif:     Georgia, serif;
$font-sans:      system-ui, -apple-system, sans-serif;
```

**Naming convention** (carried over from reference mock):
- Terminal mode: `t-` prefix (e.g. `t-hero`, `t-tabs`)
- Light mode: `l-` prefix (e.g. `l-hero`, `l-nav`)
- Entry screen: `e-` prefix
- Build transition: `b-` prefix

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Frontend | React (Vite) | Fast dev server, modern tooling, SPA |
| Styling | Plain CSS (global + per-component files) | Convention already set in mock |
| Animations | CSS transitions + `IntersectionObserver` | No library needed |
| Backend | Node.js + Express | Simple, analytics stub |
| Database | JSON file on server (v1) | Zero config counter |
| Hosting | Railway | FE + BE on one service. Express serves Vite's `/dist` output in production. |
| Domain | Namecheap / Cloudflare (~$15/yr) | Custom domain required |

---

## Component Architecture

```
App
├── EntryScreen              — full-screen split DEVELOPER / RECRUITER
├── BuildTransition          — fake compile log + progress bar
├── TerminalMode
│   ├── TerminalChrome       — traffic lights + title
│   ├── TerminalTabs         — tab nav, scroll-aware active state
│   ├── TerminalHero         — ASCII name + ASCII portrait <pre>
│   ├── TerminalSection      — scroll-reveal wrapper
│   │   ├── TerminalAbout
│   │   ├── TerminalProjects
│   │   ├── TerminalSkills
│   │   └── TerminalContact
│   └── TerminalStatusBar    — status items + build button
└── LightMode
    ├── LightNav             — logo + links + resume + terminal button
    ├── LightHero            — editorial name + photo panel
    ├── LightSection         — scroll-reveal wrapper
    │   ├── LightProjects    — (no standalone About — bio lives in hero)
    │   ├── LightSkills
    │   └── LightContact
    └── LightFooter
```

---

## Data / Content

All content lives in `src/data/content.js`. No CMS. To update a project description or add a skill, edit this one file.

```js
// Shape of a project entry
{
  id: 'instock',
  name: 'InStock',
  stack: ['React', 'Node.js', 'Express', 'MySQL'],
  description: '...',
  githubUrl: 'https://github.com/...',
  liveUrl: null,          // optional — if null, link reads "View on GitHub"
  featured: true
}
```

---

## Mobile

Mobile responsiveness is deferred to a post-launch iteration. In v1, screens under 768px show a simple banner:

> *"This portfolio is best viewed on a desktop. A mobile version is coming soon."*

The banner sits above the entry screen and is dismissible. The rest of the site is still accessible but may not render correctly.

This prevents broken layouts being the first thing a mobile recruiter sees while keeping scope manageable.

---

## Analytics Counter (deferred)

Backend endpoints (to be built in a later iteration):
- `POST /api/visit/:type` — increments `recruiter` or `developer` counter
- `GET /api/stats` — returns `{ recruiter: N, developer: N }` (protected by a simple secret param)

In v1, the `fetch('/api/visit/:type')` call exists in `EntryScreen` but is wrapped in `try/catch` and fires silently. If the server is not running, the user experience is unaffected.

---

## Out of Scope (v1)

- Blog
- Dark/light mode persistence via `localStorage`
- Full mobile responsive layout
- Framer Motion or other animation libraries
- CMS or admin interface
- Live counter display anywhere on the site

---

## Assets Required Before Launch

- [ ] Final photo of Michael (high-res, for light mode hero panel)
- [ ] ASCII art portrait as text (source: `temp-inspiration/ascii-art.png`, already embedded in mock)
- [ ] Resume PDF hosted at a stable URL
- [ ] Confirmed GitHub profile URL
- [ ] Confirmed LinkedIn URL
- [ ] Contact email address
- [ ] Domain name purchased
