---
name: arroyo-vista-it-design
description: Use this skill to generate well-branded interfaces and assets for the Arroyo Vista Family Health Center IT department, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and the IT Central Hub UI kit for prototyping the "secure terminal in a monitor" internal-tooling aesthetic.
user-invocable: true
---

# Arroyo Vista IT — Design Skill

Read **`README.md`** first — it carries the full context: brand background, content voice, visual foundations, iconography, and an index of every file here. Then explore the other files as needed.

## What's here
- `README.md` — the brand brief (read this first).
- `colors_and_type.css` — all design tokens (colors, type families + scale, radii, spacing, elevation, themes). Import or copy these variables.
- `index.html` + `data.js` + `app.js` — the **IT Central Hub**, the flagship UI kit and reference implementation of the whole identity. Read these to see real, working components (monitor bezel, boot sequence, glass cards, roadmap stepper, Mission Control terminal, admin editor, modals, status pills).
- `preview/` — small specimen cards (type, color, spacing, components, brand).
- `assets/` — logos (dark + light variants).
- `fonts/` — self-hosted Orbitron (variable + statics).

## The identity in one breath
A dark, calm **"secure terminal running inside a physical monitor"**: deep blue-blacks, glass panels, a single ops-green accent (swappable to amber/azure), **Orbitron** display + **Inter** body + **Space Grotesk** mono, Font Awesome icons, GSAP motion. Mission-grade but human voice. WCAG AA. No emoji, no purple gradients, no hand-rolled SVG icons.

## How to work
- **Visual artifacts** (slides, mocks, throwaway prototypes): copy the assets/fonts you need out of this skill, pull tokens from `colors_and_type.css`, lift components from `index.html`, and produce static, self-contained HTML files for the user to view.
- **Production code**: read the rules here to become an expert in the brand, then apply the tokens and component patterns directly in the target codebase.
- Always self-host or CDN-load the three fonts; always use the dark logo variant on dark surfaces.
- Keep entrance animations **transform-only** so content is never stuck hidden when motion is disabled.

If invoked with no other guidance, ask the user what they want to build, ask a few focused questions (surface, audience, light/dark, variations), and act as an expert designer who outputs HTML artifacts **or** production code depending on the need.
