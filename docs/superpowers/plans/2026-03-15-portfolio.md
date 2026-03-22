# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Michael Corrado's dual-mode portfolio — a terminal-style dark SPA and an editorial light SPA — with a split-screen entry, fake build animation transition, and Express backend analytics stub.

**Architecture:** Single Railway service — Express server in `server/` that serves the Vite React client from `client/dist/` in production. In dev, Vite dev server runs on port 5173 with Express on 3001. All content lives in `client/src/data/content.js`; components are split by mode (terminal, light, entry) under `client/src/components/`.

**Tech Stack:** React 18 (Vite), SCSS (sass), Vitest + React Testing Library, Node.js + Express, Railway

---

## Progress Log (updated 2026-03-18)

### Completed
- ✅ Vite + React scaffolded, SCSS + Vitest wired up
- ✅ Migrated to **TypeScript** (`.tsx`) — added `tsconfig.json`, `@types/react`, `@types/react-dom`
- ✅ SCSS foundation: `_variables.scss`, `_mixins.scss`, `_entry.scss`, `_terminal.scss`, `_light.scss`, `_build.scss`, `main.scss`
- ✅ `EntryScreen.tsx` — typewriter animation, blinking cursor, Developer/Recruiter buttons
- ✅ `BuildTransition.tsx` — mode-specific boot sequence, lines animate in, calls `onDone` when done
- ✅ `App.tsx` — `mode` + `isLoading` state, `handleSelect` wires entry → loading → (next page)
- ✅ `_entry.scss` + `_build.scss` styled (terminal window chrome, green palette)

### Deviations from original plan
- Used **TypeScript** throughout instead of JavaScript
- `EntryScreen` and `BuildTransition` live in `pages/` not `components/`
- `BuildTransition` is a full page layer, not a progress bar — shows scrolling boot text
- File map `.jsx` references should be read as `.tsx`

### Ideas backlog
- Entry screen: animated ASCII green lines drifting in background (add after terminal page done)
- Build screen: ASCII turtle bottom-right, ambient background lines
- Terminal page: scroll-driven Eastern Red Cedar tree animation (scroll scrubs video frames, AI-generated asset from James Gardens)
- Easter egg: "The Opposition" button → rickroll

### Up next
- Build `TerminalMode` page (the developer portfolio)
- Or: generate turtle + background assets first

---

## File Map

### Client

| File | Responsibility |
|------|---------------|
| `client/src/App.jsx` | Mode state machine (`entry → terminal ↔ light`), renders correct mode |
| `client/src/data/content.js` | Single source of truth for all portfolio content |
| `client/src/assets/portrait.js` | ASCII art portrait as named export string |
| `client/src/components/MobileBanner.jsx` | Dismissible desktop-only warning |
| `client/src/components/EntryScreen.jsx` | Split-screen DEVELOPER/RECRUITER choice |
| `client/src/components/BuildTransition.jsx` | Fake compile log + progress bar animation |
| `client/src/components/terminal/TerminalMode.jsx` | Terminal layout shell, scroll container ref |
| `client/src/components/terminal/TerminalChrome.jsx` | macOS traffic lights + window title |
| `client/src/components/terminal/TerminalTabs.jsx` | Tab nav, IntersectionObserver active state |
| `client/src/components/terminal/TerminalHero.jsx` | ASCII block name + ASCII portrait pre |
| `client/src/components/terminal/TerminalSection.jsx` | Scroll-reveal wrapper (IntersectionObserver) |
| `client/src/components/terminal/TerminalAbout.jsx` | Bio section |
| `client/src/components/terminal/TerminalProjects.jsx` | Project card grid |
| `client/src/components/terminal/TerminalSkills.jsx` | Skill tag grid |
| `client/src/components/terminal/TerminalContact.jsx` | 2×2 contact grid + resume link |
| `client/src/components/terminal/TerminalStatusBar.jsx` | Status items + BUILD LIGHT MODE button |
| `client/src/components/light/LightMode.jsx` | Light mode layout shell, scroll container ref |
| `client/src/components/light/LightNav.jsx` | Logo, nav links, resume, terminal button |
| `client/src/components/light/LightHero.jsx` | Editorial name + photo panel |
| `client/src/components/light/LightSection.jsx` | Scroll-reveal wrapper |
| `client/src/components/light/LightProjects.jsx` | Project card grid |
| `client/src/components/light/LightSkills.jsx` | Skill pill tags |
| `client/src/components/light/LightContact.jsx` | Contact grid + resume |
| `client/src/components/light/LightFooter.jsx` | Footer with logo + tagline |

### Styles

| File | Responsibility |
|------|---------------|
| `client/src/styles/_variables.scss` | All design tokens (colors, fonts, breakpoints) |
| `client/src/styles/_mixins.scss` | Scanline overlay, scroll-reveal animation |
| `client/src/styles/_entry.scss` | Entry screen (`e-` prefix) |
| `client/src/styles/_terminal.scss` | Terminal mode (`t-` prefix) |
| `client/src/styles/_light.scss` | Light mode (`l-` prefix) |
| `client/src/styles/_build.scss` | Build transition (`b-` prefix) |
| `client/src/styles/main.scss` | Imports all partials + global resets + page layer system |

### Server

| File | Responsibility |
|------|---------------|
| `server/server.js` | Express app, analytics endpoints, serves client dist in production |
| `server/data.json` | Persisted counter: `{ "developer": 0, "recruiter": 0 }` |

---

## Chunk 1: Project Scaffolding & SCSS Foundation

### Task 1: Bootstrap Vite + React project

**Files:**
- Create: `client/` (Vite scaffold)
- Modify: `client/vite.config.js`
- Create: `client/src/setupTests.js`

- [ ] **Step 1.1: Scaffold the Vite React project**

  Run from the repo root (`portfolio/`):
  ```bash
  npm create vite@latest client -- --template react
  ```
  When prompted: framework = React, variant = JavaScript.
  Expected: `client/` directory created with `src/`, `public/`, `package.json`, `vite.config.js`, `index.html`.

- [ ] **Step 1.2: Install client dependencies**

  ```bash
  cd client && npm install
  npm install -D sass
  npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
  ```

- [ ] **Step 1.3: Configure Vitest in `vite.config.js`**

  Replace `client/vite.config.js` with:
  ```js
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  export default defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.js',
    },
  })
  ```

- [ ] **Step 1.4: Create test setup file**

  Create `client/src/setupTests.js`:
  ```js
  import '@testing-library/jest-dom'
  ```

- [ ] **Step 1.5: Add test scripts to `client/package.json`**

  In `client/package.json`, add to the `"scripts"` section:
  ```json
  "test": "vitest run",
  "test:watch": "vitest"
  ```

- [ ] **Step 1.6: Verify test runner works**

  Create `client/src/__tests__/sanity.test.js`:
  ```js
  test('sanity check', () => {
    expect(1 + 1).toBe(2)
  })
  ```
  Run:
  ```bash
  cd client && npm test
  ```
  Expected: `1 passed`.

- [ ] **Step 1.7: Commit**

  Run from the repo root (`portfolio/`):
  ```bash
  git add client/ && git commit -m "feat: scaffold Vite React app with Vitest"
  ```

---

### Task 2: SCSS file structure and design tokens

**Files:**
- Create: `client/src/styles/_variables.scss`
- Create: `client/src/styles/_mixins.scss`
- Create: `client/src/styles/main.scss`
- Create: `client/src/styles/_entry.scss` (stub)
- Create: `client/src/styles/_terminal.scss` (stub)
- Create: `client/src/styles/_light.scss` (stub)
- Create: `client/src/styles/_build.scss` (stub)

- [ ] **Step 2.1: Create `_variables.scss`**

  ```scss
  // client/src/styles/_variables.scss

  // === Dark Mode ===
  $bg-dark:         #0a0a08;
  $green-primary:   #b8ff6e;
  $green-dim:       #3a5a20;
  $green-mid:       #8ac860;
  $green-portrait:  #7ab848;

  // === Light Mode ===
  $bg-light:        #f5f0e8;
  $olive-dark:      #3a4a1e;
  $green-accent:    #16a34a;
  $text-body:       #5a5840;
  $text-muted:      #7a8a4a;
  $card-bg:         #ede8dc;
  $border-light:    #d0c8b0;

  // === Fonts ===
  $font-mono:  'Courier New', Courier, monospace;
  $font-serif: Georgia, serif;
  $font-sans:  system-ui, -apple-system, sans-serif;

  // === Breakpoints ===
  $bp-mobile: 768px;
  ```

- [ ] **Step 2.2: Create `_mixins.scss`**

  ```scss
  // client/src/styles/_mixins.scss

  // Scroll-reveal animation — elements start invisible and slide up.
  // Add .visible class (via IntersectionObserver) to trigger the reveal.
  @mixin scroll-reveal {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // Scanline overlay — the CRT phosphor scanline effect used in terminal and entry dark panels.
  // Apply via a dedicated <div class="t-scanline"> or ::after pseudo-element on a positioned parent.
  @mixin scanline-overlay {
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(0, 10, 0, 0.15) 3px,
      rgba(0, 10, 0, 0.15) 4px
    );
    pointer-events: none;
  }
  ```

- [ ] **Step 2.3: Create stub SCSS partials**

  Create `client/src/styles/_entry.scss`:
  ```scss
  // Entry screen styles — e- prefix
  @use './variables' as *;
  ```

  Create `client/src/styles/_terminal.scss`:
  ```scss
  // Terminal mode styles — t- prefix
  @use './variables' as *;
  @use './mixins' as *;
  ```

  Create `client/src/styles/_light.scss`:
  ```scss
  // Light mode styles — l- prefix
  @use './variables' as *;
  @use './mixins' as *;
  ```

  Create `client/src/styles/_build.scss`:
  ```scss
  // Build transition styles — b- prefix
  @use './variables' as *;
  ```

