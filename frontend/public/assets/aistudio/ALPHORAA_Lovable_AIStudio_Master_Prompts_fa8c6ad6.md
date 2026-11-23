# ALPHORAA AI INNOVATIONS: Master Prompt Pack for Lovable and Google AI Studio

## How to use this pack

Both tools work best when you do NOT paste one giant prompt. Large single prompts get partly ignored, produce thin sections and break easily. Use this order instead:

1. **Part A** (Project Knowledge): paste once.
   - Lovable: Project Settings → Knowledge (or paste as the first message).
   - AI Studio: paste as the first message in Build mode, or in System Instructions.
2. **Part B** (Build Prompts 1 to 8): paste ONE at a time, in order. Check the preview after each, then continue.
3. **Part C** (Fix-it prompts): use when something looks wrong.

Tool notes:
- **Lovable** builds React + Vite + TypeScript + Tailwind (shadcn/ui available). Do not ask for Next.js. Prompts below are written for that stack.
- **AI Studio (Build mode)** also generates React apps. Prompt 1 explicitly asks for a multi-file structure, because it sometimes collapses everything into one file.
- Keep Three.js out of the first pass. The hero is built with SVG + Framer Motion, which is lighter and more reliable in both tools. Add 3D later only if you want it (see Part C).

---

# PART A: PROJECT KNOWLEDGE (paste once)

```
You are a senior frontend engineer and motion designer building a premium, futuristic, FRONTEND-ONLY corporate website for ALPHORAA AI INNOVATIONS (www.alphoraa.ai), an AI, Agentic AI and Intelligent Automation company. It must look like a leading international AI company, not a generic agency or Bootstrap template.

## Stack (do not add others)
React 18 + TypeScript + Vite, Tailwind CSS, Framer Motion (primary animation library), React Router DOM, Lucide React icons. GSAP only if a specific effect truly needs it. No backend, no database, no real auth, no real API calls.

## Scope rules
- Frontend only. Simulate anything that would need a backend (forms, chatbot, newsletter) and be honest in the UI about it.
- Use clearly marked demo/placeholder content wherever real company info is missing. Put a small "Demo content" tag on placeholder products, testimonials, case studies and contact details.
- NEVER invent client names, verified results, statistics, awards or customer counts. No animated counters.
- Keep all content in /src/data as typed mock data so it is easy to replace.
- Every visible button, link, card and control must do something meaningful (navigate, filter, open, expand, submit). No dead buttons.

## Brand tokens (centralise in tailwind.config + CSS variables)
Primary Blue #1769AA | Deep Blue #123B60 | Logo Orange #F36B21 | Light Blue #EAF4FB | Off White #F8FAFC | White #FFFFFF | Charcoal #17212B | Grey #64748B
Headings: Sora (fallback Space Grotesk). Body: Inter. Buttons: Inter SemiBold. Load via Google Fonts.
Gradients: blue→deep-blue for surfaces; a controlled blue→orange accent gradient used sparingly (CTAs, key highlights, connection pulses).

## Visual direction
Premium, minimal, intelligent, spacious. Asymmetric layouts, strong type hierarchy, soft shadows, large rounded corners (16 to 28px), subtle glassmorphism only on a few floating elements, abstract SVG neural-network visuals, realistic dashboard mockups built in code.
AVOID: heavy neon, too many glows, cluttered backgrounds, repetitive identical card grids, stock-looking AI robot art, excessive motion, broken image URLs. Prefer custom SVG/CSS visuals over external photos. If using photos, use only reliable sources and always provide alt text and a gradient fallback.

## Animation system (Framer Motion)
Create /src/animations/variants.ts with reusable variants and use them everywhere:
- fadeUp: y 24→0, opacity 0→1, 0.6s, ease [0.22, 1, 0.36, 1]
- fadeIn, slideLeft, slideRight (x ±40→0), scaleIn (0.94→1)
- staggerContainer (staggerChildren 0.08 to 0.12)
- wordReveal for headings: each word in an overflow-hidden wrapper, y 100%→0, stagger 0.06
- pageTransition: opacity + y 12px, 0.35s, wrapped in AnimatePresence mode="wait" keyed on route
- Scroll reveals: whileInView with viewport={{ once: true, margin: "-80px" }}
- Hover: cards lift y -6 with a soft shadow increase; arrows translate-x 4px; icons rotate or scale subtly; image zoom 1.05 inside overflow-hidden; animated gradient border on hover; nav underline that grows from the left.
- Background: floating particles, drifting gradient orbs, pulsing network nodes. Slow (8 to 20s loops), low opacity.
- Only animate transform and opacity. Respect prefers-reduced-motion with a useReducedMotion hook (disable parallax, floating and marquee; keep simple fades). Lower particle counts on mobile.

## Architecture
src/ components/{common,layout,navigation,animations,chatbot,forms,cards}, pages/{Home,Services,ServiceDetails,Solutions,Products,Portfolio,CaseStudies,About,Insights,Contact,NotFound}, hooks/, data/, animations/, styles/, types/, App.tsx, main.tsx.
Typed interfaces for every data model. Small reusable components, no duplicated markup.

## Quality bar
Fully responsive (320 / 768 / 1024 / 1440+), mobile-first, no horizontal overflow, touch targets ≥44px, semantic HTML, one h1 per page, visible focus states, AA contrast, per-route document title + meta description, lazy-loaded images, keyboard-navigable menus/accordions/chat.
Build every page completely. Do not leave placeholder "coming soon" sections. Make reasonable design decisions without asking me.
```

