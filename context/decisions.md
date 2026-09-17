# context/decisions.md — design and build decisions

Ongoing log. Add to this before revisiting any completed section. Purpose: stop future sessions from re-litigating settled choices.

---

## Session 7 — About section redesign: two-column layout + stat block (2026-09-17)

### Two-column body: 3fr bio / 2fr stat block

`.about-body` changed from flex column to `grid-template-columns: 3fr 2fr`. Left column holds both bio paragraphs; right column holds a 2×2 stat block. Collapses to single column at ≤768px (stat block drops below bio). The 3:2 ratio gives bio enough room for the 68ch line-length while making the stat column feel substantial — not squeezed.

### Stat block: Fraunces numbers, accent units, muted labels

Four stats in a 2×2 CSS grid inside the right column. Each stat: number in Fraunces step-3 weight 300 (--text), unit suffix in Fraunces step-1 weight 300 (--accent), label in General Sans step--1 (--text-muted). Fraunces optical sizing on for both number and unit. Unit in accent rather than text keeps numbers readable at a glance — the accent signals what the number is measuring.

Stats chosen: `4 yrs` (career span), `98–99%` (OKX model accuracy), `2,000+` (Bloomberg queries), `3` (dashboards shipped). Specific, verifiable, active-role-relevant — not vanity metrics.

### Framing line: final word "trustworthy" in italic

`<em>trustworthy</em>` within the Fraunces framing line. Fraunces italic is distinctively cursive — the contrast with the roman upright is visually meaningful, not decorative. The italic lands on the positioning keyword: the site's central claim. No color change, no weight change — the typeface does the work.

### Bio paragraph hierarchy: first paragraph --text, key phrases weight 500

Opening paragraph (`.about-bio-lead`) set to `color: var(--text)` — stronger visual weight for first impression. Second paragraph uses default `--text-muted`. Within both: `.about-strong` spans set key phrases to `color: var(--text); font-weight: 500`. Phrases highlighted: "neural networks to encode quantum states" (distinctive credential) and "MoneyLion (Gen Digital)" (incoming role). This avoids making the bio feel uniform grey without resorting to decorative color.

### Logos: CSS filter brightness(0) invert(1), 28px height

All logos switched from baked #EDE8DF fill to `filter: brightness(0) invert(1)` on black-fill SVGs + `opacity: 0.88` (slightly below full --text to avoid glare). Height increased from 18px to 28px. This allows using the official SVGs as-is without editing path colors. Opacity 0.88 softens the pure-white that the filter produces, matching the warm --text tone more closely.

`moneylion.svg` viewBox corrected from `"0 0 748 567"` to `"70 302 608 122"` — crops the coordinate space to just the wordmark text paths (y≈305–419), excluding the lion icon above and tagline below. Without the crop, the logo text rendered at ~6px effective height within the 28px frame — unreadable.

`bloomberg.svg` replaced (file was a binary WebP). New file: SVG `<text>` element, "bloomberg" lowercase, `font-weight: 700`, Helvetica/Arial system sans-serif, `fill="black"`. SVG text with system fonts renders correctly in `<img>` context. Bloomberg not on SimpleIcons CDN — text wordmark is an accurate representation of their all-lowercase brand convention.

### Credential: amber dot retained

`.credential-dot` is a 5px circle in `var(--accent)`, inline before the GARP text via flex row. Dot replaces the previous plain-text entry. Tiny amber marker connects the credential to the accent system without adding a label or badge chrome.

### traj-row align-items: center (was baseline)

Changed from `baseline` to `center` so logos and text sit at the same visual midpoint in each row. With logos at 28px height alongside step--1 (~14px) text, baseline alignment would float the logo above the text cap-height. Center alignment looks more considered.

### What was considered and rejected

- Three-column body layout — too complex; bio + stats is sufficient without a third zone
- Stat numbers in a different color from --text — makes stats feel like accent decoration; --text + accent unit is cleaner split
- Showing lion icon from moneylion.svg — logo icon + wordmark + tagline all in 28px was illegible; wordmark alone is the right call for this context
- Geometric "B" lettermark for Bloomberg (used in session 5) — replaced with text wordmark which matches their actual all-lowercase brand

---

## Session 5 — Atmosphere pass (visible) + logo fix (2026-09-17)

### Hero WebGL gradient: domain-warped FBM noise, raw WebGL

Built `HeroGL.jsx` — a raw WebGL canvas component with a custom GLSL fragment shader. No library dependency. The shader uses domain-warped FBM (fractal Brownian motion) via value noise: two noise lookups distort a third, producing organic cloud-like movement rather than regular tiling. Three-stop color ramp: --bg (#0E0C0A) → deep ember (#26120A approx) → muted amber (~65% of --accent). Canvas fills the hero section at devicePixelRatio capped to 2.

Focal point at `vec2(0.85, 0.28)` — warm glow centres in the mid-upper-right, leaving lower-left dark for text contrast. Falloff via smoothstep over 0.92 distance, meaning the amber tapers organically rather than cutting off hard.

prefers-reduced-motion: renders a single frame at t=20s (a visually interesting mid-animation snapshot) and stops. No rAF loop runs.

Replaced `.hero-bg-parallax` (CSS radial gradient, GSAP parallax) entirely. The WebGL canvas does more visual work; the CSS gradient was redundant. GSAP ScrollTrigger import removed from Hero.jsx.

### Hero top scrim: nav contrast protection

`.hero::before` adds a 10rem dark-to-transparent gradient at the top of the hero. This keeps the fixed nav text readable regardless of what the shader renders at the very top edge. The nav link color was also lifted from --text-faint to --text-muted (hover: --text) since the hero now has a visible background.

### Film grain: opacity lifted from 0.035 to 0.055

At 0.035 the grain was literally sub-perceptual. 0.055 is still tasteful (below "heavy noise") but now reads as texture on screen. No structural change — still SVG feTurbulence via body::after.

### Logos: lifted to --text, real marks where available

Color changed from #A8A096 (--text-muted) to #EDE8DF (--text) across all four logos. Height increased from 13px to 18px.

- **OKX**: replaced text wordmark with real SimpleIcons geometric path mark. SimpleIcons CDN returns it at `cdn.simpleicons.org/okx`. Fill changed from `#000000` to `#EDE8DF`.
- **Bloomberg**: not on SimpleIcons CDN (404). Replaced text mark with a geometric "B" lettermark (rect stem + two quadratic-bezier bowls, lower bowl wider per classic B proportion). Flagged as stand-in — replace with official brand asset when available.
- **MoneyLion**: text wordmark retained, fill lifted to #EDE8DF.
- **Bristol**: serif text wordmark retained, fill lifted to #EDE8DF.

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
