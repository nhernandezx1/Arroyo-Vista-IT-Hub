# Arroyo Vista IT — Design System

A design system for the **Information Technology department** of **Arroyo Vista Family Health Center**, a non-profit network of community health centers serving Greater Northeast Los Angeles since 1981 (four health centers + a mobile clinic, accredited by The Joint Commission).

This system powers internal IT tooling — the staff-facing **IT Central Hub**, help-desk/ticketing, knowledge base, and onboarding surfaces. Its visual identity is a deliberate, characterful **"secure terminal running inside a physical monitor"**: dark, calm, cyberpunk-adjacent, high production value — an internal tool a serious IT team is proud to run.

> ⚠️ This identity is **distinct from the public arroyovista.org website** (a light, warm patient-facing Squarespace site). The IT Hub is an internal "command center" with its own dark, terminal-driven personality, anchored to the real brand blue and logo.

---

## Sources

- **Live website (tone, copy, services, logo):** https://www.arroyovista.org/ and https://www.arroyovista.org/locations
- **Logo (original):** `https://images.squarespace-cdn.com/content/v1/66ce096087b36730b4facf15/1724778890373-VS0KS3HXXB5NMUTCX09S/Arroyo-Vista-7_7_19_v1.png` → saved to `assets/logo-arroyo-vista.png`
- **Product spec (source of truth for the IT identity):** the "IT Central Hub — Full Replication Prompt" provided by the user, implemented verbatim in `index.html`.
- Brand blue **`#0868B8`** was sampled directly from the logo mark.
- **Fonts:** `Orbitron` uploaded by the user (self-hosted in `fonts/`); `Inter` + `Space Grotesk` via Google Fonts.

---

## Content Fundamentals — how we write

The IT Hub voice is **mission-grade but human** — it borrows the clarity of a terminal and the warmth of a community clinic. Two registers coexist:

| Register | Where | Example |
|---|---|---|
| **Ops / terminal** | system chrome, Mission Control, badges, kickers | `AV IT TERMINAL v4.8.2`, `SECURE LINK`, `root@av-it-secure:~$`, `ARROYO VISTA PERSONNEL ONLY` |
| **Plain & supportive** | help articles, FAQs, contact copy | "When in doubt, forward the message to ithelp@arroyovista.org and we'll verify it." |

**Rules of thumb**
- **Person:** speak *to* staff as "you"; the team refers to itself as "we." ("…we coordinate directly with NextGen support for these.")
- **Casing:** Title Case for headings; **UPPERCASE** reserved for terminal chrome, kickers, badges, and status pills (`IN PROGRESS`, `RESOLVED`). Body is sentence case.
- **Tone:** calm, competent, never alarmist. Even security warnings stay matter-of-fact ("Slow down and check three things").
- **Numbers & IDs** are monospaced (`TICKET-4821`, `x9030`, `23ms`) — they read as machine truth.
- **Mission / care framing** keeps the human stakes visible: copy references "our four health centers and mobile clinic," "patient data," "clinical impact."
- **No emoji.** Iconography is Font Awesome line/solid glyphs, never emoji. Exclamation points are rare.
- **Brevity:** short declaratives. Numbered/bulleted steps for any procedure.

---

## Visual Foundations

**Overall motif** — the entire UI lives "inside a monitor": a thick rounded black bezel (`--r-bezel: 26px`, `18px` frame) with layered inner shadows and a pulsing green power LED top-right. The screen content sits in a scrollable rounded inset.

- **Color vibe:** deep blue-blacks (`#05080e`), cool slate text (`#dce7f1`), a single energetic **accent** (default ops green `#22c55e`; swappable to amber or brand-azure via `data-theme`). Amber `#facc15` is the "highlight/classified" color (clearance badge, warnings). Brand blue `#0868B8` anchors the logo and the azure theme.
- **Backgrounds:** flat deep gradient + a faint 46px **grid texture** (`.grid-faint`) on the hero. No photography in the IT surfaces; no decorative illustration. Mission Control adds **CRT scanlines** + inner green glow. (No persistent 3D background or code-rain — deliberately removed.)
- **Glassmorphism:** panels/cards use `backdrop-filter: blur(14px)` over `rgba(16,24,36,0.62)` with a 1px translucent border (`--border`). This is the dominant card treatment.
- **Cards:** radius `16px`, translucent border, **no heavy drop shadow at rest**; on hover they lift `translateY(-3px)`, the border brightens, and a soft shadow + faint accent ring appear.
- **Borders:** hairline, cool, low-opacity (`rgba(120,170,220,0.14)` → `0.28` on emphasis). Borders do the structural work; shadows are reserved for hover/elevation.
- **Corner radii:** bezel 26 / screen 12 / card 16 / button 10 / pills & status 999.
- **Shadows / glow:** outer shadows are deep and soft (`0 16px 40px -18px rgba(0,0,0,.8)`); the accent gets a **glow** (`box-shadow` with accent rgba) on primary buttons, active stages, and the LED. Inset shadows build the monitor depth and CRT vignette.
- **Hover states:** lift + border brighten + accent ring (cards); brighten background + accent border + white text (ghost buttons); stronger glow (accent buttons). Links underline-grow from left.
- **Press states:** `transform: scale(0.96)` on buttons.
- **Transparency & blur:** used for nav (sticky, blurred), glass cards, modal backdrops (`blur(4px)` over `rgba(2,4,10,0.74)`), and the frosted panel fills. Blur signals "layered above the screen."
- **Animation:** GSAP-driven, intentional, never bouncy-for-its-own-sake. Boot typing → CRT power-on flash. Section nav fires a **Three.js network "quantum tunnel" jump** (~1.35s) before smooth-scrolling. Editor tabs each get a **distinct** easing signature (data-pop `back.out`, doc-slide `power3`, springy `elastic.out`, warm lift `power2`, stepped `steps()`). Entrance motion animates **transform only** so content is never stuck hidden if motion is disabled.
- **Layout rules:** centered `1180px` max wrap, `40px` gutters; `60px` vertical section rhythm; fixed monitor bezel + LED; sticky blurred nav; floating admin FAB bottom-right; full-screen overlays (boot, jump, Mission Control, modals) inset to match the bezel.
- **Typography:**
  - **Orbitron** (self-hosted, variable 400–900) — display: hero, section H2s, big stat/stage numerals, Mission Control title. Geometric, sci-fi, wide — used at large sizes, short strings.
  - **Inter** — body, UI, forms. Quiet and legible.
  - **Space Grotesk** — mono role: kickers, tags, IDs, timestamps, terminal text. Tabular figures.
  - Tracking: hero `-0.02em`; kickers/badges `+0.16–0.22em` uppercase.
