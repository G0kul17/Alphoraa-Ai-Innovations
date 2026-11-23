# Alphoraa-Ai-Innovations

<p align="center">
  <img src="frontend/public/brand/logo-mark.png" alt="ALPHORAA AI INNOVATIONS logo" height="96" />
</p>

A premium, animated, fully responsive web application and digital presence for **ALPHORAA AI INNOVATIONS** ([www.alphoraa.ai](http://www.alphoraa.ai)), engineered for Artificial Intelligence, Agentic AI, Autonomous Systems, and Next-Generation Automation.

---

## 🚀 Overview

Alphoraa AI Innovations empowers enterprises to bridge the gap between static software and autonomous cognition. This repository houses the complete frontend platform, featuring an interactive 3D neural swarm scrollytelling engine, interactive Agentic AI ecosystem explorer, 3D Coverflow industry showcase, dark/light theme engine, and simulated AI concierge.

## ✨ Features & Architecture

- **Interactive Agentic AI Ecosystem Hero:** Radial orbit node visualizer for autonomous agents (Research, Data, Automation, Customer Support, and Business Intelligence Agents) with dynamic focus cards and collision-aware layout.
- **3D Scrollytelling Engine:** Three.js-powered neural swarm orb with smooth FPS-locked lerp interpolation, phase triggers, and viewport performance optimizations.
- **Dynamic 3D Coverflow Industry Showcase:** Multi-sector AI capability profiles featuring glassmorphic holographic reflection, 3D mouse parallax tilt, and quick-nav sector tabs.
- **Comprehensive Theming:** Default deep cybernetic dark mode with high-contrast light mode toggle (`localStorage` persistence, flash-prevention script).
- **Responsive Navigation & Mega Menu:** Multi-tier service and solution matrices with animated modals and mobile drawer.
- **Floating AI Concierge:** Real-time conversational interface mockup with custom vector Agentic iconography and animated status indicators.
- **Production Performance:** Lazy-loaded routes, throttled resize/scroll observers, and strict `prefers-reduced-motion` accessibility support.

## 🛠️ Tech Stack

| Domain | Stack |
| :--- | :--- |
| **Framework** | React 19 + TypeScript |
| **Build & Tooling** | Vite |
| **Styling & Design System** | Tailwind CSS 4 |
| **Motion & 3D** | Framer Motion, Three.js, Lucide Icons |
| **Routing** | React Router DOM v7 |

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation & Run

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Run production build
npm run build

# Preview production build
npm run preview

# Type-check & lint
npm run lint
```

> **Note for Windows paths containing `&`:** The repository's npm scripts call `node ./node_modules/<package>/...` directly to ensure safe execution in all directory environments.

## 📂 Repository Structure

```text
Alphoraa-Ai-Innovations/
├── frontend/
│   ├── public/brand/       # Brand icons, favicons, vector marks
│   ├── scripts/            # Theme generator scripts
│   ├── src/
│   │   ├── animations/     # Framer Motion orchestration variants
│   │   ├── components/     # Component architecture
│   │   │   ├── animations/ # Reveal, Stagger, WordReveal
│   │   │   ├── chatbot/    # Floating AI assistant
│   │   │   ├── common/     # Buttons, Logo, ThemeToggle, AgentIcon
│   │   │   ├── home/       # Hero, Story3D, Industries, Services
│   │   │   ├── layout/     # Header, Footer, FloatingUtilities
│   │   │   └── motion/     # Preloader, Cursor, Dynamic dividers
│   │   ├── context/        # Chatbot, SmoothScroll, and Theme providers
│   │   ├── data/           # Structured CMS/service data
│   │   ├── hooks/          # Custom hooks (scroll, resize, reduced-motion)
│   │   ├── pages/          # Application route views
│   │   └── types/          # TypeScript interface definitions
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── .gitignore
└── README.md
```

## 📄 License & Rights

Proprietary. © ALPHORAA AI INNOVATIONS. All rights reserved.
