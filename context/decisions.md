# context/decisions.md — design and build decisions

Ongoing log. Add to this before revisiting any completed section. Purpose: stop future sessions from re-litigating settled choices.

---

## Session 4 — About enrichment: logos + credential (2026-09-17)

### Logos: SVG text marks, color baked in, no filter

Chose SVG text-based wordmarks over icon paths — icon-quality paths from memory risk brand inaccuracy; text marks are legible and accurate at 20px. Stored in `public/logos/` (Vite serves public/ at root, no bundler processing). Color `#A8A096` (--text-muted) baked directly into each SVG file rather than using CSS filter (`brightness(0) invert(1)`) — simpler, exact match, no filter chain to maintain. Site is dark by design (no light mode), so baking the dark-palette color is appropriate for now.

Bristol deliberately uses serif (`Georgia,'Times New Roman',serif`) vs the sans-serif used for corporate entries — a quiet typographic signal that it is an academic institution, not a company. One detail that reads correctly without a label explaining it.

If official brand SVGs are ever added, they should replace these files in place. The CSS only needs `height: 13px; width: auto;` — no filter changes required if the replacement SVGs also bake the right color.

### Logo placement: left of org text, flex-end aligned as a unit

`traj-org` changed to `display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem` so the logo + org text pair right-aligns as a unit on desktop. On mobile (2-column layout, row 2), changed to `justify-content: flex-start` — logo appears before the text, left-aligned, which is correct reading order.

The logo `height: 13px` is set optically — flush with the cap-height of the `--step--1` org text rather than a round 20px. At 13px the marks sit visually on the same baseline without overpowering the adjacent text.

### Credential: single text line, --text-faint, no decoration

`<p class="about-credential">GARP Responsible AI (RAI)</p>` below the trajectory strip. --step--1, --text-faint — below the muted body text on the scale. No label prefix ("Certification:"), no badge styling, no date. GARP RAI is self-explanatory to the target audience (AI/fintech technical peers). Adding a label would make it read like a CV line; the bare name reads as a known quantity for those who recognise it.

### What was considered and rejected

- Icon marks (geometric paths) for logos — risk inaccuracy; text marks are more reliable from memory at this size
- CSS filter approach for monochrome — added complexity; baked color is simpler and exact
- Putting the credential inside the trajectory strip — it's not a career position; separate placement keeps the timeline structure clean
- Adding a "Certifications" section label — one item doesn't warrant a section; would read as CV scaffolding

---

## Session 3 — Craft / atmosphere pass (2026-09-17)

### Film grain: SVG feTurbulence via body::after

Static grain overlay via `body::after` with a `data:` SVG using `feTurbulence` (fractalNoise, 0.72 baseFrequency, 4 octaves, `stitchTiles='stitch'`). Tiled at 180×180px, `opacity: 0.035` — below conscious threshold; adds perceived depth. No JavaScript, no motion. `prefers-reduced-motion` not relevant here — grain is static texture, not animation.