- **Accessibility:** target **WCAG AA**. Body text `#dce7f1` on `#05080e` is ~15:1. Status is never color-only (pills carry text labels). Hit targets ≥ 40px. `prefers-reduced-motion` disables entrance animation.

---

## Iconography

- **System:** **Font Awesome 6.5.1** (loaded from CDN in `index.html`), mixed solid + regular. This is the single icon source across the IT surfaces.
- **Style:** standard FA weight; icons are tinted with `var(--accent)` for active/branded glyphs and `var(--muted)` for passive ones. Common glyphs: `fa-terminal`, `fa-ticket`, `fa-diagram-project`, `fa-headset`, `fa-user-shield`, `fa-server`, `fa-lock`, `fa-circle` (status dots), `fa-arrow-up-right-from-square` (external links).
- **No emoji, no PNG icons, no hand-rolled SVG icon art.** The only bespoke SVG is the bundler thumbnail.
- **Logo:** the AV mark (angular blue pinwheel cross) + wordmark. Two variants in `assets/`:
  - `logo-arroyo-vista.png` — original (blue mark, black wordmark) for light surfaces.
  - `logo-arroyo-vista-dark.png` — dark-surface version (bright-blue mark, near-white wordmark) used in the Hub nav/footer.
- **Status dots:** small `fa-circle` in accent (online), amber (degraded/warning), or danger — always paired with a text label.

---

## Index — what's in this system

| Path | What it is |
|---|---|
| `README.md` | This document — context, voice, visual foundations, iconography, index. |
| `SKILL.md` | Agent-Skill manifest (works in Claude Code) — read this to design *as* Arroyo Vista IT. |
| `colors_and_type.css` | All design tokens: brand/surface/accent colors, type families + scale, radii, spacing, elevation, themes. |
| `index.html` | **Flagship UI kit — the IT Central Hub.** A single self-contained file. The reference implementation of the whole identity. |
| `data.js` | `DEFAULT_DATA` content (stats, articles, links, team, FAQs) + localStorage persistence for the Hub. |
| `app.js` | Hub application logic: boot, roadmap, Three.js jump, Mission Control, admin editor, modals. |
| `Directions.html` | Early exploration — 3 color/type directions (superseded by the terminal identity; kept for reference). |
| `assets/` | Logos (light + dark) and downloaded brand assets. |
| `fonts/` | Self-hosted Orbitron (variable + static weights). |
| `preview/` | Small specimen cards that populate the Design System tab. |

### The IT Central Hub (`index.html`) — feature map
Monitor bezel + power LED · boot sequence · sticky nav (logo doubles as the admin trigger) · hero + clearance badge · clickable stats · **6-stage Ticket Lifecycle** roadmap (auto-cycle) · Recent Intelligence (article modals) · Quick Links (10 real vendor portals) · The Collective (team tooltips + dossier modals) · IT First Aid (FAQ) · **Three.js "quantum tunnel"** nav transitions · **Mission Control** full-screen terminal (`help / status / tickets / team / ping / whoami / clear / exit`, live telemetry) · **Admin system** (activate via `?admin=true`, Shift-click or triple-click the logo, or `Ctrl+A`) with a 5-tab content editor (distinct GSAP transition per tab) and localStorage persistence · theme switcher (green / amber / azure).

---

## ⚠️ Caveats / things to confirm
- **Team members** (`data.js`) are realistic **placeholders** — replace with real names, roles, tenures, emails, and extensions.
- **Stats, articles, and FAQs** are plausible samples — verify against current operations.
- The Joint Commission / vendor names (NextGen, MTS, NovaPACS, Azara, Kumo) are inferred from the provided Quick Links; confirm they're correct to reference internally.
