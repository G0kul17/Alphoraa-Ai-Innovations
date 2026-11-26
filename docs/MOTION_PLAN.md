# ALPHORAA Motion Plan (Phase 1)

Branch: `feature/motion-transformation`

## 1. Baseline (inspected)

- Stack: React 19, TypeScript, Vite 8, Tailwind 4, react-router-dom 7, `motion` (Framer Motion), `gsap`, `lenis`, `three`.
- Router: `BrowserRouter` with lazy routes and an `AnimatePresence` page transition.
- Deployment target: GitHub Pages at `/Alphoraa-Ai-Innovations/`. No deploy workflow exists in the repo.
- Existing motion: hero agent ecosystem (SVG), Three.js story scrollytelling, 3D coverflow industries carousel, preloader, custom cursor, section dividers, smooth-scroll context.

## 2. Phase 1 changes (deployment)

| Issue | Fix |
| --- | --- |
| Vite had no `base`, so built assets would 404 under the sub-path | `base: '/Alphoraa-Ai-Innovations/'` for `build` only. Dev stays at `/` |
| `BrowserRouter` 404s on refresh or direct URL on GitHub Pages | Switched to `HashRouter` (one-line change, no 404.html needed). URLs look like `/#/services` |
| Hard-coded `/brand/logo-mark.png` in `Logo.tsx` | Uses `import.meta.env.BASE_URL` |
| `index.html` icon and og:image paths | Vite rewrites these with `base` at build time. `og:image` should become an absolute URL once the final domain is confirmed |

## 3. Keep / upgrade / add

- **Keep:** logo, brand tokens, routes, data files, chatbot logic, forms, SEO meta, theme system.
- **Upgrade (later phases):** hero, industries carousel, Story3D scrollytelling, preloader, cursor.
- **Add (later phases):** shared motion tokens, reduced-motion context, GSAP ScrollTrigger scenes, chapter rail.

## 4. Animation ownership matrix (target)

| System | Owns |
| --- | --- |
| GSAP + ScrollTrigger | pinned scenes, scroll scrubs, horizontal showcase, timeline progress |
| Framer Motion (`motion`) | route transitions, hover/tap, modals, accordion, chatbot, filters |
| CSS/SVG | ambient loops, pulses, dash-offset line draws |
| Three.js | Story3D scene and optional hero core only (lazy, paused off-screen) |
| Lenis | smooth scroll, synced to ScrollTrigger, off on touch and reduced motion |

## 5. Pinned-scene budget (max 3, desktop only)

1. Hero to About transition
2. Services horizontal showcase
3. How We Work timeline

Industries stays a drag slider. Portfolio, ecosystem and the rest use normal-scroll reveals.

## 6. Risks

- Hash URLs are less clean for SEO. If clean URLs matter, switch to the `404.html` redirect pattern later.
- Two scroll libraries (Lenis and GSAP) need a single ticker. Handled in Phase 2.
- `vite.config.ts` has a `__dirname` warning under native config loading. Harmless today.
- No CI deploy workflow exists. Confirm how the live site is published before relying on the `base` change.