- [ ] **Step 2.4: Create `main.scss`**

  ```scss
  // client/src/styles/main.scss
  @use './variables' as *;
  @use './mixins' as *;
  @use './entry';
  @use './terminal';
  @use './light';
  @use './build';

  // Global resets
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  // Page layer system — all modes sit at full-screen, stacked.
  // App.jsx controls visibility with .hidden and .gone classes.
  .page {
    position: fixed;
    inset: 0;
    transition: opacity 0.4s ease;
  }

  .page.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .page.gone {
    display: none;
  }

  // Mobile warning banner — only visible on screens under $bp-mobile
  .mobile-banner {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #1a2a0e;
    color: $green-primary;
    font-family: $font-mono;
    font-size: 0.8rem;
    padding: 0.6rem 1rem;
    text-align: center;
    border-bottom: 1px solid $green-dim;
    gap: 0.75rem;

    button {
      background: none;
      border: none;
      color: $green-primary;
      font-family: $font-mono;
      font-size: 0.8rem;
      text-decoration: underline;
    }

    @media (max-width: #{$bp-mobile}) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  ```

- [ ] **Step 2.5: Update `main.jsx` to import SCSS**

  Open `client/src/main.jsx`. Replace the existing CSS import line with:
  ```jsx
  import './styles/main.scss'
  ```
  Delete the lines importing `./index.css` or `./App.css`.
  Also delete `client/src/index.css` and `client/src/App.css`.

- [ ] **Step 2.6: Verify SCSS compiles**

  ```bash
  cd client && npm run dev
  ```
  Open http://localhost:5173. Expected: blank/unstyled page with no console errors. Press Ctrl+C.

- [ ] **Step 2.7: Commit**

  ```bash
  git add client/src/styles/ client/src/main.jsx && git commit -m "feat: SCSS structure with design tokens, mixins, and page layer system"
  ```

---

## Chunk 2: Content Data

### Task 3: Portfolio content file

**Files:**
- Create: `client/src/data/content.js`
- Create: `client/src/assets/portrait.js`
- Create: `client/src/__tests__/content.test.js`

- [ ] **Step 3.1: Write the failing content tests**

  Create `client/src/__tests__/content.test.js`:
  ```js
  import { projects, skills, contact, bio } from '../data/content'

  describe('content data', () => {
    test('every project has required fields', () => {
      projects.forEach(project => {
        expect(project).toHaveProperty('id')
        expect(project).toHaveProperty('name')
        expect(project).toHaveProperty('stack')
        expect(project).toHaveProperty('description')
        expect(project).toHaveProperty('githubUrl')
        expect(project).toHaveProperty('liveUrl')  // present but may be null
        expect(project).toHaveProperty('featured')
        if (project.liveUrl !== null) {
          expect(typeof project.liveUrl).toBe('string')
        }
      })
    })

    test('skills is a non-empty array of strings', () => {
      expect(Array.isArray(skills)).toBe(true)
      expect(skills.length).toBeGreaterThan(0)
      skills.forEach(skill => expect(typeof skill).toBe('string'))
    })

    test('contact has required fields', () => {
      expect(contact).toHaveProperty('email')
      expect(contact).toHaveProperty('github')
      expect(contact).toHaveProperty('linkedin')
      expect(contact).toHaveProperty('location')
      expect(contact).toHaveProperty('resumeUrl')
    })

    test('bio is a non-empty string', () => {
      expect(typeof bio).toBe('string')
      expect(bio.length).toBeGreaterThan(0)
    })
  })
  ```

- [ ] **Step 3.2: Run test to confirm it fails**

  ```bash
  cd client && npm test
  ```
  Expected: FAIL — `Cannot find module '../data/content'`

- [ ] **Step 3.3: Create `content.js`**

  ```js
  // client/src/data/content.js
  // All portfolio content lives here. Edit this file to update any text on the site.

  export const bio = `Full-stack software engineer with a background in creative problem-solving
  and a focus on building clean, user-centred products. BrainStation graduate (2025),
  currently open to full-time opportunities in Toronto or remote.`

  export const projects = [
    {
      id: 'instock',
      name: 'InStock',
      stack: ['React', 'Node.js', 'Express', 'MySQL'],
      description: 'Inventory management system built as a team of four during a BrainStation industry sprint. Features warehouse and inventory CRUD, real-time stock tracking, and a responsive dashboard.',
      githubUrl: 'https://github.com/michaelcorrado/instock',  // TODO: replace with real URL
      liveUrl: null,
      featured: true,
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      stack: ['React', 'SCSS', 'Node.js', 'Express'],
      description: 'This portfolio — a dual-mode SPA with a terminal dark mode and an editorial light mode, a fake build animation transition, and a split-screen entry page.',
      githubUrl: 'https://github.com/michaelcorrado/portfolio',  // TODO: replace with real URL
      liveUrl: null,
      featured: true,
    },
  ]

  export const skills = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Express',
    'MySQL', 'HTML', 'CSS', 'SCSS', 'Git', 'REST APIs',
    'Vite', 'Figma', 'Agile / Scrum',
  ]

  export const contact = {
    email: 'michael@example.com',                          // TODO: replace with real email
    github: 'https://github.com/michaelcorrado',           // TODO: replace with real URL
    linkedin: 'https://linkedin.com/in/michaelcorrado',    // TODO: replace with real URL
    location: 'Toronto, ON',
    resumeUrl: '/resume.pdf',                              // drop resume.pdf into client/public/
  }
  ```

- [ ] **Step 3.4: Create `portrait.js`**

  Create `client/src/assets/portrait.js`:
  ```js
  // client/src/assets/portrait.js
  // The ASCII art portrait of Michael Corrado.
  // Rendered as a <pre> element at font-size: 0.3rem in TerminalHero.
  //
  // HOW TO UPDATE: Open portfolio/mock.html in a text editor.
  // Find the `portraitText` JavaScript variable (the long template literal).
  // Copy everything between the backticks and paste it here.

  export const PORTRAIT = `
  [PASTE FULL ASCII ART TEXT HERE — copy portraitText from mock.html]
  `.trim()
  ```

  **Manual step:** Open `portfolio/mock.html` in VS Code. Search for `portraitText`. Copy the full ASCII art string (everything between the backticks of that template literal) and paste it into `portrait.js` replacing the placeholder text above.

- [ ] **Step 3.4b: Verify portrait placeholder was replaced**

  Add a test to `client/src/__tests__/content.test.js` to guard against accidentally shipping the placeholder:
  ```js
  import { PORTRAIT } from '../assets/portrait'

  test('portrait contains ASCII art, not the placeholder', () => {
    expect(PORTRAIT).not.toContain('PASTE')
    expect(PORTRAIT.length).toBeGreaterThan(100)
  })
  ```
  Run:
  ```bash
  cd client && npm test
  ```
  Expected: **FAIL** until you complete the manual paste step above. Once you paste the real ASCII art, this test will pass.

- [ ] **Step 3.5: Run tests — should all pass**

  ```bash
  cd client && npm test
  ```
  Expected: `5 passed` (4 content tests + 1 portrait placeholder check). Note: the portrait test will **fail** until you complete the manual ASCII paste in Step 3.4 — that is intentional. Complete the paste first, then run.

- [ ] **Step 3.6: Commit**

  ```bash
  git add client/src/data/ client/src/assets/ client/src/__tests__/content.test.js
  git commit -m "feat: portfolio content data and ASCII portrait asset"
  ```

---

## Chunk 3: Entry Screen

### Task 4: EntryScreen component

**Files:**
- Create: `client/src/components/EntryScreen.jsx`
- Modify: `client/src/styles/_entry.scss`
- Create: `client/src/__tests__/EntryScreen.test.jsx`

- [ ] **Step 4.1: Write failing tests**

  Create `client/src/__tests__/EntryScreen.test.jsx`:
  ```jsx
  import { render, screen, fireEvent } from '@testing-library/react'
  import EntryScreen from '../components/EntryScreen'

  describe('EntryScreen', () => {
    test('renders DEVELOPER and RECRUITER panels', () => {
      render(<EntryScreen onSelect={() => {}} />)
      expect(screen.getByText('DEVELOPER')).toBeInTheDocument()
      expect(screen.getByText('RECRUITER')).toBeInTheDocument()
    })

    test('calls onSelect("developer") when developer panel clicked', () => {
      const onSelect = vi.fn()
      render(<EntryScreen onSelect={onSelect} />)
      fireEvent.click(screen.getByText('DEVELOPER'))
      expect(onSelect).toHaveBeenCalledWith('developer')
    })

    test('calls onSelect("recruiter") when recruiter panel clicked', () => {
      const onSelect = vi.fn()
      render(<EntryScreen onSelect={onSelect} />)
      fireEvent.click(screen.getByText('RECRUITER'))
      expect(onSelect).toHaveBeenCalledWith('recruiter')
    })

    test('"not sure?" link calls onSelect("developer")', () => {
      const onSelect = vi.fn()
      render(<EntryScreen onSelect={onSelect} />)
      fireEvent.click(screen.getByText(/not sure/i))
      expect(onSelect).toHaveBeenCalledWith('developer')
    })
  })
  ```

- [ ] **Step 4.2: Run tests to confirm failure**

  ```bash
  cd client && npm test
  ```
  Expected: FAIL — `Cannot find module '../components/EntryScreen'`

