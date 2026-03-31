# Blog Modal Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the blog side-panel modal with a fullscreen overlay that supports markdown content, optional looping background video with green-tinted CRT scanline effects.

**Architecture:** The modal becomes a fullscreen overlay with centered content column. Blog post data gains an optional `video` field. The body string is rendered through `react-markdown` instead of plain text splitting. Video plays behind the text as a fixed background with the site's signature green filter and scanline overlay.

**Tech Stack:** React, TypeScript, react-markdown, SCSS

---

## File Map

- **Modify:** `client/src/data/content.ts` - Add `video` field and void.mp4 import
- **Modify:** `client/src/components/terminal/TerminalBlog.tsx` - Fullscreen modal, video background, markdown rendering
- **Modify:** `client/src/styles/_terminal.scss` - Restyle modal from side-panel to fullscreen overlay with video background styles
- **Existing (no change):** `client/src/assets/void.mp4` - Video file already in place
- **Cleanup:** `client/src/assets/blog-modal-preview.html` - Delete preview file after implementation

---

### Task 1: Install react-markdown

- [ ] **Step 1: Install the dependency**

```bash
cd client && npm install react-markdown
```

- [ ] **Step 2: Verify it installed**

```bash
cat client/package.json | grep react-markdown
```

Expected: `"react-markdown": "^X.X.X"` appears in dependencies.

- [ ] **Step 3: Commit**

```bash
git add client/package.json client/package-lock.json
git commit -m "deps: add react-markdown for blog post rendering"
```

---

### Task 2: Add video field to blog post data

**Files:**
- Modify: `client/src/data/content.ts:1-104`

- [ ] **Step 1: Add the void.mp4 import at the top of content.ts**

Add this line after the existing asset imports (after line 6):

```typescript
import voidVideo from '../assets/void.mp4'
```

- [ ] **Step 2: Add the `video` field to the blog post**

Update the blog post object to include the video field. Change the object to:

```typescript
{
    id: 'life',
    title: 'hello world',
    date: '2026-03-30',
    tags: ['the void', 'technology'],
    preview: 'The world is crazy, but so are we.',
    video: voidVideo,
    body: "Growing up around technology...", // (existing body unchanged)
},
```

Only the `video: voidVideo,` line is new. The rest stays the same.

- [ ] **Step 3: Commit**

```bash
git add client/src/data/content.ts
git commit -m "feat(blog): add video field to blog post data"
```

---

### Task 3: Restyle the modal from side-panel to fullscreen overlay

**Files:**
- Modify: `client/src/styles/_terminal.scss:691-800`

- [ ] **Step 1: Replace the modal overlay styles**

Replace `.t-blog__modal-overlay` (line 691-699) with:

```scss
.t-blog__modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow-y: auto;
    animation: blog-overlay-in 0.3s ease;
}
```

Key changes: `justify-content` goes from `flex-end` (right-aligned panel) to `center`. Added `align-items: flex-start` and `overflow-y: auto` so the content scrolls within the overlay.

- [ ] **Step 2: Replace the modal container styles**

Replace `.t-blog__modal` (line 701-717) with:

```scss
.t-blog__modal {
    width: min(800px, 90vw);
    min-height: 100vh;
    background: $bg-dark;
    padding: 3rem 2rem;
    font-family: $font-mono;
    position: relative;
    overflow: hidden;
    animation: blog-fade-in 0.4s ease;
}
```

Key changes: Width up to 800px, no border-left, centered layout, no side-panel slide animation. The `--fullscreen` modifier is no longer needed (the modal is always fullscreen now).

- [ ] **Step 3: Remove the fullscreen modifier**

Delete the `&--fullscreen` block that was inside `.t-blog__modal`. It's no longer needed.

- [ ] **Step 4: Add background video styles**

Add these new rules after `.t-blog__modal`:

```scss
// background video — loops behind blog post text
.t-blog__modal-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.45) saturate(0.7) sepia(0.15) hue-rotate(70deg);
    z-index: 0;
    pointer-events: none;
}

// CRT scanlines over video
.t-blog__modal-scanlines {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.12) 2px,
        rgba(0, 0, 0, 0.12) 4px
    );
    pointer-events: none;
    z-index: 1;
}
```

