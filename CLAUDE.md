# CLAUDE.md — leonbuildsdata personal site

This file is read at the start of every session. It is the standard. Build to it.
Companion reference: `context/reference-teardown.md` (the analysis this direction is derived from). Read it once per project, not every session.

---

## 1. Brief

**What:** A personal site for Leonard — the hub of the `@leonbuildsdata` brand. It is a showcase, not a CV. Each project is a card that links out.
**Who it's for:** Hiring managers, AI/fintech peers, and anyone arriving from LinkedIn. Technically literate, skims first, reads if hooked.
**The one job:** Make a visitor believe, in ten seconds, that this person *builds and governs AI* — credible, precise, current. Everything serves that.
**Positioning shift:** Not "builds data things" → "builds AI, and makes sure it can be trusted." The design must read serious and editorial, not playful or salesy.

Content lives in the repo, not here. When copy is missing, write it per §7 — never lorem, never filler.

---

## 2. Aesthetic direction

Dark, editorial, precise. Motion serves narrative, never decorates. Typography does the heavy lifting. One signature moment carries the boldness; everything else is quiet.

The north stars are the *restrained* references (EMO, AI 2040) — typographic discipline and a single orchestrated interaction — **not** the busier agency look. Achievable target for build effort is the WeEvolveIT/Bitnomial tier, but stripped of its template chrome (see §5).

Spend boldness in exactly one place. Before shipping any view, remove one thing.

---

## 3. Design tokens

Dark base with a **warm** undertone (not pure `#000`, not the tinted-black-plus-neon cliché). Layered surfaces give depth. One accent, used sparingly.

```css
:root {
  /* Surfaces — warm near-blacks, layered for depth */
  --bg:         #0E0C0A;
  --surface:    #17130F;
  --surface-2:  #211B15;
  --line:       rgba(237, 232, 223, 0.10);  /* hairline borders from the text hue */

  /* Text */
  --text:       #EDE8DF;   /* warm off-white — never pure #FFF */
  --text-muted: #A8A096;
  --text-faint: #6E675E;

  /* Accent — DEFAULT: editorial amber/ochre. Deliberate, not neon. */
  --accent:        #E0A64B;
  --accent-strong: #F0B85C;  /* hover / active */
  --focus:         #F0B85C;  /* visible keyboard focus ring */

  /* Motion */
  --ease:      cubic-bezier(0.22, 1, 0.36, 1);  /* soft, expensive-feeling */
  --dur-fast:  180ms;
  --dur:       420ms;
  --dur-slow:  900ms;  /* the signature reveal only */
}

@media (prefers-color-scheme: light) {
  /* This site is dark by design. If a light mode is ever added, define it here — do not auto-invert. */
}
```

**Accent swap (one-token change).** Default is the editorial-warm "Ledger" palette above. The cool "Signal" alternative for a more technical read:
```css
--accent: #5B8CFF; --accent-strong: #7BA3FF; --focus: #7BA3FF;
/* and cool the surfaces slightly: --bg:#0A0C10; --surface:#12151B; --surface-2:#1B1F27; --text:#E6E9EF; --line:rgba(230,233,239,0.10); */
```
Pick one and commit it. Do not use both.

**Accent discipline:** the accent appears on links, the focus ring, and the single signature element — almost nowhere else. If more than ~5% of a viewport is accent-colored, cut it back.

---

## 4. Typography

Two families, clearly distinct. The display face is an *active visual element*, not a delivery vehicle.

- **Display / headlines:** **Fraunces** (variable serif, free via Google Fonts). High-contrast, editorial, optical sizing on. Use real weight and size contrast — headlines should feel set, not typed.
- **Body / UI:** **General Sans** (Fontshare, free) — clean grotesk. Fallback stack: `"General Sans", ui-sans-serif, system-ui, sans-serif`.
- **Mono:** **Geist Mono** — *only* for real code/data snippets. Never as decoration for labels or eyebrows.