`z-index: 990` ensures it sits above all content but below no element (the cursor dot at 9999 still shows through correctly since it's a real DOM element).

### Ambient drift: fixed .bg-ambient, CSS animation only

Two faint radial gradients (warm amber at bottom-left, faint parchment at top-right) drifting 4%/3% over 28s via CSS keyframe. Opacity so low (0.022/0.007) the drift is felt not seen — pure atmosphere, not a feature. `position: fixed`, oversized to 140% to prevent edge-reveal. `animation: none` under `prefers-reduced-motion`. No JS involved.

Replaced the `::before` pseudo-element on `.hero` with a real `.hero-bg-parallax` div — pseudo-elements can't be GSAP targets. The global `.bg-ambient` handles overall page warmth; the hero div handles the GSAP parallax layer specific to the hero.

### Custom cursor: 6px amber dot, GSAP lag

Touch-first progressive enhancement: `(hover: none)` matchMedia check — cursor activates only on pointer devices. `body.has-custom-cursor` class gates `cursor: none` on body, anchors, and buttons. On pointer devices only: 6px circular dot in `--accent`, z-index 9999. GSAP `duration: 0.38, ease: power2.out` creates organic lag. Scale 2.4× on hover over `a`/`button` elements. Cleaned up on unmount.

Cursor was the one element at risk of being decorative. Justified: it reinforces the precision-craft read and correctly hides native cursor only when active.

### Hero parallax: .hero-bg-parallax drifts yPercent 0→10 on scroll

GSAP `fromTo` with `scrub: 1.5` on ScrollTrigger (trigger: hero section, start: top top, end: bottom top). The parallax element is oversized (`inset: -10%`, 120%) so parallax movement never reveals edges. Movement is slow and small — content never shifts, only the background warmth.

### CustomEase 'brand' matches CSS --ease token exactly

`CustomEase.create('brand', '0.22, 1, 0.36, 1')` — identical cubic-bezier values to `--ease` token. Both the load timeline and any GSAP ScrollTrigger motion use the same easing curve. Visual consistency without perceptible repetition.

### Micro-typography tightening

- Hero heading: `letter-spacing -0.03em` (was -0.025em), `line-height 1.0` (was 1.03) — more print-editorial at step-4 size
- Hero heading mobile: `letter-spacing -0.02em`, `line-height 1.04` — slightly loosened because optical correction needed at smaller size
- Framing line: `letter-spacing -0.025em`, `line-height 1.12` (was 1.2) — tighter at step-3
- Body paragraphs: `line-height 1.68` (was 1.7) — negligible but consistent direction
- Trajectory period: `letter-spacing 0.01em` — slight open tracking aids readability on small metadata text

### Chanel rule for craft pass

Removed: the `::before` gradient on hero (replaced by cleaner real element). Nothing else was added decoratively. Grain and ambient drift were added but both are below conscious threshold — they remove the sense of flatness rather than decorating. The cursor is the only visible addition; it replaced the native cursor.

---

## Session 2 — About section (2026-09-17)

### Framing line: no max-width constraint, fills section padding

The framing line uses Fraunces step-3 with no explicit max-width — it flows within the section's horizontal padding (~88px each side at 1440px), naturally wrapping to 3 lines at desktop. Earlier attempt with `22ch` produced 4 narrow lines; without constraint it reads at editorial measure. Body paragraphs keep their own `max-width: 68ch` cap per §4.

### Trajectory strip: 3-col CSS grid, not a table

Used CSS grid (`7.5rem 1fr auto`) on each row div rather than `<table>`. `display: contents` was considered but rejected — it prevents `border-top` on rows. Each `.traj-row` div carries its own hairline via `border-top: 1px solid var(--line)`. Last row gets `border-bottom` to cap the strip.

Mobile collapses to 2-col: period spanning both rows on left (5.5rem), role and org stacked on right. No data lost.

### Trajectory period contrast: bumped to --text-muted

Original: `--text-faint` (#6E675E) gave ~3.7:1 contrast at step--1 (~14px) — below WCAG AA threshold of 4.5:1 for normal text. Fixed to `--text-muted` (#A8A096) = ~7.8:1. Visual hierarchy maintained through font weight (400 period vs 500 role). "Incoming" row period uses `--text` to signal current/future.

### One scroll reveal: opacity only on strip rows, no Y

The trajectory strip rows fade in (autoAlpha 0→1, stagger 0.09s) when they enter the viewport, `once: true`. No Y movement — the "fade-and-slide-up" anti-pattern requires BOTH. Opacity-only is restrained and tied to the content (sequential timeline rows appearing in order). Everything else in About is static.

### Lenis / ScrollTrigger bridge

Added `useLenis(() => ScrollTrigger.update())` in App.jsx via a `<LenisBridge>` component. Without this, Lenis smooth scroll desynchronises from GSAP ScrollTrigger positions, causing reveals to fire at wrong offsets.

### About section background: same --bg, no surface switch

Did not switch About to `--surface` (#17130F). A surface change without a structural container (card, panel) looks arbitrary. Layered surfaces are for contained elements, not full sections. Separation achieved by whitespace alone.

### Chanel rule for About

Nothing removed — section was built spare from the start. Copy is verbatim. Structure is: framing + two paragraphs + strip. No decorative elements were added.

---

## Session 1 — hero scaffold (2026-09-17)

### Signature moment: clip-reveal, not slide-up

Name: Leonard Kuan (@leonbuildsdata). Confirmed 2026-09-17 — do not change.

**What:** GSAP timeline stamps each headline line into place via `clipPath: inset(0 0 100% 0) → inset(0 0 0% 0)`, with a slight `y` drift during the clip. Meta and CTA follow with `autoAlpha` only.

**Why not slide-up:** Fade-and-slide-up on load is explicitly listed in §5 as the motion tell. The clip reveal reads as type being set — editorial and deliberate — rather than content "appearing" generically.

**Why not scroll-triggered:** The hero is above the fold. Scroll-triggered reveals make no sense here — the user hasn't scrolled yet. The reveal is on-load, which is correct.

---

### Headline: two lines, roman + italic

**What:** "I build AI" in Fraunces upright (weight 300), "that can be trusted." in Fraunces italic.

**Why italic second line:** Adds typographic distinction at line level — not the banned single-word colour accent. The italic reads as a qualifying claim completing the statement. Visually: the roman/italic contrast within one typeface is a traditional editorial device (think magazine subheads, pull quotes). Confirmed the effect works at both desktop and mobile sizes.

**Why sentence case + period:** §7 mandates sentence case, active voice. The period on the headline gives finality — a statement, not a headline fragment.

---

### Layout: bottom-anchored, left

**What:** Flexbox column, `justify-content: flex-end`. Content sits in the lower-left quadrant of the viewport.

**Why:** Newspaper/magazine convention — headlines anchor to the fold. Creates strong negative space in the upper-right. When a nav is added, the top is occupied. This is *not* empty space left by accident.

**What was considered and rejected:** Centre-aligned (too symmetrical, loses editorial tension). Top-aligned (conventional, nothing special).

---

### Background: one radial gradient, 0.055 opacity

**What:** `radial-gradient(ellipse 80% 55% at 0% 100%, rgba(224,166,75,0.055) 0%, transparent 65%)` via `::before`.

**Why:** The amber light originates from where the text lives — a subtle warmth anchor. Opacity set at 0.055 so it's below conscious threshold, felt rather than seen.

**Chanel rule applied:** The gradient was the candidate for removal. Kept it because it does real work (prevents the background from reading as pure cold black). What *was* removed: animated/gradient hero background, custom cursor, section dividers, name as separate element from heading.

---

### Motion stack: useGSAP + ReactLenis

**What:** `@gsap/react` `useGSAP` hook (scoped to container ref), `ReactLenis` as root wrapper.

**Why useGSAP:** Cleans up the GSAP context on unmount automatically. Scoped selectors prevent global leakage. Uses `useLayoutEffect` internally — `gsap.set()` applies before browser paint, eliminating FOUC on initial hidden state.

**Why not Framer Motion for the hero:** FM is fine for user-action feedback (hover, click). For the one orchestrated load sequence, GSAP timelines with precise position parameters are more controllable. Both are in the stack (FM available for later interactive feedback).

**Reduced motion:** `window.matchMedia('(prefers-reduced-motion: reduce)')` checked at animation start. If true: `gsap.set()` all elements to final visible state and return. No animation runs. CSS `@media (prefers-reduced-motion: reduce)` in `global.css` zeroes all transition/animation durations as a belt-and-suspenders backup.

---

### Fonts: CDN for v1

**What:** Fraunces via Google Fonts CDN, General Sans via Fontshare CDN. Both `display=swap`.

**Why not self-hosted yet:** For v1 the CDN is simpler. Self-hosting should happen before production deploy for full control over cache headers and to eliminate third-party font request. Add to pre-launch checklist.

**Fallback stacks defined:** Fraunces → `Georgia, 'Times New Roman', serif`. General Sans → `ui-sans-serif, system-ui, sans-serif`.

---

### Things not done yet (for future sessions)

- Navigation bar (will resolve the top negative space on desktop)
- Project cards section (`#work` anchor target)
- Custom cursor (low priority — can add without changing hero)
- Self-hosted fonts (pre-launch)
- Scroll count-up stats or marquee (from the steal map — WeEvolveIT mechanics)
- One content-tied interactive piece (from AI 2040 steal — possible governance/eval dashboard from a real project)