- [ ] **Step 4.3: Create `EntryScreen.jsx`**

  ```jsx
  // client/src/components/EntryScreen.jsx
  // Split-screen entry page. Receives onSelect(type) — called with 'developer' or 'recruiter'.
  // Fires a silent analytics fetch before navigating.

  function EntryScreen({ onSelect }) {
    function trackAndSelect(type) {
      // Analytics stub — fails silently if server is not running
      try {
        fetch(`/api/visit/${type}`, { method: 'POST' }).catch(() => {})
      } catch (e) {}
      onSelect(type)
    }

    return (
      <div className="e-container">
        <div
          className="e-panel e-panel--developer"
          onClick={() => trackAndSelect('developer')}
        >
          <div className="e-panel__label">DEVELOPER</div>
        </div>

        <div
          className="e-panel e-panel--recruiter"
          onClick={() => trackAndSelect('recruiter')}
        >
          <div className="e-panel__label">RECRUITER</div>
        </div>

        <a
          className="e-skip"
          href="#"
          onClick={(e) => { e.preventDefault(); trackAndSelect('developer') }}
        >
          not sure? explore on your own →
        </a>
      </div>
    )
  }

  export default EntryScreen
  ```

- [ ] **Step 4.4: Run tests to confirm they pass**

  ```bash
  cd client && npm test
  ```
  Expected: all 4 EntryScreen tests pass.

- [ ] **Step 4.5: Write `_entry.scss`**

  ```scss
  // client/src/styles/_entry.scss
  @use './variables' as *;

  .e-container {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .e-panel {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: flex 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    // Hover: this panel expands to ~55%, the other contracts
    &:hover { flex: 1.22; }
  }

  .e-panel--developer {
    background: $bg-dark;

    .e-panel__label {
      font-family: $font-mono;
      font-size: clamp(2rem, 5vw, 4.5rem);
      font-weight: 700;
      color: $green-primary;
      letter-spacing: 0.08em;
      text-shadow: 0 0 30px rgba(184, 255, 110, 0.4);
      transition: text-shadow 0.3s ease;
      position: relative;
      z-index: 1;
    }

    &:hover .e-panel__label {
      text-shadow: 0 0 60px rgba(184, 255, 110, 0.7);
    }

    // Scanline overlay
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(0, 10, 0, 0.15) 3px,
        rgba(0, 10, 0, 0.15) 4px
      );
      pointer-events: none;
    }
  }

  .e-panel--recruiter {
    background: $bg-light;
    border-left: 1px solid $border-light;

    .e-panel__label {
      font-family: $font-serif;
      font-size: clamp(2rem, 5vw, 4.5rem);
      font-weight: 700;
      color: $olive-dark;
      letter-spacing: 0.04em;
      position: relative;

      &::after {
        content: '';
        display: block;
        height: 3px;
        background: $green-accent;
        margin-top: 0.3em;
        width: 100%;
      }
    }
  }

  .e-skip {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-family: $font-mono;
    font-size: 0.75rem;
    color: rgba(184, 255, 110, 0.5);
    white-space: nowrap;
    z-index: 2;
    transition: color 0.2s ease;

    &:hover { color: $green-primary; }
  }

  // Mobile: stack vertically, RECRUITER on top
  @media (max-width: #{$bp-mobile}) {
    .e-container { flex-direction: column; }
    .e-panel--recruiter {
      border-left: none;
      border-top: 1px solid $border-light;
      order: -1;
    }
  }
  ```

- [ ] **Step 4.6: Commit**

  ```bash
  git add client/src/components/EntryScreen.jsx client/src/styles/_entry.scss client/src/__tests__/EntryScreen.test.jsx
  git commit -m "feat: EntryScreen with DEVELOPER/RECRUITER split and analytics stub"
  ```

---

## Chunk 4: App Root and Mode State Machine

### Task 5: App.jsx + MobileBanner

**Files:**
- Modify: `client/src/App.jsx`
- Create: `client/src/components/MobileBanner.jsx`
- Create stubs: `client/src/components/terminal/TerminalMode.jsx`, `client/src/components/light/LightMode.jsx`, `client/src/components/BuildTransition.jsx`

The mode state machine has four states:
- `'entry'` — initial state, entry screen visible
- `'terminal'` — developer mode, terminal visible
- `'building'` — intermediate during fake compile animation
- `'light'` — recruiter/editorial mode, light visible

Page visibility rules:
- `entry` page: visible only in `entry` state, `gone` in all others
- `terminal` page: visible in `terminal`, `gone` in `building` and `light`
- `build` page: visible in `building`, `gone` in all others
- `light` page: visible in `light`, `gone` in all others

`gone` = `display:none` (completely removed). `hidden` = `opacity:0` (fading out, not gone yet).

- [ ] **Step 5.1: Write `MobileBanner.jsx`**

  ```jsx
  // client/src/components/MobileBanner.jsx
  function MobileBanner({ onDismiss }) {
    return (
      <div className="mobile-banner">
        <span>This portfolio is best viewed on a desktop. A mobile version is coming soon.</span>
        <button onClick={onDismiss}>✕</button>
      </div>
    )
  }
  export default MobileBanner
  ```

- [ ] **Step 5.2: Create stub TerminalMode**

  Create `client/src/components/terminal/TerminalMode.jsx`:
  ```jsx
  export default function TerminalMode({ onBuildLightMode }) {
    return (
      <div style={{ background: '#0a0a08', color: '#b8ff6e', padding: '2rem', height: '100%', fontFamily: 'monospace' }}>
        <p>Terminal Mode (stub)</p>
        <button onClick={onBuildLightMode} style={{ marginTop: '1rem', background: 'none', border: '1px solid #b8ff6e', color: '#b8ff6e', padding: '0.5rem', cursor: 'pointer', fontFamily: 'monospace' }}>
          [ BUILD LIGHT MODE ]
        </button>
      </div>
    )
  }
  ```

- [ ] **Step 5.3: Create stub LightMode**

  Create `client/src/components/light/LightMode.jsx`:
  ```jsx
  export default function LightMode({ onGoTerminal }) {
    return (
      <div style={{ background: '#f5f0e8', color: '#3a4a1e', padding: '2rem', height: '100%' }}>
        <p>Light Mode (stub)</p>
        <button onClick={onGoTerminal} style={{ marginTop: '1rem' }}>⌨ Terminal</button>
      </div>
    )
  }
  ```

- [ ] **Step 5.4: Create stub BuildTransition**

  Create `client/src/components/BuildTransition.jsx`:
  ```jsx
  export default function BuildTransition({ onComplete }) {
    return (
      <div style={{ background: '#0a0a08', color: '#b8ff6e', padding: '2rem', height: '100%', fontFamily: 'monospace', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={onComplete}>Skip build animation (stub)</button>
      </div>
    )
  }
  ```

- [ ] **Step 5.5: Write `App.jsx`**

  ```jsx
  // client/src/App.jsx
  // Mode state machine — controls which page is visible.
  // mode: 'entry' | 'terminal' | 'building' | 'light'

  import { useState } from 'react'
  import EntryScreen from './components/EntryScreen'
  import BuildTransition from './components/BuildTransition'
  import TerminalMode from './components/terminal/TerminalMode'
  import LightMode from './components/light/LightMode'
  import MobileBanner from './components/MobileBanner'

  function App() {
    const [mode, setMode] = useState('entry')
    const [bannerDismissed, setBannerDismissed] = useState(false)

    // Computes CSS class string for each page div.
    // 'gone' = display:none (removed from DOM/accessibility tree).
    // 'hidden' = opacity:0 + pointer-events:none (visible in DOM but not interactive — used during transitions).
    // '' = fully visible and active.
    // Rule: a page is only 'hidden' (not 'gone') when it is transitioning out.
    // During 'entry' state, all non-entry pages are 'gone' — not in the DOM at all.
    function pageClass(pageName) {
      const isActive = {
        entry:    mode === 'entry',
        terminal: mode === 'terminal',
        build:    mode === 'building',
        light:    mode === 'light',
      }[pageName]

      const isGone = {
        entry:    mode !== 'entry',
        terminal: mode !== 'terminal',  // gone in entry, building, and light
        build:    mode !== 'building',
        light:    mode !== 'light',
      }[pageName]

      if (isGone)    return 'page gone'
      if (!isActive) return 'page hidden'
      return 'page'
    }

    return (
      <>
        {!bannerDismissed && (
          <MobileBanner onDismiss={() => setBannerDismissed(true)} />
        )}

        <div className={pageClass('entry')}>
          <EntryScreen
            onSelect={(type) => setMode(type === 'developer' ? 'terminal' : 'light')}
          />
        </div>

        <div className={pageClass('terminal')}>
          <TerminalMode onBuildLightMode={() => setMode('building')} />
        </div>

        <div className={pageClass('build')}>
          <BuildTransition onComplete={() => setMode('light')} />
        </div>

        <div className={pageClass('light')}>
          <LightMode onGoTerminal={() => setMode('terminal')} />
        </div>
      </>
    )
  }

  export default App
  ```

- [ ] **Step 5.6: Test mode switching in browser**

  ```bash
  cd client && npm run dev
  ```
  Open http://localhost:5173. Verify:
  - Entry screen shows DEVELOPER and RECRUITER panels
  - Click DEVELOPER → terminal stub appears
  - Click `[ BUILD LIGHT MODE ]` → build stub appears, click skip → light stub appears
  - Click `⌨ Terminal` → back to terminal stub
  - Hard-reload page → entry screen again
  Press Ctrl+C.

- [ ] **Step 5.7: Commit**

  ```bash
  git add client/src/App.jsx client/src/components/MobileBanner.jsx client/src/components/BuildTransition.jsx client/src/components/terminal/TerminalMode.jsx client/src/components/light/LightMode.jsx
  git commit -m "feat: App mode state machine with stub components"
  ```

---

## Chunk 5: Terminal Mode

### Task 6: TerminalChrome

**Files:**
- Modify: `client/src/components/terminal/TerminalChrome.jsx`

