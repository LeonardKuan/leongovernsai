# context/decisions.md — design and build decisions

Ongoing log. Add to this before revisiting any completed section. Purpose: stop future sessions from re-litigating settled choices.

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
