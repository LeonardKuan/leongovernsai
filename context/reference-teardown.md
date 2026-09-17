# Reference teardown — the five sites this direction is built from

Read once per project for context. The distilled rules live in `../CLAUDE.md`; this is the reasoning behind them.

Analysis method: each site's markup, assets, fonts and structure were inspected directly (except Numa, which blocks crawlers — characterized from its studio's award-winning body of work). This captures the *techniques* in play, not the live scroll feel.

---

## The five, individually

### 1. AI 2040 — ai-2040.com  *(premium / north star)*
The AI Futures Project's sequel to the viral AI 2027 site. A long-form **interactive essay**. Craft is structural, not decorative: a branching "Choose a Path" mechanic (Plan A/B/C/D/S), inline expandable footnotes, live data explorers (Economic Growth, Takeoff Forecast). Feel: authoritative, document-like, restrained. Spiritually closest to Leonard's content (responsible AI). **Steal:** one signature interactive tied to the content; treat reading as a designed experience.

### 2. EMO / Altar II — electronicmaterialsoffice.com  *(premium / ceiling)*
Apple-grade product page for a mechanical keyboard. Scroll-scrubbed video landing on a last frame, alternating image/text reveals, comparison animations, embedded audio demo. Rigorously **monochrome black**. Credits its type: **GT Flexa** (Grilli Type) + **Tobias** (Displaay) — premium licensed faces. Feel: luxury, precision, obsession. **Steal:** typographic discipline + monochrome restraint. **Don't chase:** scroll-scrubbed hero video needs real render/video production.

### 3. WeEvolveIT — weevolveit.com  *(achievable — but leans on tells)*
Next.js, dark (`#171717`). The polish is cheap-but-effective: infinite logo marquee, count-up counters ("000%"), pinned numbered steps (01–05), a scrolling text marquee, punchy lowercase copy. **This is the achievable build tier.** But it also uses much of the template chrome flagged in `CLAUDE.md` §5 (01/02/03 markers, middle-dot meta, ALL-CAPS labels). Take the *mechanics* (marquee, count-up, pinned section), leave the chrome.

### 4. Bitnomial — bitnomial.com  *(achievable)*
Institutional crypto exchange. Dark, full-bleed **hero video** (`hero-waves`), numbered feature grid, accordion FAQs. Feel: trustworthy but modern — "serious money, not boring." **Steal:** a full-bleed hero — but prefer an animated shader gradient over a video, to skip video production.

### 5. Numa / UPROCK — numa.uprock.pro  *(ceiling / aspirational only)*
UPROCK is an Awwwards-recognized studio (Gorillaz, Colonization of Mars). Expect cinematic dark visuals, heavy WebGL/GSAP motion, custom cursors, immersive scroll — the "Site of the Day" tier where motion *is* the product. **Steal:** the restraint to stop before here. A full WebGL scene is out of scope for v1.

---

## The common DNA (this is the actual taste signal)

Five different sites, one nervous system:
1. **Dark, always** — `#000` / `#171717` / near-black. Not one is light.
2. **Typography is the star** — big confident headlines in characterful (often premium) type. Never default-Inter-everywhere.
3. **Motion as narrative** — scroll drives it: pinned sections, reveals, scrubbed video, count-ups, marquees. Purpose, not sparkle.
4. **Restraint over decoration** — monochrome or one-accent. Sophistication from space and type.
5. **One signature moment** — each has a single memorable centerpiece.

→ Target feel: **dark, editorial, motion-driven, precise, with one signature interactive moment.** Coherent with a "builds-and-governs-AI" brand: serious, technical, credible.

---

## Premium vs. achievable — the honest split

- **Premium/ceiling (EMO, Numa):** licensed foundry type, custom WebGL, produced video. Not matchable solo in a month, and not necessary.
- **Achievable (WeEvolveIT, Bitnomial):** dark React/Next, GSAP/Framer motion, a hero gradient, clean type. Gets ~80% of the "wow."
- **The gap-closer:** dark theme + one accent + a free premium font pairing (Fraunces + General Sans ≈ Tobias + GT Flexa for $0) + Lenis smooth scroll + scroll reveals + one signature hero + custom cursor. That combination is the distance between VALSTATS-tier output and these.

## Steal-map (per site → into the build)
- **WeEvolveIT** → marquee, scroll count-up stats, one pinned section (mechanics only, no chrome).
- **Bitnomial** → full-bleed hero (shader gradient, not video).
- **EMO** → type discipline, monochrome restraint; its fonts as the reference to match for free.
- **AI 2040** → one content-tied interactive piece (e.g. an interactive governance/eval dashboard from a project).
- **Numa** → restraint. Admire the WebGL; don't build it yet.