- [ ] **Step 6.1: Replace stub with real `TerminalChrome.jsx`**

  ```jsx
  // client/src/components/terminal/TerminalChrome.jsx
  function TerminalChrome() {
    return (
      <div className="t-chrome">
        <div className="t-chrome__dots">
          <span className="t-chrome__dot t-chrome__dot--red" />
          <span className="t-chrome__dot t-chrome__dot--yellow" />
          <span className="t-chrome__dot t-chrome__dot--green" />
        </div>
        <div className="t-chrome__title">michael.corrado — portfolio ~</div>
      </div>
    )
  }
  export default TerminalChrome
  ```

---

### Task 7: TerminalTabs

**Files:**
- Modify: `client/src/components/terminal/TerminalTabs.jsx`

`TerminalTabs` receives the scroll container ref from `TerminalMode` and uses it as the `root` for `IntersectionObserver`. This is critical — if `root` were set to the document instead of the scroll container, sections outside the container viewport would still trigger, breaking the active tab logic.

- [ ] **Step 7.1: Create `TerminalTabs.jsx`**

  ```jsx
  // client/src/components/terminal/TerminalTabs.jsx
  import { useState, useEffect } from 'react'

  const TABS = [
    { id: 'summary',  label: 'SUMMARY' },
    { id: 'about',    label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills',   label: 'SKILLS' },
    { id: 'contact',  label: 'CONTACT' },
  ]

  function TerminalTabs({ scrollRef }) {
    const [active, setActive] = useState('summary')

    useEffect(() => {
      const container = scrollRef?.current
      if (!container) return

      // root: scrollRef.current means "visible within this div", not the whole page
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActive(entry.target.dataset.section)
            }
          })
        },
        { root: container, threshold: 0.5 }
      )

      const sections = container.querySelectorAll('[data-section]')
      sections.forEach(s => observer.observe(s))
      return () => observer.disconnect()
    }, [scrollRef])

    function scrollTo(id) {
      const container = scrollRef?.current
      if (!container) return
      const target = container.querySelector(`[data-section="${id}"]`)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
      <nav className="t-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`t-tabs__tab${active === tab.id ? ' t-tabs__tab--active' : ''}`}
            onClick={() => scrollTo(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    )
  }

  export default TerminalTabs
  ```

---

### Task 8: TerminalHero

**Files:**
- Modify: `client/src/components/terminal/TerminalHero.jsx`

- [ ] **Step 8.1: Create `TerminalHero.jsx`**

  ```jsx
  // client/src/components/terminal/TerminalHero.jsx
  // Left column: ASCII block-letter name + key-value identity block.
  // Right column: ASCII art portrait rendered as <pre> (NOT an image with filter).
  // The portrait text is set via useEffect so the raw ASCII characters are preserved.

  import { useEffect, useRef } from 'react'
  import { PORTRAIT } from '../../assets/portrait'
  import { contact } from '../../data/content'

  // Block-letter name using Unicode box-drawing characters.
  // These are decorative — they look cool but aren't the primary name carrier.
  // Font-size is kept small (0.65rem) so the grid of characters forms readable shapes.
  const ASCII_NAME = String.raw`
███╗   ███╗██╗ ██████╗██╗  ██╗ █████╗ ███████╗██╗
████╗ ████║██║██╔════╝██║  ██║██╔══██╗██╔════╝██║
██╔████╔██║██║██║     ███████║███████║█████╗  ██║
██║╚██╔╝██║██║██║     ██╔══██║██╔══██║██╔══╝  ██║
██║ ╚═╝ ██║██║╚██████╗██║  ██║██║  ██║███████╗███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝

 ██████╗ ██████╗ ██████╗ ██████╗  █████╗ ██████╗  ██████╗
██╔════╝██╔═══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔═══██╗
██║     ██║   ██║██████╔╝██████╔╝███████║██║  ██║██║   ██║
██║     ██║   ██║██╔══██╗██╔══██╗██╔══██║██║  ██║██║   ██║
╚██████╗╚██████╔╝██║  ██║██║  ██║██║  ██║██████╔╝╚██████╔╝
 ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝`.trim()

  function TerminalHero() {
    const portraitRef = useRef(null)

    // Use textContent (not innerHTML/JSX) to render raw ASCII without escaping
    useEffect(() => {
      if (portraitRef.current) {
        portraitRef.current.textContent = PORTRAIT
      }
    }, [])

    return (
      <div className="t-hero" data-section="summary">
        <div className="t-hero__left">
          <pre className="t-hero__ascii-name">{ASCII_NAME}</pre>
          <div className="t-hero__identity">
            <div className="t-hero__kv">
              <span className="t-hero__key">ROLE</span>
              <span className="t-hero__val">Full-Stack Software Engineer</span>
            </div>
            <div className="t-hero__kv">
              <span className="t-hero__key">GRAD</span>
              <span className="t-hero__val">BrainStation 2025</span>
            </div>
            <div className="t-hero__kv">
              <span className="t-hero__key">LOCATION</span>
              <span className="t-hero__val">Toronto, ON</span>
            </div>
            <div className="t-hero__kv">
              <span className="t-hero__key">STATUS</span>
              <span className="t-hero__val t-hero__val--open">● Open to work</span>
            </div>
            <div className="t-hero__kv">
              <span className="t-hero__key">GITHUB</span>
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="t-hero__val">
                {contact.github.replace('https://', '')}
              </a>
            </div>
          </div>
          <div className="t-hero__prompt">
            <span className="t-hero__prompt-text">$ cat about.txt</span>
            <span className="t-hero__cursor" />
          </div>
        </div>
        <div className="t-hero__right">
          <pre ref={portraitRef} className="t-hero__portrait" aria-hidden="true" />
        </div>
      </div>
    )
  }

  export default TerminalHero
  ```

---

### Task 9: TerminalSection (scroll-reveal wrapper)

**Files:**
- Modify: `client/src/components/terminal/TerminalSection.jsx`

- [ ] **Step 9.1: Create `TerminalSection.jsx`**

  ```jsx
  // client/src/components/terminal/TerminalSection.jsx
  // Wraps a section and adds .visible class when the section scrolls into view.
  // root: scrollRef.current (NOT document) so the observer tracks the scroll container.

  import { useRef, useEffect } from 'react'

  function TerminalSection({ id, scrollRef, children }) {
    const sectionRef = useRef(null)

    useEffect(() => {
      const container = scrollRef?.current
      const el = sectionRef.current
      if (!container || !el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('visible')
            observer.disconnect()  // reveal once — no need to keep watching
          }
        },
        { root: container, threshold: 0.08 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    }, [scrollRef])

    return (
      <section ref={sectionRef} className="t-section" data-section={id}>
        {children}
      </section>
    )
  }

  export default TerminalSection
  ```

---

### Task 10: Terminal section content components

**Files:**
- Modify: `client/src/components/terminal/TerminalAbout.jsx`
- Modify: `client/src/components/terminal/TerminalProjects.jsx`
- Modify: `client/src/components/terminal/TerminalSkills.jsx`
- Modify: `client/src/components/terminal/TerminalContact.jsx`
- Create: `client/src/__tests__/TerminalProjects.test.jsx`

- [ ] **Step 10.1: Write failing test for liveUrl fallback**

  Create `client/src/__tests__/TerminalProjects.test.jsx`:
  ```jsx
  import { render, screen } from '@testing-library/react'
  import TerminalProjects from '../components/terminal/TerminalProjects'

  const mockProjects = [
    {
      id: 'a', name: 'WithLive', stack: ['React'], description: 'Has live URL',
      githubUrl: 'https://github.com/a', liveUrl: 'https://example.com', featured: true,
    },
    {
      id: 'b', name: 'GitHubOnly', stack: ['Node.js'], description: 'No live URL',
      githubUrl: 'https://github.com/b', liveUrl: null, featured: true,
    },
  ]

  test('renders "→ View project" when liveUrl present', () => {
    render(<TerminalProjects projects={mockProjects} />)
    expect(screen.getByText('→ View project')).toBeInTheDocument()
  })

  test('renders "→ View on GitHub" when liveUrl is null', () => {
    render(<TerminalProjects projects={mockProjects} />)
    expect(screen.getByText('→ View on GitHub')).toBeInTheDocument()
  })
  ```

- [ ] **Step 10.2: Run test to confirm it fails**

  ```bash
  cd client && npm test
  ```
  Expected: FAIL — `Cannot find module '../components/terminal/TerminalProjects'`

- [ ] **Step 10.3: Create `TerminalAbout.jsx`**

  ```jsx
  import { bio } from '../../data/content'

  function TerminalAbout() {
    return (
      <div className="t-about">
        <h2 className="t-section__header">// 01 — ABOUT</h2>
        <p className="t-about__bio">{bio}</p>
      </div>
    )
  }
  export default TerminalAbout
  ```

- [ ] **Step 10.4: Create `TerminalProjects.jsx`**

  ```jsx
  // Accepts optional `projects` prop so tests can inject mock data.
  // Defaults to real content.js data in production.
  import { projects as defaultProjects } from '../../data/content'

  function TerminalProjects({ projects = defaultProjects }) {
    return (
      <div className="t-projects">
        <h2 className="t-section__header">// 02 — PROJECTS</h2>
        <div className="t-projects__grid">
          {projects.map((project, i) => (
            <div key={project.id} className="t-project-card">
              <div className="t-project-card__number">0{i + 1}</div>
              <div className="t-project-card__name">▸ {project.name}</div>
              <div className="t-project-card__stack">{project.stack.join(' · ')}</div>
              <p className="t-project-card__desc">{project.description}</p>
              <a
                href={project.liveUrl ?? project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="t-project-card__link"
              >
                {project.liveUrl ? '→ View project' : '→ View on GitHub'}
              </a>
            </div>
          ))}
        </div>
      </div>
    )
  }
  export default TerminalProjects
  ```