Type scale (perfect-fourth, fluid). Body base 18px. Line length < 74ch for body; serif gets more line-height than sans.
```css
--step--1: clamp(0.83rem, 0.8rem + 0.15vw, 0.9rem);
--step-0:  clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--step-1:  clamp(1.33rem, 1.2rem + 0.6vw, 1.6rem);
--step-2:  clamp(1.77rem, 1.5rem + 1.2vw, 2.4rem);
--step-3:  clamp(2.37rem, 1.9rem + 2.2vw, 3.6rem);
--step-4:  clamp(3.16rem, 2.3rem + 4vw, 5.6rem);   /* hero */
```

---

## 5. Anti-patterns — the generated-page tells. Do not use.

Several of these appear on the reference sites. They are still tells. Avoid them:

- **`01 / 02 / 03` numbered markers** unless the content is *genuinely* a sequence (a stepped process, a timeline). A list of projects is not a sequence.
- **ALL-CAPS eyebrow labels** stacked above headings.
- **Middle-dot meta strings** (`A · B · C`) and **`WORD — fragment`** spaced-em-dash labels.
- **`→` appended to button/link text.** Say what the action does.
- **Monospace for small labels** to look "technical."
- **Accenting a single word** in a headline (one word bold/italic/colored).
- **Fade-and-slide-up on every section** + hover-lift on every card. This is *the* motion tell. Motion is for one orchestrated moment (§6), plus feedback on user actions.
- **Identical rounded cards**, one border-radius on everything, same soft grey `rgba(0,0,0,.1)` shadow under each, gradient washes as decoration.
- **Pure/tinted near-black + one acid-green or vermilion accent.** We use warm base + considered accent for this reason.

Structural devices (borders, dividers, numbering, labels) must *encode information*, not decorate.

---

## 6. Motion & the signature moment

- **Smooth scroll:** Lenis.
- **Orchestration:** GSAP + ScrollTrigger for the *one* signature sequence. Framer Motion is fine for genuine user-action feedback.
- **The signature moment:** choose ONE and make it excellent. Candidates: an animated shader-gradient hero; a subtle generative/R3F element; or one scroll-orchestrated reveal tied to the content. Not a full WebGL scene — that's the Numa rabbit hole; admire, don't chase, for v1.
- **Reduced motion:** every animation must degrade gracefully under `prefers-reduced-motion: reduce`. The signature moment resolves to its final state instantly.

---

## 7. Copy voice

Plain, sentence case, active voice, no filler. Say what a thing is or does; don't sell it. A button names its action and keeps that name through the flow ("View project" → not "Learn more →"). Errors explain what happened and how to fix it; empty states invite an action. Brand tone: a builder who ships *and* thinks about oversight — confident, specific, unshowy.

---

## 8. Tech stack

React + Vite, deployed on Cloudflare Pages. Lenis + GSAP/ScrollTrigger for motion. Fonts self-hosted or via Google/Fontshare with real fallbacks. Keep it a single-purpose static site — no backend unless a project card genuinely needs one.

---

## 9. Build workflow (how to work in this repo)

1. **Read first:** this file + `context/` before writing code.
2. **Plan, then critique for genericness.** Draft the token/layout plan; then ask "would I produce this for any similar brief?" If yes, revise and note what changed and why. Only then build.
3. **See your work.** Use the Chrome DevTools MCP to run the dev server, screenshot the actual render (desktop + mobile widths), and self-critique against §2–§6 each iteration. A screenshot is worth 1000 tokens.
4. **Current APIs.** Use the Context7 MCP for GSAP / Lenis / Framer Motion / R3F docs rather than memory.
5. **Quality floor (non-negotiable):** responsive to mobile, visible keyboard focus, reduced-motion respected, accessible contrast, no layout shift on load.
6. **Chanel rule:** before declaring a view done, remove one element. Keep a `context/decisions.md` of what you tried so future sessions don't repeat it.