---

# PART B: BUILD PROMPTS (paste one at a time, in order)

## Prompt 1: Foundation, design system, navigation, routing, footer

```
Set up the foundation for the ALPHORAA site using the Project Knowledge.

1. Design system: configure Tailwind with the brand colour tokens, Sora/Inter fonts, radius and shadow scale, and a blue→orange gradient utility. Create reusable Button (primary gradient, secondary outline, ghost, with arrow icon variant), Section wrapper (consistent spacing + eyebrow label + heading), Container, Badge, and a "DemoTag" component.
2. Animation foundation: /src/animations/variants.ts (as specified), a reusable <Reveal> component, <WordReveal> heading component, <Stagger> wrapper, a useReducedMotion hook, and a PageTransition wrapper used in App.tsx with AnimatePresence.
3. Routing (React Router, every route must render a real page): / , /services, /services/:slug, /solutions, /solutions/:slug, /products, /products/:slug, /portfolio, /portfolio/:slug, /about, /insights, /insights/:slug, /contact, * (custom 404). Scroll to top on route change. Pages not yet built can show a styled page header for now; I will ask for them in later prompts.
4. Header: sticky, official-style ALPHORAA logo on the left (build an SVG wordmark: a stylised "A" mark with an orange accent + "ALPHORAA" text), links centred (Home, Services, Solutions, Products, Portfolio, About Us, Insights, Contact), "Let's Talk" gradient CTA on the right linking to /contact. Transparent over the hero, switching to white with a subtle shadow after 40px scroll (smooth transition). Animated underline on hover and active route. Services and Solutions open an animated mega-menu/dropdown listing their items (from data) with icon + one-line description, closing on outside click and Escape. Mobile: hamburger opening a full-height slide-in panel with staggered links and accordion sub-menus, body scroll locked while open.
5. Footer: four columns. (1) logo, short description, social icons (LinkedIn, X, GitHub, YouTube with real hover states; URLs are "#" placeholders flagged in the data file). (2) Quick Links. (3) Services. (4) Contact info using clearly marked placeholders (email, phone, address). Bottom bar: copyright + Privacy Policy, Terms & Conditions, Cookie Policy (create simple placeholder legal pages at /privacy, /terms, /cookies).
6. Data: create /src/data with typed files: services.ts (8 services), industries.ts (8), products.ts (demo placeholders), projects.ts, posts.ts, faqs.ts, navigation.ts. Services: Agentic AI Development; AI & Machine Learning Solutions; AI Automation; Custom Software Development; Web & Application Development; Enterprise AI Solutions; AI Chatbots & Conversational AI; Cloud & Technology Solutions. Industries: Healthcare; Finance & Banking; Manufacturing; Retail & E-commerce; Education; Real Estate; Logistics & Supply Chain; Enterprise Operations. Write realistic, non-fabricated descriptions (capabilities and typical use cases only, no fake results).
```