- [ ] **Step 10.5: Create `TerminalSkills.jsx`**

  ```jsx
  import { skills } from '../../data/content'

  function TerminalSkills() {
    return (
      <div className="t-skills">
        <h2 className="t-section__header">// 03 — SKILLS</h2>
        <div className="t-skills__grid">
          {skills.map(skill => (
            <span key={skill} className="t-skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    )
  }
  export default TerminalSkills
  ```

- [ ] **Step 10.6: Create `TerminalContact.jsx`**

  ```jsx
  import { contact } from '../../data/content'

  function TerminalContact() {
    return (
      <div className="t-contact">
        <h2 className="t-section__header">// 04 — CONTACT</h2>
        <div className="t-contact__grid">
          <a href={`mailto:${contact.email}`} className="t-contact__item">
            <span className="t-contact__label">EMAIL</span>
            <span className="t-contact__value">{contact.email}</span>
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="t-contact__item">
            <span className="t-contact__label">LINKEDIN</span>
            <span className="t-contact__value">linkedin.com/in/michaelcorrado</span>
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="t-contact__item">
            <span className="t-contact__label">GITHUB</span>
            <span className="t-contact__value">github.com/michaelcorrado</span>
          </a>
          <div className="t-contact__item">
            <span className="t-contact__label">LOCATION</span>
            <span className="t-contact__value">{contact.location}</span>
          </div>
          <a href={contact.resumeUrl} download className="t-contact__item t-contact__resume">
            ↓ Download Resume
          </a>
        </div>
      </div>
    )
  }
  export default TerminalContact
  ```

- [ ] **Step 10.7: Run tests to confirm they pass**

  ```bash
  cd client && npm test
  ```
  Expected: all tests pass including liveUrl fallback.

- [ ] **Step 10.8: Commit**

  ```bash
  git add client/src/components/terminal/ client/src/__tests__/TerminalProjects.test.jsx
  git commit -m "feat: terminal section components — about, projects, skills, contact"
  ```

---

### Task 11: TerminalStatusBar

**Files:**
- Modify: `client/src/components/terminal/TerminalStatusBar.jsx`

- [ ] **Step 11.1: Create `TerminalStatusBar.jsx`**

  ```jsx
  function TerminalStatusBar({ onBuildLightMode }) {
    return (
      <div className="t-status-bar">
        <div className="t-status-bar__items">
          <span className="t-status-bar__item t-status-bar__item--online">● ONLINE</span>
          <span className="t-status-bar__item">UTF-8</span>
          <span className="t-status-bar__item">MAIN</span>
          <span className="t-status-bar__item">TORONTO</span>
        </div>
        <button className="t-status-bar__build-btn" onClick={onBuildLightMode}>
          [ BUILD LIGHT MODE ]
        </button>
      </div>
    )
  }
  export default TerminalStatusBar
  ```

---

### Task 12: TerminalMode layout shell + all terminal SCSS

**Files:**
- Modify: `client/src/components/terminal/TerminalMode.jsx`
- Modify: `client/src/styles/_terminal.scss`

- [ ] **Step 12.1: Replace stub with real `TerminalMode.jsx`**

  ```jsx
  // client/src/components/terminal/TerminalMode.jsx
  // Layout shell for terminal mode. Owns the scroll container ref that gets
  // passed to TerminalTabs and TerminalSection for IntersectionObserver.

  import { useRef } from 'react'
  import TerminalChrome from './TerminalChrome'
  import TerminalTabs from './TerminalTabs'
  import TerminalHero from './TerminalHero'
  import TerminalSection from './TerminalSection'
  import TerminalAbout from './TerminalAbout'
  import TerminalProjects from './TerminalProjects'
  import TerminalSkills from './TerminalSkills'
  import TerminalContact from './TerminalContact'
  import TerminalStatusBar from './TerminalStatusBar'

  function TerminalMode({ onBuildLightMode }) {
    const scrollRef = useRef(null)

    return (
      <div className="t-mode">
        {/* Scanline visual overlay — fixed, covers entire screen */}
        <div className="t-scanline" aria-hidden="true" />

        <TerminalChrome />
        <TerminalTabs scrollRef={scrollRef} />

        {/* Scrollable content — this div is the IntersectionObserver root */}
        <div className="t-scroll" ref={scrollRef}>
          {/* Hero is always visible — no scroll-reveal wrapper */}
          <TerminalHero />

          <TerminalSection id="about" scrollRef={scrollRef}>
            <TerminalAbout />
          </TerminalSection>

          <TerminalSection id="projects" scrollRef={scrollRef}>
            <TerminalProjects />
          </TerminalSection>

          <TerminalSection id="skills" scrollRef={scrollRef}>
            <TerminalSkills />
          </TerminalSection>

          <TerminalSection id="contact" scrollRef={scrollRef}>
            <TerminalContact />
          </TerminalSection>
        </div>

        <TerminalStatusBar onBuildLightMode={onBuildLightMode} />
      </div>
    )
  }

  export default TerminalMode
  ```

- [ ] **Step 12.2: Write full `_terminal.scss`**

  ```scss
  // client/src/styles/_terminal.scss
  @use './variables' as *;
  @use './mixins' as *;

  // === Layout ===
  .t-mode {
    background: $bg-dark;
    color: $green-primary;
    font-family: $font-mono;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .t-scanline {
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(0, 10, 0, 0.15) 3px,
      rgba(0, 10, 0, 0.15) 4px
    );
    pointer-events: none;
    z-index: 5;
  }

  // === Chrome ===
  .t-chrome {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background: #0d0d0b;
    border-bottom: 1px solid $green-dim;
    flex-shrink: 0;
    z-index: 2;
  }

  .t-chrome__dots {
    display: flex;
    gap: 6px;
  }

  .t-chrome__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    &--red    { background: #ff5f57; }
    &--yellow { background: #febc2e; }
    &--green  { background: #28c840; }
  }

  .t-chrome__title {
    font-size: 0.7rem;
    color: $green-dim;
    margin: 0 auto;
  }

  // === Tabs ===
  .t-tabs {
    display: flex;
    padding: 0 0.5rem;
    background: #060806;
    border-bottom: 1px solid $green-dim;
    flex-shrink: 0;
    z-index: 2;
  }

  .t-tabs__tab {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: $green-dim;
    font-family: $font-mono;
    font-size: 0.7rem;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    letter-spacing: 0.08em;
    transition: color 0.15s, border-color 0.15s;

    &:hover { color: $green-mid; }
    &--active {
      color: $green-primary;
      border-bottom-color: $green-primary;
    }
  }

  // === Scroll container ===
  .t-scroll {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-track { background: $bg-dark; }
    &::-webkit-scrollbar-thumb { background: $green-dim; border-radius: 2px; }
  }

  // === Section wrapper ===
  .t-section {
    @include scroll-reveal;
    padding: 3rem 2rem;
    border-top: 1px solid $green-dim;
  }

  .t-section__header {
    font-size: 0.75rem;
    color: $green-mid;
    letter-spacing: 0.1em;
    margin-bottom: 1.5rem;
    font-weight: normal;
  }

  // === Hero ===
  .t-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 60vh;
    border-bottom: 1px solid $green-dim;
  }

  .t-hero__left {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-right: 1px solid #1a2a0e;
  }

  .t-hero__ascii-name {
    font-size: 0.65rem;
    line-height: 1.2;
    color: $green-primary;
    white-space: pre;
    overflow: hidden;
  }

  .t-hero__identity {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .t-hero__kv {
    display: flex;
    gap: 1rem;
    font-size: 0.8rem;
  }

  .t-hero__key {
    color: $green-dim;
    min-width: 6rem;
    text-transform: uppercase;
    font-size: 0.7rem;
  }

  .t-hero__val {
    color: $green-primary;
    &--open { color: #5aff5a; }
  }

  .t-hero__prompt {
    font-size: 0.8rem;
    margin-top: auto;
  }

  .t-hero__prompt-text { color: $green-mid; }

  .t-hero__cursor {
    display: inline-block;
    width: 8px;
    height: 0.9em;
    background: $green-primary;
    vertical-align: text-bottom;
    margin-left: 2px;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .t-hero__right {
    background: #060806;
    overflow: hidden;
  }

  .t-hero__portrait {
    font-size: 0.3rem;
    line-height: 1.15;
    color: $green-portrait;
    white-space: pre;
    padding: 1rem;
    overflow: hidden;
  }

  // === About ===
  .t-about__bio {
    font-size: 0.85rem;
    line-height: 1.7;
    color: $green-mid;
    max-width: 60ch;
  }

  // === Projects ===
  .t-projects__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .t-project-card {
    border: 1px solid $green-dim;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: border-color 0.15s;
    &:hover { border-color: $green-mid; }
  }

  .t-project-card__number { font-size: 0.65rem; color: $green-dim; }
  .t-project-card__name   { font-size: 0.9rem; color: $green-primary; font-weight: 700; }
  .t-project-card__stack  { font-size: 0.65rem; color: $green-mid; }

  .t-project-card__desc {
    font-size: 0.75rem;
    color: $green-mid;
    line-height: 1.6;
    flex: 1;
  }

  .t-project-card__link {
    font-size: 0.75rem;
    color: $green-primary;
    margin-top: 0.5rem;
    transition: color 0.15s;
    &:hover { color: #ffffff; }
  }

  // === Skills ===
  .t-skills__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .t-skill-tag {
    border: 1px solid $green-dim;
    padding: 0.2rem 0.6rem;
    font-size: 0.7rem;
    color: $green-mid;
    transition: border-color 0.15s, color 0.15s;
    &:hover { border-color: $green-primary; color: $green-primary; }
  }

  // === Contact ===
  .t-contact__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .t-contact__item {
    border: 1px solid $green-dim;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    transition: border-color 0.15s;
    &:hover { border-color: $green-mid; }
  }

  .t-contact__label {
    font-size: 0.6rem;
    color: $green-dim;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .t-contact__value { font-size: 0.8rem; color: $green-primary; }

  .t-contact__resume {
    grid-column: 1 / -1;
    color: $green-primary;
    font-size: 0.85rem;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  // === Status Bar ===
  .t-status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.35rem 1rem;
    background: $green-dim;
    flex-shrink: 0;
    z-index: 2;
  }

  .t-status-bar__items {
    display: flex;
    gap: 1.5rem;
    font-size: 0.65rem;
    color: $bg-dark;
    opacity: 0.85;
  }

  .t-status-bar__item--online { opacity: 1; }

  .t-status-bar__build-btn {
    background: none;
    border: 1px solid $bg-dark;
    color: $bg-dark;
    font-family: $font-mono;
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    &:hover { background: $bg-dark; color: $green-primary; }
  }
  ```

