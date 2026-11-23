import React from 'react';

interface AgentIconProps {
  className?: string;
  active?: boolean;
}

/**
 * Bespoke ALPHORAA Agentic AI Icon
 * Features a futuristic cybernetic visor chassis, glowing dual photon optical lenses,
 * a central cognitive neural spark, and dual orbital neural transmission nodes.
 */
export function AgentIcon({ className = 'w-6 h-6', active = false }: AgentIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="agentAuraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5BB4F5" />
          <stop offset="50%" stopColor="#1769AA" />
          <stop offset="100%" stopColor="#F36B21" />
        </linearGradient>
        <radialGradient id="agentCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F36B21" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#1769AA" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. Outer Concentric Cyber Orbit Ring */}
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="url(#agentAuraGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="3 4"
        opacity="0.55"
      />

      {/* 2. Cybernetic Agent Helmet / Visor Chassis */}
      <path
        d="M 9.5 13 C 9.5 9 12.2 6.5 16 6.5 C 19.8 6.5 22.5 9 22.5 13 L 22.5 18 C 22.5 21.5 19.2 24.5 16 25.5 C 12.8 24.5 9.5 21.5 9.5 18 Z"
        fill="#0A0A0A"
        stroke="url(#agentAuraGrad)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* 3. Central Cognitive Forehead Core (Neural Node) */}
      <circle cx="16" cy="10" r="1.4" fill="#F36B21" />
      <circle cx="16" cy="10" r="2.8" fill="url(#agentCoreGlow)" />

      {/* 4. Streamlined Cybernetic Dual Visor Lenses */}
      <path
        d="M 11 15 C 12.5 14.5 14.5 14.5 16 14.5 C 17.5 14.5 19.5 14.5 21 15 C 21.5 15.3 21.8 16.5 21 17.2 C 19.5 18.2 17.5 18.5 16 18.5 C 14.5 18.5 12.5 18.2 11 17.2 C 10.2 16.5 10.5 15.3 11 15 Z"
        fill="#141414"
        stroke="#5BB4F5"
        strokeWidth="1.1"
      />

      {/* 5. Glowing Photon Optical Eyes */}
      <rect x="12.5" y="15.8" width="2.4" height="1.4" rx="0.7" fill="#F36B21" />
      <rect x="17.1" y="15.8" width="2.4" height="1.4" rx="0.7" fill="#5BB4F5" />

      {/* 6. Lateral Neural Transmission Contacts */}
      <line x1="7.5" y1="14" x2="9.5" y2="14" stroke="#5BB4F5" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22.5" y1="14" x2="24.5" y2="14" stroke="#F36B21" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="14" r="1" fill="#5BB4F5" />
      <circle cx="25" cy="14" r="1" fill="#F36B21" />

      {/* 7. Lower Precision Guardrail Reticle */}
      <path
        d="M 14.5 22.5 L 16 23.5 L 17.5 22.5"
        stroke="#5BB4F5"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