## Prompt 2: Hero, technology marquee, About

```
Build the first three homepage sections in /pages/Home as separate components.

SECTION 01 HERO (min-h-screen, two columns, stacked on mobile with the visual below the text):
- H1: "Building the Future with Agentic AI." Word-by-word reveal. "Agentic AI." gets the blue→orange gradient text.
- Paragraph: "Transforming businesses through intelligent AI systems, autonomous agents and next-generation automation. We engineer intelligent solutions that help businesses operate smarter, faster and better." Staggered fade-up after the heading.
- Buttons: "Explore Our Services" (primary, → /services) and "Let's Build Together" (outline, → /contact), with entrance animation.
- Under the buttons: three small capability chips (e.g. "Agentic AI", "Automation", "Enterprise-ready"). Capabilities only, no statistics.
- Right column: an interactive SVG "AI ecosystem". A central glowing AI core (concentric rings slowly rotating, orange accent) connected by curved lines to five agent nodes: Research Agent, Data Agent, Automation Agent, Customer Support Agent, Business Intelligence Agent. Each node is a rounded glass card with a Lucide icon and label.
  - Connection lines draw in on load (pathLength animation), then small light pulses travel along them continuously.
  - Nodes float gently (y ±8px, staggered durations 5 to 8s).
  - Hovering a node highlights its connection, scales it slightly and shows a one-line tooltip of what that agent does.
  - Mouse-based parallax: core, nodes and particles move at different depths using useMotionValue/useSpring. Disable on touch devices and for reduced motion.
  - 20 to 30 tiny floating particles; drifting blue and orange gradient orbs in the background at low opacity.
- Background: Off White → Light Blue with a faint grid/dot pattern fading out at the edges. Header is transparent here.

SECTION 02 TECHNOLOGY STRIP: heading "Intelligence That Moves Businesses Forward." Continuous horizontal marquee (CSS/Framer, GPU transform, seamless loop) with: Artificial Intelligence, Agentic AI, Machine Learning, Intelligent Automation, Cloud Technologies, Enterprise Solutions, each with an icon. Pauses on hover, edge fade masks, static wrapped row when reduced motion is on.

SECTION 03 ABOUT: heading "Beyond Traditional Technology. Into Intelligent Possibilities." Body: "At ALPHORAA AI INNOVATIONS, we believe the future of technology lies in intelligent systems that can understand, adapt and act. We focus on building innovative AI-powered solutions that simplify complex operations, automate workflows and unlock new possibilities for businesses." Include Mission and Vision cards (write sensible demo copy, flagged as editable), a "Learn More" button → /about, and an SVG ecosystem illustration with elegant connecting lines that draw on scroll. Text slides in from the left, illustration from the right, with floating elements.
```

## Prompt 3: Services, Industries, Products

```
Continue the homepage.

SECTION 04 SERVICES: heading "Intelligent Services. Measurable Impact." Render the 8 services as a varied, designed layout, NOT a plain 4x2 grid of identical boxes: for example a bento-style grid where 2 cards are larger and the rest are standard, each with a unique custom SVG/Lucide-based icon illustration. Each card: icon, title, short description, "Explore Service" link with an animated arrow. Hover: lift, animated gradient border, icon transformation (rotate/morph or colour fill), gradient wash reveal, arrow slides right. The whole card is a link to /services/:slug. Staggered scroll reveal.

SECTION 05 INDUSTRIES: heading "AI Solutions Across Industries." Interactive horizontal slider (drag/scroll-snap with prev/next buttons and progress indicator, keyboard accessible) of 8 industry cards. Each: industry name, an abstract SVG illustration unique per industry, "Business challenges" (2 to 3 bullets), "Potential AI applications" (2 to 3 bullets), and an "Explore Solutions" CTA → /solutions/:slug. Cards must be described as potential applications, not delivered results. Also build the /solutions page (grid of all industries) and a reusable /solutions/:slug detail template.

SECTION 06 PRODUCTS: heading "Innovative Products. Intelligent Experiences." A premium showcase with 3 clearly labelled DEMO placeholder products (e.g. "Demo Product A: AI Agent Console", "Demo Product B: Workflow Automation Studio", "Demo Product C: Insights Dashboard"). Each shows: name, category, a realistic dashboard mockup built in code (sidebar, top bar, KPI tiles with placeholder values, a line/bar chart in SVG, a table, status chips; consistent visual style, subtle floating animation, tilt on hover), description, 4 key features, and a "Visit Product" CTA → /products/:slug. Use tabs or a sticky scroll-switch so one product is featured at a time with an animated transition. Add a visible note "Placeholder products. Real product details will be supplied." Also build /products and a reusable /products/:slug template.
```