- [ ] **Step 12.3: Visual check**

  ```bash
  cd client && npm run dev
  ```
  Open http://localhost:5173 → click DEVELOPER. Verify:
  - Dark background with scanline overlay
  - Chrome bar (traffic lights + title)
  - Tabs (SUMMARY · ABOUT · PROJECTS · SKILLS · CONTACT)
  - Hero: ASCII name left, portrait right
  - Scroll down — sections fade/slide in
  - Active tab updates as you scroll
  - Status bar: `[ BUILD LIGHT MODE ]` button
  Press Ctrl+C.

- [ ] **Step 12.4: Commit**

  ```bash
  git add client/src/components/terminal/ client/src/styles/_terminal.scss
  git commit -m "feat: terminal mode — full layout with chrome, tabs, hero, sections, status bar"
  ```

---

## Chunk 6: Build Transition

### Task 13: BuildTransition animation

**Files:**
- Modify: `client/src/components/BuildTransition.jsx`
- Modify: `client/src/styles/_build.scss`
- Create: `client/src/__tests__/BuildTransition.test.jsx`

- [ ] **Step 13.1: Write failing tests**

  Create `client/src/__tests__/BuildTransition.test.jsx`:
  ```jsx
  import { render, screen, act } from '@testing-library/react'
  import BuildTransition from '../components/BuildTransition'

  vi.useFakeTimers()

  afterEach(() => {
    vi.clearAllTimers()
  })

  test('calls onComplete after animation finishes (~3.5s)', () => {
    const onComplete = vi.fn()
    render(<BuildTransition onComplete={onComplete} />)
    act(() => { vi.advanceTimersByTime(5000) })
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  test('does not call onComplete before animation ends', () => {
    const onComplete = vi.fn()
    render(<BuildTransition onComplete={onComplete} />)
    act(() => { vi.advanceTimersByTime(500) })
    expect(onComplete).not.toHaveBeenCalled()
  })

  test('shows log lines as animation progresses', () => {
    const onComplete = vi.fn()
    render(<BuildTransition onComplete={onComplete} />)
    act(() => { vi.advanceTimersByTime(1000) })
    const lines = screen.getAllByRole('listitem')
    expect(lines.length).toBeGreaterThan(0)
  })
  ```

