# ALPHORAA: Motion Upgrade Add-on (inspired by sef.midtownevents.in)

Use AFTER Prompts 1 to 8 from the main pack are built and working. Paste these one at a time. They layer a cinematic, scroll-driven feel onto the existing site, using ONLY the ALPHORAA palette.

Palette reminder: Primary Blue #1769AA | Deep Blue #123B60 | Logo Orange #F36B21 | Light Blue #EAF4FB | Off White #F8FAFC | White #FFFFFF | Charcoal #17212B | Grey #64748B

Note on the reference: the site could be read only as text, so the patterns below are inferred from its structure (dark hero, "Scroll to begin" cue, numbered chapters 01 to 06, looping ticker with ✦ separators, pass-style member card, number-plus-title cards, step process row). Exact animation code was not visible. If you want a closer match, send a screen recording or the page's HTML/CSS/JS.

---

## Motion Prompt A: Cinematic hero, preloader, smooth scroll, cursor

```
Upgrade the ALPHORAA site with a cinematic motion layer. Keep the stack (React, Framer Motion). You may add `lenis` for smooth scrolling and use GSAP ScrollTrigger only for pinned scroll sequences. Use ONLY brand colours.

1. Preloader / logo reveal: on first visit per session only (sessionStorage in try/catch), show a full-screen Deep Blue (#123B60) panel for max 1.2s: the ALPHORAA mark draws in (SVG stroke), the orange accent pulses once, then the panel wipes up (clip-path / translateY -100%) revealing the page. Skippable, disabled for reduced motion, never shown again on route changes.

2. Dark cinematic hero: change the hero background to a Charcoal (#17212B) → Deep Blue (#123B60) gradient with a subtle dotted grid and two slow drifting orbs (Primary Blue and Orange at 15 to 20% opacity). Headline in White with "Agentic AI." in a blue→orange gradient. Add a "Scroll to begin" cue at the bottom: small mouse/arrow glyph with a looping vertical tick, which fades out after the first 80px of scroll. Header is transparent with white text here, then turns white with Charcoal text after scroll (smooth colour transition).

3. Scroll-driven hero sequence (desktop): pin the hero for ~150vh. As the user scrolls: the AI core scales up and the five agent nodes fly out from the centre into their positions one by one, connection lines draw in with pulses, the heading dims and shifts up. Scroll back reverses it. On mobile and reduced motion, skip pinning and play a short timed reveal instead.

4. Smooth scroll: Lenis with lerp ~0.09, disabled on touch devices and for reduced motion, and stopped while modals/menus/chat are open. Anchor links scroll smoothly with a header offset.

5. Custom cursor (desktop, fine pointer only): a 10px Orange dot plus a 36px outline ring that follows with spring lag. The ring grows and shows a label ("View", "Drag", "Open") over cards, sliders and links. Hide on form fields. Never hide the native cursor on touch or when reduced motion is on.

6. Magnetic buttons: primary CTAs and the "Let's Talk" button subtly pull toward the cursor (max 10px) with a spring, plus an orange gradient fill that sweeps in from the cursor entry point on hover.
```

## Motion Prompt B: Chapter-style scroll storytelling

```
Turn the homepage into a numbered "chapter" journey with strong scroll choreography. Do not change the content or section order.

1. Chapter labels: above each section heading show a small uppercase eyebrow like "01 / Intelligence", "02 / About", "03 / Services", "04 / Industries", "05 / Products", "06 / Work", "07 / Why ALPHORAA", "08 / Technology", "09 / Process", "10 / Insights", "11 / Start". The number counts in with a mask reveal.

2. Fixed progress rail (desktop): a thin vertical rail on the right edge with dots for each chapter. The active chapter dot fills Orange and its label slides out on hover. Clicking a dot smooth-scrolls to that section. Hidden on mobile. Fully keyboard accessible.

3. Section background choreography: alternate dark (Charcoal/Deep Blue) and light (Off White/Light Blue) sections. As a new section enters, transition the page background colour smoothly using scroll progress (useScroll + useTransform on background colour) instead of hard cuts. Ensure text colour contrast flips with it.

4. Heading reveals: line-by-line mask reveal (each line in overflow-hidden, y 110%→0, stagger 0.08, ease [0.22,1,0.36,1]). Paragraphs fade-up with a 0.15s delay after the heading.

5. Parallax: decorative SVG shapes and cover visuals move at 0.1 to 0.3 speed offsets relative to scroll. Images and mockups inside cards scale from 1.15 to 1 as they enter the viewport.

6. Section transitions: use curved or clip-path dividers between dark and light sections that morph slightly on scroll (SVG path or clip-path inset animating with scroll progress).
```