## Prompt 4: Portfolio, Why Choose, Tech Ecosystem, How We Work

```
Continue the homepage.

SECTION 07 PORTFOLIO PREVIEW: heading "Turning Intelligent Ideas Into Real-World Solutions." Filter pills: All Projects, Agentic AI, AI & ML, Automation, Web Applications, Enterprise Solutions. Working filtering with animated layout transitions (AnimatePresence + layout) and an empty state. Create 6 to 8 DEMO projects in data/projects.ts, each with a generated SVG/gradient cover (no external photos), title, industry, tech stack tags, short description, and "View Case Study" → /portfolio/:slug. Mark every project "Demo case study" and use NO real client names and NO claimed metrics.
Also build the full /portfolio page (same filters, search box, grid) and the /portfolio/:slug case study template with sections: 1 Project Overview, 2 Problem Statement, 3 Proposed Solution, 4 Technology Stack, 5 Implementation Approach, 6 Key Features, 7 Results and Outcomes (write this as "Intended outcomes / to be confirmed", never invented numbers). Sticky in-page section nav, progress bar, previous/next project links.

SECTION 08 WHY CHOOSE ALPHORAA: heading "Why Businesses Choose Intelligent Innovation." Six interactive differentiators: AI-First Approach, Business-Focused Innovation, Scalable Technology, Intelligent Automation, Custom-Built Solutions, Continuous Innovation. Use an interactive layout (e.g. a left list that controls a right detail panel with animated icon, or hover-expanding cards), with animated line-drawn icons and scroll reveals. No statistics.

SECTION 09 TECHNOLOGY ECOSYSTEM: heading "Powered by Modern Technologies." Categories: AI & ML (Python, TensorFlow, PyTorch, OpenAI APIs); Frontend (React, Next.js, TypeScript); Backend (Node.js, FastAPI, Python); Database (PostgreSQL, MongoDB); Cloud (AWS, Azure, Google Cloud, Cloudflare); Automation (AI Agents, Workflow Automation, API Integrations). Build an interactive grid: category tabs or hover-focus with tech tiles that animate in, using simple monochrome text/icon tiles (no copied logos). Add the note "Proposed technology capabilities, pending confirmation."

SECTION 10 HOW WE WORK: heading "From Business Challenges to Intelligent Solutions." Five steps: Discover, Strategize, Design, Develop, Deploy & Optimize. Desktop: horizontal timeline with a progress line that fills as the section scrolls (useScroll + scaleX), step nodes that activate in sequence (colour fill, ring pulse, animated icon), and a detail card that swaps with a smooth transition for the active step; steps are also clickable. Mobile: vertical timeline with the line filling downward.
```

## Prompt 5: Insights, Testimonials, FAQ, Final CTA, Newsletter