- [ ] **Step 5: Update content z-index and text shadows**

Update `.t-blog__modal-header`, `.t-blog__modal-title`, `.t-blog__modal-tags`, and `.t-blog__modal-body` to sit above the video. Add `position: relative; z-index: 2;` to each of these rules.

Add text shadow to `.t-blog__modal-body`:

```scss
.t-blog__modal-body {
    color: $green-mid;
    font-size: 0.85rem;
    line-height: 1.8;
    padding-bottom: 2rem;
    animation: blog-content-in 0.4s ease 0.35s both;
    position: relative;
    z-index: 2;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);

    p {
        margin-bottom: 1.25rem;
    }
}
```

Update `.t-blog__modal-title` to add stronger text shadow for readability over video:

```scss
.t-blog__modal-title {
    font-size: 1.3rem;
    color: $green-primary;
    text-shadow: 0 0 12px rgba($green-primary, 0.5), 0 0 20px rgba(0, 0, 0, 0.8);
    margin-bottom: 0.75rem;
    animation: blog-content-in 0.4s ease 0.15s both;
    position: relative;
    z-index: 2;
}
```

- [ ] **Step 6: Replace the slide-in animation with a fade-in**

Replace `@keyframes blog-slide-in` with:

```scss
@keyframes blog-fade-in {
    from { opacity: 0; transform: scale(0.98); }
    to   { opacity: 1; transform: scale(1); }
}
```

- [ ] **Step 7: Update mobile styles if any exist for the fullscreen modifier**

Find and remove any `t-blog__modal--fullscreen` references in the mobile/responsive section of the file (around line 1121). This modifier no longer exists.

- [ ] **Step 8: Commit**

```bash
git add client/src/styles/_terminal.scss
git commit -m "feat(blog): restyle modal as fullscreen overlay with video background"
```

---

### Task 4: Update TerminalBlog.tsx component

**Files:**
- Modify: `client/src/components/terminal/TerminalBlog.tsx`

- [ ] **Step 1: Add react-markdown import**

Add at the top of the file:

```typescript
import Markdown from 'react-markdown'
```

- [ ] **Step 2: Remove fullscreen state**

Delete the `fullscreen` state and its references since the modal is always fullscreen now:
- Remove: `const [fullscreen, setFullscreen] = useState(false)`
- Remove: `setFullscreen(false)` from `closeModal`
- Remove the fullscreen class toggle from the modal div's className (just use `"t-blog__modal"`)
- Remove the fullscreen toggle button from modal-actions

- [ ] **Step 3: Add background video element**

Inside the modal div (right after the opening `<div className="t-blog__modal">`), add the video and scanline overlay. These render conditionally only when the post has a video:

```tsx
{selectedPost.video && (
    <>
        <video
            className="t-blog__modal-video"
            src={selectedPost.video}
            autoPlay
            loop
            muted
            playsInline
        />
        <div className="t-blog__modal-scanlines" />
    </>
)}
```

- [ ] **Step 4: Replace plain text body with Markdown renderer**

Replace the body rendering block:

```tsx
{/* old */}
<div className="t-blog__modal-body">
    {selectedPost.body.split('\n\n').map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
    ))}
</div>
```

With:

```tsx
{/* new */}
<div className="t-blog__modal-body">
    <Markdown>{selectedPost.body}</Markdown>
</div>
```

- [ ] **Step 5: Commit**

```bash
git add client/src/components/terminal/TerminalBlog.tsx
git commit -m "feat(blog): fullscreen modal with video background and markdown rendering"
```

---

### Task 5: Cleanup and verify

- [ ] **Step 1: Delete the preview HTML file**

```bash
rm client/src/assets/blog-modal-preview.html
```

- [ ] **Step 2: Run the dev server and verify visually**

```bash
cd client && npm run dev
```

Open the site, click the blog post, and verify:
- Modal opens as a fullscreen centered overlay (not a side panel)
- void.mp4 plays behind the text, looping, muted, green-tinted with scanlines
- Text is readable over the video
- Close button works, Escape key works
- Blog post body renders with proper paragraph spacing

- [ ] **Step 3: Run the build to make sure nothing breaks**

```bash
cd client && npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 4: Commit cleanup**

```bash
git add -A
git commit -m "chore: remove blog modal preview file"
```