## Motion Prompt C: Signature interactive components

```
Add these signature interactions. Use brand colours only and give every one a reduced-motion fallback.

1. Services: make section 04 a sticky "stacking cards" sequence on desktop. Each service card pins and the next slides over it with slight scale-down and fade of the previous. On mobile use a normal vertical list with fade-ups. Each card shows a large outlined number (01 to 08) that fills with the blue→orange gradient on hover.

2. Industries: convert the slider to a pinned horizontal scroll section on desktop (vertical scroll drives horizontal movement of the cards, with a progress bar and a large counter "03 / 08"). Cards tilt in 3D slightly based on distance from centre. On mobile keep a swipe slider.

3. Pass-style "AI Agent ID card" in the hero or About section: a 3D card (Deep Blue to Primary Blue gradient, orange chip accent) styled like a digital pass, showing a demo agent name, role, a "DEMO" status chip and a fake serial. It tilts with the mouse (rotateX/Y ±12°), has a moving glare highlight and a gentle idle float. Click flips it to show its capabilities. Mark clearly as a demo.

4. Marquee upgrade: the technology strip uses "✦" separators in Orange, two rows moving in opposite directions, and speed that increases briefly with scroll velocity, then eases back. Pauses on hover.

5. Process (How We Work): keep the five-step timeline but add a numbered step row where each number is a large outlined digit that fills as the progress line reaches it, with the detail card sliding between steps.

6. Hover image-reveal lists: on the Insights and Portfolio list views, hovering a row reveals a floating cover preview that follows the cursor (spring), with the row title shifting right and an arrow appearing.

7. Product dashboard mockups: parallax tilt on hover, chart lines drawing in when scrolled into view, KPI tiles staggering in, and a small live-looking pulse on status dots. Values are demo placeholders only; no counting animations on any statistic.

8. Final CTA: the animated network reacts to the cursor (nodes gently attract toward the pointer within a radius), with Orange pulses emanating from the primary button on hover.
```

## Motion Prompt D: Polish, performance and safety

```
Polish the motion layer.

- Standardise easing: entrances cubic-bezier(0.22, 1, 0.36, 1); hovers 250 to 350ms; section reveals 600 to 900ms. No bounce or overshoot except the logo pulse.
- Animate only transform, opacity, clip-path and background-position. No animating blur, box-shadow or layout properties. Add will-change only on actively animating elements.
- Pause all canvas/SVG loops when off-screen. Reduce particles, disable pinning, custom cursor, magnetic effect and Lenis on touch and small screens.
- Honour prefers-reduced-motion everywhere: replace motion with simple opacity fades, no parallax, no marquee movement, no pinned sequences.
- Make sure pinned sections never trap keyboard users (all content reachable by Tab), cleanup ScrollTrigger/Lenis on route change, and call ScrollTrigger.refresh after route and font load.
- Verify there is no horizontal overflow, no layout shift from the preloader, contrast remains AA on every dark/light transition, and the production build passes with no console errors.
```

---

## Quick fix prompts

**Too much motion**
```
Reduce motion intensity by 30%: shorter distances (max 24px), fewer simultaneous animations per viewport (max 3), remove the cursor ring label and the idle card float. Keep the pinned hero and chapter rail.
```

**Scroll feels janky after adding Lenis**
```
Disable Lenis on touch devices, sync it with GSAP ScrollTrigger (scroller proxy / ticker), and make sure pinned sections use pinSpacing correctly. Fix any jump on route change by calling scrollTo(0, {immediate:true}) and ScrollTrigger.refresh().
```