```
Finish the homepage.

SECTION 11 INSIGHTS: heading "Explore the Future of AI." Six blog cards covering Agentic AI, AI Trends, Business Automation, Machine Learning, Technology Innovations, Industry Applications. Each: generated SVG/gradient cover with image-zoom hover, category badge, publication date, title, description, "Read More" → /insights/:slug. Write realistic, general-knowledge demo articles (no fake statistics or quotes), flagged "Demo article". Also build /insights (category filter + cards) and a reusable article template with reading progress bar, estimated read time, related posts, and a share/copy-link button that actually copies.

EXTRA SECTIONS (clearly flagged as demo content):
- Testimonials: carousel with 3 placeholder testimonials labelled "Sample testimonial. Replace with real client feedback." Autoplay pauses on hover, with arrows and dots.
- FAQ: accessible accordion (animated height, one open at a time, keyboard support) with 6 to 8 questions about services, process, engagement models and timelines, answered generically without invented claims.
- Newsletter: email input with validation, loading state, and success message. State clearly that it is a frontend simulation.

SECTION 12 FINAL CTA: heading "Ready to Build Something Intelligent?" Description: "Let's turn your ideas into intelligent solutions. Connect with ALPHORAA AI INNOVATIONS and discover what's possible with next-generation AI." Buttons: "Start a Project" (→ /contact) and "Talk to Our AI Assistant" (opens the chatbot via a shared context/store). Deep-blue gradient background, animated network of connected nodes (canvas or SVG, capped node count, pauses off-screen), orange accents.

SECTION 13 is the footer from Prompt 1. Confirm the homepage renders all 13 sections in the right order.
```

## Prompt 6: Services pages and Contact page

```
Build these pages completely.

1. /services (Services Listing): animated page header with breadcrumb; all 8 services as large alternating rows (visual left/right) with description, 3 to 4 capability bullets, typical use cases and a link to the detail page; a "How we work" mini-strip; final CTA.
2. /services/:slug (Service Details template driven by data, works for all 8): hero with title and tagline; overview; "What we build" feature grid; typical use cases; process steps; technologies (flagged "proposed"); an FAQ specific to the service; related services; sticky side CTA card "Discuss this service" that pre-selects this service in the contact form via a query param. Unknown slug → 404 page.
3. /contact: two-column layout. Left: heading, short intro, placeholder contact details (flagged), office/hours placeholders, social links, a stylised SVG map or location card (no external map embed required). Right: the enquiry form with fields Full Name, Business Email, Phone Number, Company Name, Service Required (select of the 8 services + "Other"), Project Budget (select of ranges, including "Not sure yet"), Project Description (textarea with character counter).
   - Validation: required fields, email regex, phone validation (7 to 15 digits, allowing +, spaces, dashes), min length on description. Inline error messages with aria-describedby, errors shown on blur and on submit, focus moves to the first invalid field.
   - Submit: loading spinner state, ~1.5s simulated delay, then an animated success confirmation with a summary and a "Send another enquiry" reset button. Include a small honest note: "Demo form. No data is sent."
   - Pre-select the service from the ?service= query param.
```

## Prompt 7: Chatbot and global utilities

```
Add global components available on every page.

1. ALPHORAA AI ASSISTANT chatbot (floating, bottom-right, above the back-to-top button):
   - Floating round button with the assistant icon and an animated notification dot (pulse). Opens a panel with a smooth scale/slide animation; on mobile the panel becomes a full-screen bottom sheet. Header has the name, a "Demo assistant" label, minimise and close buttons. Scrollable message area with auto-scroll, user/assistant bubbles, timestamps, typing indicator (three animated dots) before each reply, and quick reply chips.
   - Welcome message (exact): "Hello! Welcome to ALPHORAA AI INNOVATIONS.\n\nI'm your AI assistant. I can help you explore our services, discover our solutions, learn about our products or connect with our team.\n\nHow can I assist you today?"
   - Quick actions: Explore AI Services, Discover Our Products, Request a Project Quote, Talk to Our Team. Each triggers a predefined reply with relevant action buttons that navigate (e.g. to /services, /products, /contact).
   - Free-text input uses simple keyword matching against a predefined response map (services, products, pricing, contact, industries, about) with a friendly fallback that offers the quick actions. IMPORTANT: it is a scripted demo. Show "Demo assistant: scripted responses" in the panel and never claim to be a real AI model.
   - State lives in a context so other buttons (like "Talk to Our AI Assistant") can open it. Escape closes it, focus is trapped while open, aria-live for new messages.
2. WhatsApp floating button with a placeholder URL (https://wa.me/0000000000, flagged in data/config.ts).
3. Back-to-top button that appears after 600px scroll with smooth scrolling.
4. Cookie consent banner (Accept / Reject / Learn more → /cookies) that stores the choice in localStorage inside try/catch and animates in and out.
5. Route-level loading skeletons (Suspense with React.lazy for pages) and a custom 404 page with an animated network visual and links home/services/contact.
6. Per-route document title and meta description via a small useDocumentMeta hook.
```