- [ ] **Step 13.2: Run tests to confirm they fail**

  ```bash
  cd client && npm test
  ```
  Expected: FAIL (stub component doesn't have the right behavior).

- [ ] **Step 13.3: Replace stub with real `BuildTransition.jsx`**

  ```jsx
  // client/src/components/BuildTransition.jsx
  // Plays a fake compile log + progress bar, then calls onComplete().
  // Total duration: ~3.5s.

  import { useState, useEffect } from 'react'

  const LOG_LINES = [
    '> Initializing build...',
    '> Compiling components...',
    '  ✓ EntryScreen.jsx',
    '  ✓ TerminalMode.jsx',
    '  ✓ LightMode.jsx',
    '> Processing assets...',
    '  ✓ Bundling SCSS → CSS',
    '  ✓ Optimizing images',
    '⚠ ASCII portrait replaced with actual face',
    '> Running final checks...',
    '  ✓ All systems nominal',
    '> Build complete. Switching to light mode...',
  ]

  const LINE_DELAY    = 260  // ms between log lines
  const FINISH_DELAY  = 400  // ms after last line before calling onComplete

  function BuildTransition({ onComplete }) {
    const [visibleLines, setVisibleLines] = useState([])
    const [progress, setProgress]         = useState(0)

    useEffect(() => {
      const timeouts = []

      LOG_LINES.forEach((line, i) => {
        const t = setTimeout(() => {
          setVisibleLines(prev => [...prev, line])
          setProgress(Math.round(((i + 1) / LOG_LINES.length) * 100))
        }, i * LINE_DELAY)
        timeouts.push(t)
      })

      const total = LOG_LINES.length * LINE_DELAY + FINISH_DELAY
      const done = setTimeout(onComplete, total)
      timeouts.push(done)

      return () => timeouts.forEach(clearTimeout)
    }, [onComplete])

    return (
      <div className="b-screen">
        <div className="b-window">
          <div className="b-header">
            <span className="b-header__title">Building light mode...</span>
          </div>
          <ol className="b-log" aria-live="polite">
            {visibleLines.map((line, i) => (
              <li key={i} className="b-log__line">{line}</li>
            ))}
          </ol>
          <div className="b-progress-track">
            <div className="b-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="b-progress-label">{progress}%</div>
        </div>
      </div>
    )
  }

  export default BuildTransition
  ```

- [ ] **Step 13.4: Run tests to confirm they pass**

  ```bash
  cd client && npm test
  ```
  Expected: all BuildTransition tests pass.

- [ ] **Step 13.5: Write `_build.scss`**

  ```scss
  // client/src/styles/_build.scss
  @use './variables' as *;

  .b-screen {
    background: $bg-dark;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-family: $font-mono;
  }

  .b-window {
    width: min(600px, 90vw);
    border: 1px solid $green-dim;
    padding: 1.5rem;
    background: #060806;
  }

  .b-header {
    border-bottom: 1px solid $green-dim;
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
  }

  .b-header__title {
    font-size: 0.75rem;
    color: $green-mid;
    letter-spacing: 0.05em;
  }

  .b-log {
    list-style: none;
    min-height: 14rem;
    overflow: hidden;
  }

  .b-log__line {
    font-size: 0.75rem;
    color: $green-mid;
    line-height: 1.8;
    animation: b-fadein 0.2s ease;

    &:last-child { color: $green-primary; }
  }

  @keyframes b-fadein {
    from { opacity: 0; transform: translateX(-4px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .b-progress-track {
    height: 4px;
    background: $green-dim;
    margin-top: 1.5rem;
    border-radius: 2px;
    overflow: hidden;
  }

  .b-progress-bar {
    height: 100%;
    background: $green-primary;
    transition: width 0.25s linear;
    box-shadow: 0 0 8px rgba(184, 255, 110, 0.4);
  }

  .b-progress-label {
    font-size: 0.65rem;
    color: $green-dim;
    margin-top: 0.4rem;
    text-align: right;
  }
  ```

- [ ] **Step 13.6: Visual check**

  ```bash
  cd client && npm run dev
  ```
  Open http://localhost:5173 → DEVELOPER → click `[ BUILD LIGHT MODE ]`. Verify:
  - Dark screen with build window
  - Log lines appear one by one
  - Progress bar fills from left to right
  - After ~3.5s, light mode appears (stub for now)
  Press Ctrl+C.

- [ ] **Step 13.7: Commit**

  ```bash
  git add client/src/components/BuildTransition.jsx client/src/styles/_build.scss client/src/__tests__/BuildTransition.test.jsx
  git commit -m "feat: BuildTransition with sequential log lines and progress bar"
  ```

---

## Chunk 7: Light Mode

### Task 14: LightNav

**Files:**
- Modify: `client/src/components/light/LightNav.jsx`

- [ ] **Step 14.1: Create `LightNav.jsx`**

  ```jsx
  // client/src/components/light/LightNav.jsx
  import { contact } from '../../data/content'

  function LightNav({ onGoTerminal, scrollRef }) {
    function scrollTo(id) {
      const container = scrollRef?.current
      const target = container?.querySelector(`[data-section="${id}"]`)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
      <nav className="l-nav">
        <div className="l-nav__logo">MC.</div>
        <div className="l-nav__links">
          <button className="l-nav__link" onClick={() => scrollTo('work')}>Work</button>
          <button className="l-nav__link" onClick={() => scrollTo('skills')}>Skills</button>
          <button className="l-nav__link" onClick={() => scrollTo('contact')}>Contact</button>
          <a href={contact.resumeUrl} download className="l-nav__link l-nav__link--resume">↓ Resume</a>
          <button className="l-nav__terminal-btn" onClick={onGoTerminal}>⌨ Terminal</button>
        </div>
      </nav>
    )
  }
  export default LightNav
  ```

---

### Task 15: LightHero

**Files:**
- Modify: `client/src/components/light/LightHero.jsx`

- [ ] **Step 15.1: Create `LightHero.jsx`**

  ```jsx
  // client/src/components/light/LightHero.jsx
  // Two-column layout: editorial name/bio on left, real photo on right.
  // The botanical ASCII tree is decorative — ghosted in background at low opacity.
  // If photo.jpg is not yet in client/public/, the image hides itself gracefully.

  import { bio } from '../../data/content'

  const BOTANICAL = `        *
       /|\\
      / | \\
   /  |  \\
    *   |   *
   /|\\  |  /|\\
  / | \\ | / | \\
 /  |  \\|/  |  \\
    |||||||
    |||||||`

  function LightHero() {
    return (
      <div className="l-hero" data-section="hero">
        <div className="l-hero__left">
          <pre className="l-hero__botanical" aria-hidden="true">{BOTANICAL}</pre>
          <div className="l-hero__eyebrow">Software Engineer · Toronto · 2025</div>
          <h1 className="l-hero__name">
            MICHAEL<br />
            <span className="l-hero__name--accent">CORRADO</span>
          </h1>
          <p className="l-hero__bio">{bio}</p>
          <div className="l-hero__chips">
            {['React', 'Node.js', 'Express', 'MySQL', 'TypeScript'].map(s => (
              <span key={s} className="l-hero__chip">{s}</span>
            ))}
          </div>
        </div>
        <div className="l-hero__right">
          <img
            src="/photo.jpg"
            alt="Michael Corrado"
            className="l-hero__photo"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="l-hero__halftone" aria-hidden="true" />
          <div className="l-hero__name-tag">
            <div className="l-hero__name-tag-name">Michael Corrado</div>
            <div className="l-hero__name-tag-title">Software Engineer</div>
          </div>
        </div>
      </div>
    )
  }
  export default LightHero
  ```

---

### Task 16: LightSection + content sections + footer

**Files:**
- Modify: `client/src/components/light/LightSection.jsx`
- Modify: `client/src/components/light/LightProjects.jsx`
- Modify: `client/src/components/light/LightSkills.jsx`
- Modify: `client/src/components/light/LightContact.jsx`
- Modify: `client/src/components/light/LightFooter.jsx`
- Create: `client/src/__tests__/LightProjects.test.jsx`

- [ ] **Step 16.1: Write failing test for LightProjects liveUrl fallback**

  Create `client/src/__tests__/LightProjects.test.jsx`:
  ```jsx
  import { render, screen } from '@testing-library/react'
  import LightProjects from '../components/light/LightProjects'

  const mockProjects = [
    { id: 'a', name: 'Live', stack: ['React'], description: 'desc', githubUrl: 'https://github.com/a', liveUrl: 'https://example.com', featured: true },
    { id: 'b', name: 'NoLive', stack: ['Node'], description: 'desc', githubUrl: 'https://github.com/b', liveUrl: null, featured: true },
  ]

  test('shows "View project →" when liveUrl is present', () => {
    render(<LightProjects projects={mockProjects} />)
    expect(screen.getByText('View project →')).toBeInTheDocument()
  })

  test('shows "View on GitHub →" when liveUrl is null', () => {
    render(<LightProjects projects={mockProjects} />)
    expect(screen.getByText('View on GitHub →')).toBeInTheDocument()
  })
  ```

- [ ] **Step 16.2: Run test to confirm it fails**

  ```bash
  cd client && npm test
  ```
  Expected: FAIL — `Cannot find module '../components/light/LightProjects'`

- [ ] **Step 16.3: Create `LightSection.jsx`**

  ```jsx
  // client/src/components/light/LightSection.jsx
  // Same IntersectionObserver scroll-reveal pattern as TerminalSection,
  // but root is .l-scroll and adds .visible class for l-section CSS animation.
  import { useRef, useEffect } from 'react'

  function LightSection({ id, scrollRef, children }) {
    const sectionRef = useRef(null)

    useEffect(() => {
      const container = scrollRef?.current
      const el = sectionRef.current
      if (!container || !el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('visible')
            observer.disconnect()
          }
        },
        { root: container, threshold: 0.08 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    }, [scrollRef])

    return (
      <section ref={sectionRef} className="l-section" data-section={id}>
        {children}
      </section>
    )
  }
  export default LightSection
  ```

- [ ] **Step 16.4: Create `LightProjects.jsx`**

  ```jsx
  import { projects as defaultProjects } from '../../data/content'

  function LightProjects({ projects = defaultProjects }) {
    return (
      <div className="l-projects">
        <h2 className="l-section__title">Selected Work</h2>
        <div className="l-projects__grid">
          {projects.map(project => (
            <div key={project.id} className="l-project-card">
              <div className="l-project-card__header">
                <h3 className="l-project-card__name">{project.name}</h3>
                <div className="l-project-card__stack">{project.stack.join(' · ')}</div>
              </div>
              <p className="l-project-card__desc">{project.description}</p>
              <a
                href={project.liveUrl ?? project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="l-project-card__link"
              >
                {project.liveUrl ? 'View project →' : 'View on GitHub →'}
              </a>
            </div>
          ))}
        </div>
      </div>
    )
  }
  export default LightProjects
  ```

- [ ] **Step 16.5: Create `LightSkills.jsx`**

  ```jsx
  import { skills } from '../../data/content'

  function LightSkills() {
    return (
      <div className="l-skills">
        <h2 className="l-section__title">Skills</h2>
        <div className="l-skills__grid">
          {skills.map(skill => (
            <span key={skill} className="l-skill-pill">{skill}</span>
          ))}
        </div>
      </div>
    )
  }
  export default LightSkills
  ```

- [ ] **Step 16.6: Create `LightContact.jsx`**

  ```jsx
  import { contact } from '../../data/content'

  function LightContact() {
    return (
      <div className="l-contact">
        <h2 className="l-section__title">Get In Touch</h2>
        <div className="l-contact__grid">
          <a href={`mailto:${contact.email}`} className="l-contact__item">
            <div className="l-contact__label">Email</div>
            <div className="l-contact__value">{contact.email}</div>
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="l-contact__item">
            <div className="l-contact__label">LinkedIn</div>
            <div className="l-contact__value">linkedin.com/in/michaelcorrado</div>
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="l-contact__item">
            <div className="l-contact__label">GitHub</div>
            <div className="l-contact__value">github.com/michaelcorrado</div>
          </a>
          <div className="l-contact__item">
            <div className="l-contact__label">Location</div>
            <div className="l-contact__value">{contact.location}</div>
          </div>
          <a href={contact.resumeUrl} download className="l-contact__item l-contact__resume">
            ↓ Download Resume
          </a>
        </div>
      </div>
    )
  }
  export default LightContact
  ```

- [ ] **Step 16.7: Create `LightFooter.jsx`**

  ```jsx
  function LightFooter() {
    return (
      <footer className="l-footer">
        <div className="l-footer__logo">MC.</div>
        <p className="l-footer__tagline">Building things that work and look good doing it.</p>
        <p className="l-footer__built">Built with React</p>
      </footer>
    )
  }
  export default LightFooter
  ```

- [ ] **Step 16.8: Run tests to confirm they pass**

  ```bash
  cd client && npm test
  ```
  Expected: all tests pass.

---

### Task 17: LightMode layout shell + all light SCSS

**Files:**
- Modify: `client/src/components/light/LightMode.jsx`
- Modify: `client/src/styles/_light.scss`

- [ ] **Step 17.1: Replace stub with real `LightMode.jsx`**

  ```jsx
  // client/src/components/light/LightMode.jsx
  import { useRef } from 'react'
  import LightNav from './LightNav'
  import LightHero from './LightHero'
  import LightSection from './LightSection'
  import LightProjects from './LightProjects'
  import LightSkills from './LightSkills'
  import LightContact from './LightContact'
  import LightFooter from './LightFooter'

  const PLANT_DIVIDER = '  * \\|/ ^^^  * \\|/ ^^^  * \\|/ ^^^  * \\|/ ^^^  * \\|/ ^^^'

  function LightMode({ onGoTerminal }) {
    const scrollRef = useRef(null)

    return (
      <div className="l-mode">
        <LightNav onGoTerminal={onGoTerminal} scrollRef={scrollRef} />
        <div className="l-scroll" ref={scrollRef}>
          <LightHero />

          <pre className="l-plant-divider" aria-hidden="true">{PLANT_DIVIDER}</pre>

          <LightSection id="work" scrollRef={scrollRef}>
            <LightProjects />
          </LightSection>

          <pre className="l-plant-divider" aria-hidden="true">{PLANT_DIVIDER}</pre>

          <LightSection id="skills" scrollRef={scrollRef}>
            <LightSkills />
          </LightSection>

          <pre className="l-plant-divider" aria-hidden="true">{PLANT_DIVIDER}</pre>

          <LightSection id="contact" scrollRef={scrollRef}>
            <LightContact />
          </LightSection>

          <LightFooter />
        </div>
      </div>
    )
  }
  export default LightMode
  ```

- [ ] **Step 17.2: Write full `_light.scss`**

  ```scss
  // client/src/styles/_light.scss
  @use './variables' as *;
  @use './mixins' as *;

  // === Layout ===
  .l-mode {
    background: $bg-light;
    color: $text-body;
    font-family: $font-sans;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .l-scroll {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;

    &::-webkit-scrollbar { width: 6px; }
    &::-webkit-scrollbar-track { background: $bg-light; }
    &::-webkit-scrollbar-thumb { background: $border-light; border-radius: 3px; }
  }

  // === Section wrapper ===
  .l-section {
    @include scroll-reveal;
    padding: 5rem 4rem;
  }

  .l-section__title {
    font-family: $font-serif;
    font-size: 2rem;
    color: $olive-dark;
    margin-bottom: 2rem;
    font-weight: 700;
  }

  // === Plant divider ===
  .l-plant-divider {
    text-align: center;
    font-family: $font-mono;
    font-size: 0.7rem;
    color: rgba(58, 74, 30, 0.25);
    padding: 1rem 0;
    user-select: none;
    pointer-events: none;
    letter-spacing: 0.2em;
  }

  // === Nav ===
  .l-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background: $bg-light;
    border-bottom: 1px solid $border-light;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .l-nav__logo {
    font-family: $font-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: $olive-dark;
  }

  .l-nav__links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .l-nav__link {
    background: none;
    border: none;
    font-family: $font-sans;
    font-size: 0.9rem;
    color: $text-body;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.15s;
    &:hover { color: $olive-dark; }

    &--resume {
      color: $green-accent;
      font-weight: 600;
    }
  }

  .l-nav__terminal-btn {
    background: $olive-dark;
    border: none;
    color: $bg-light;
    font-family: $font-mono;
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    transition: opacity 0.15s;
    &:hover { opacity: 0.85; }
  }

  // === Hero ===
  .l-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 90vh;
  }

  .l-hero__left {
    padding: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    border-right: 2px solid $olive-dark;
    position: relative;
    overflow: hidden;
  }

  .l-hero__botanical {
    position: absolute;
    top: 10%;
    right: -1rem;
    font-size: 0.9rem;
    color: rgba(58, 74, 30, 0.08);
    pointer-events: none;
    user-select: none;
    line-height: 1.4;
  }

  .l-hero__eyebrow {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: $text-muted;
    font-weight: 600;
  }

  .l-hero__name {
    font-family: $font-serif;
    font-size: clamp(3rem, 7vw, 6rem);
    font-weight: 700;
    color: $olive-dark;
    line-height: 0.95;

    &--accent { color: $green-accent; }
  }

  .l-hero__bio {
    font-size: 1rem;
    line-height: 1.7;
    color: $text-body;
    max-width: 48ch;
  }

  .l-hero__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .l-hero__chip {
    border: 1px solid $olive-dark;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    color: $olive-dark;
    cursor: default;
    transition: background 0.15s, color 0.15s;
    &:hover { background: $olive-dark; color: $bg-light; }
  }

  .l-hero__right {
    background: $green-accent;
    position: relative;
    overflow: hidden;
  }

  .l-hero__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .l-hero__halftone {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px);
    background-size: 8px 8px;
    pointer-events: none;
  }

  .l-hero__name-tag {
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;
    background: $bg-light;
    padding: 0.5rem 1rem;
  }

  .l-hero__name-tag-name {
    font-family: $font-serif;
    font-size: 0.9rem;
    color: $olive-dark;
    font-weight: 700;
  }

  .l-hero__name-tag-title {
    font-size: 0.7rem;
    color: $text-muted;
  }

  // === Projects ===
  .l-projects__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .l-project-card {
    border-bottom: 2px solid $olive-dark;
    padding: 1.5rem;
    background: $card-bg;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(58, 74, 30, 0.12);
    }
  }

  .l-project-card__header {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .l-project-card__name {
    font-family: $font-serif;
    font-size: 1.2rem;
    color: $olive-dark;
    font-weight: 700;
  }

  .l-project-card__stack { font-size: 0.7rem; color: $text-muted; }

  .l-project-card__desc {
    font-size: 0.875rem;
    line-height: 1.7;
    color: $text-body;
    flex: 1;
  }

  .l-project-card__link {
    font-size: 0.8rem;
    color: $green-accent;
    font-weight: 600;
    transition: color 0.15s;
    &:hover { color: #1a8a3a; }
  }

  // === Skills ===
  .l-skills__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .l-skill-pill {
    border: 1px solid $border-light;
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
    color: $text-body;
    background: $card-bg;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    cursor: default;
    &:hover { background: $olive-dark; color: $bg-light; border-color: $olive-dark; }
  }

  // === Contact ===
  .l-contact__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .l-contact__item {
    border-left: 3px solid $green-accent;
    padding: 1rem 1.25rem;
    background: $card-bg;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    transition: background 0.15s;
    &:hover { background: #e3ddd0; }
  }

  .l-contact__label {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: $text-muted;
    font-weight: 700;
  }

  .l-contact__value { font-size: 0.875rem; color: $olive-dark; }

  .l-contact__resume {
    grid-column: 1 / -1;
    color: $green-accent;
    font-weight: 600;
    font-size: 0.9rem;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  // === Footer ===
  .l-footer {
    background: $olive-dark;
    color: $bg-light;
    padding: 3rem 4rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .l-footer__logo   { font-family: $font-serif; font-size: 2rem; font-weight: 700; }
  .l-footer__tagline { font-size: 0.9rem; opacity: 0.7; }
  .l-footer__built   { font-size: 0.75rem; opacity: 0.4; font-family: $font-mono; }
  ```

- [ ] **Step 17.3: Visual check**

  ```bash
  cd client && npm run dev
  ```
  Open http://localhost:5173 → click RECRUITER. Verify:
  - Cream background, sticky olive nav with `MC.` logo
  - Two-column hero: large MICHAEL/CORRADO name (green accent), green right panel
  - Scrollable sections: Selected Work, Skills, Get In Touch, footer
  - Plant dividers between sections (muted olive)
  - `⌨ Terminal` button returns to terminal
  - Scroll-reveal animations on section entry
  Press Ctrl+C.

- [ ] **Step 17.4: Run full test suite**

  ```bash
  cd client && npm test
  ```
  Expected: all tests pass.

- [ ] **Step 17.5: Commit**

  ```bash
  git add client/src/components/light/ client/src/styles/_light.scss client/src/__tests__/LightProjects.test.jsx
  git commit -m "feat: light mode — nav, hero, sections, footer, SCSS"
  ```

---

## Chunk 8: Express Backend

### Task 18: Express server with analytics endpoints

**Files:**
- Create: `server/server.js`
- Create: `server/data.json`
- Create: `server/package.json`

- [ ] **Step 18.1: Initialize server**

  ```bash
  mkdir server
  cd server && npm init -y
  npm install express
  cd ..
  ```

- [ ] **Step 18.2: Create `server/data.json`**

  ```json
  {
    "developer": 0,
    "recruiter": 0
  }
  ```

- [ ] **Step 18.3: Write `server/server.js`**

  ```js
  // server/server.js
  // Express server — analytics stub endpoints + serves Vite /dist in production.

  const express = require('express')
  const path    = require('path')
  const fs      = require('fs')

  const app       = express()
  const PORT      = process.env.PORT || 3001
  const DATA_FILE = path.join(__dirname, 'data.json')

  app.use(express.json())

  // POST /api/visit/:type — increment developer or recruiter counter
  app.post('/api/visit/:type', (req, res) => {
    const { type } = req.params
    if (type !== 'developer' && type !== 'recruiter') {
      return res.status(400).json({ error: 'type must be developer or recruiter' })
    }
    try {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
      data[type] = (data[type] || 0) + 1
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
      res.json({ ok: true, [type]: data[type] })
    } catch (err) {
      res.status(500).json({ error: 'Failed to update counter' })
    }
  })

  // GET /api/stats?secret=<SECRET> — returns counters (protected by secret param)
  app.get('/api/stats', (req, res) => {
    if (req.query.secret !== process.env.STATS_SECRET) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    try {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
      res.json(data)
    } catch (err) {
      res.status(500).json({ error: 'Failed to read stats' })
    }
  })

  // Serve React app in production (Express serves Vite's built output)
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, '..', 'client', 'dist')
    app.use(express.static(distPath))
    // Catch-all for SPA routing — always return index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'))
    })
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  ```

- [ ] **Step 18.4: Verify server starts**

  ```bash
  cd server && node server.js
  ```
  Expected: `Server running on port 3001`. Press Ctrl+C.

- [ ] **Step 18.5: Test analytics endpoint manually**

  In a second terminal (with server still running from step above):
  ```bash
  curl -X POST http://localhost:3001/api/visit/developer
  # Expected: {"ok":true,"developer":1}

  curl -X POST http://localhost:3001/api/visit/recruiter
  # Expected: {"ok":true,"recruiter":1}
  ```
  Stop the server (Ctrl+C in the first terminal).

- [ ] **Step 18.6: Commit**

  ```bash
  cd .. && git add server/
  git commit -m "feat: Express server with analytics endpoints and production static serving"
  ```

---

## Chunk 9: Railway Deployment

### Task 19: Root build scripts + production config

**Files:**
- Create: `package.json` (root)
- Create: `.gitignore`

- [ ] **Step 19.1: Create root `package.json`**

  ```json
  {
    "name": "portfolio",
    "version": "1.0.0",
    "scripts": {
      "build":      "cd client && npm install && npm run build && cd ../server && npm install",
      "start":      "NODE_ENV=production node server/server.js",
      "dev:client": "cd client && npm run dev",
      "dev:server": "node server/server.js"
    },
    "engines": {
      "node": ">=18.0.0"
    }
  }
  ```

- [ ] **Step 19.2: Create `.gitignore` (if not present)**

  ```
  node_modules/
  client/dist/
  client/node_modules/
  server/node_modules/
  .env
  ```

- [ ] **Step 19.3: Test production build locally**

  ```bash
  npm run build
  ```
  Expected: `client/dist/` folder created with built React app.

  Then verify Express serves it:
  ```bash
  NODE_ENV=production node server/server.js &
  curl http://localhost:3001
  # Expected: HTML content starting with <!DOCTYPE html>
  kill %1
  ```

- [ ] **Step 19.4: Commit**

  ```bash
  git add package.json .gitignore
  git commit -m "feat: root build scripts for Railway deployment"
  ```

- [ ] **Step 19.5: Deploy to Railway**

  1. Push this repo to GitHub
  2. Go to railway.app → New Project → Deploy from GitHub repo
  3. Railway auto-detects Node.js and runs `npm run build` then `npm start`
  4. Under Variables, add: `STATS_SECRET=<choose a secret string>`
  5. Under Domains, add a custom domain (or use the auto-generated Railway URL)

  Expected: portfolio live at your Railway URL.

---

## Post-Launch Checklist

Before sharing the portfolio URL, update these TODOs in `client/src/data/content.js`:
- [ ] Replace `michael@example.com` with real email
- [ ] Update `githubUrl` for InStock project with real repo URL
- [ ] Update `github` and `linkedin` in `contact` with real profile URLs
- [ ] Add `client/public/resume.pdf` (resume file)
- [ ] Add `client/public/photo.jpg` (real photo for light mode hero)
- [ ] Paste ASCII art from `mock.html` into `client/src/assets/portrait.js`
- [ ] Set `STATS_SECRET` environment variable in Railway dashboard