## Prompt 8: Responsive, accessibility, performance QA pass

```
Do a complete QA and polish pass without redesigning anything.

- Test and fix at 320, 375, 768, 1024, 1440 and 1920px: no horizontal overflow, readable fluid type (clamp), proper spacing, touch targets ≥44px, mobile layouts that are properly adapted (not shrunken desktop): vertical timeline, bottom-sheet chat, slide-in menu, stacked hero.
- Click-test every route, nav link, mega-menu item, CTA, card, filter, slider control, tab, accordion, form state, chatbot quick action and footer link. Remove or wire up any dead control.
- Accessibility: one h1 per page, correct heading order, alt text on all images/SVGs (aria-hidden on decorative ones), visible focus rings, keyboard operation of menus/slider/accordion/chat, AA contrast on text over gradients, labels on all form fields.
- Motion: confirm prefers-reduced-motion disables parallax, floating, marquee and particles; ensure only transform/opacity animate; pause canvas/SVG loops when off-screen (IntersectionObserver); reduce particle counts on small screens.
- Performance: lazy-load routes and below-the-fold images, avoid layout shift, no unused dependencies.
- Fix all TypeScript errors, console warnings and broken imports, and confirm the production build succeeds.
Then list any remaining limitations.
```

---

# PART C: FIX-IT PROMPTS

**Looks generic / too template-like**
```
The design feels generic. Increase visual distinctiveness: stronger type scale contrast, more asymmetric layouts, bigger whitespace, fewer identical cards, and one memorable signature element (a continuous animated neural-line that connects sections as the user scrolls). Keep the brand palette and keep motion subtle.
```

**Animations janky or heavy**
```
Optimise animation performance. Only animate transform and opacity, remove box-shadow/blur animations, add will-change only where needed, pause off-screen loops with IntersectionObserver, cut particles by 50% on mobile, and honour prefers-reduced-motion.
```

**AI Studio put everything in one file**
```
Refactor into the multi-file architecture from the Project Knowledge (components/, pages/, data/, animations/, hooks/, types/). Do not change visuals or behaviour.
```

**Add 3D hero (optional, after everything else works)**
```
Replace the central AI core in the hero with a lightweight React Three Fiber scene: a slowly rotating wireframe icosahedron with an orange inner glow and orbiting small spheres. Lazy-load it, cap DPR at 1.5, fall back to the existing SVG core on mobile, low-power devices and reduced motion. Keep the agent nodes as HTML overlays.
```

**Something is broken**
```
[Describe what you see, which route, which screen size]. Find the root cause, fix it without changing unrelated code, and confirm the build still passes.
```

---

## Changes from your original prompt (and why)

- **Split into stages.** Lovable and AI Studio lose detail on very long prompts. Staging gives each section full attention.
- **Removed terminal/workflow steps** ("inspect project files", "run the build", "list installed dependencies"). Those suit an agent with a shell. In Lovable and AI Studio the build is automatic.
- **Removed references to an "attached requirement document".** The tools cannot see it, so the needed content is now inlined.
- **Hero uses SVG + Framer Motion first; Three.js moved to an optional add-on.** It is far more reliable in both builders and lighter on mobile.
- **Made the honesty rules concrete.** Demo tags, no fake stats, and "scripted demo" labels are repeated where they apply, so the tools don't quietly invent content.
- **Added precise animation specs** (easings, durations, distances, stagger values), so motion looks intentional instead of generic.
- **Dropped Next.js** from the stack. Lovable doesn't support it. Next.js stays listed only as a "proposed technology" tile.
