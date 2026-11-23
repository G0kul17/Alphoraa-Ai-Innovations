import { Compass, Eye } from 'lucide-react';
import { Section } from '../common/Section';
import { Button } from '../common/Button';
import { DemoTag } from '../common/DemoTag';
import { Reveal } from '../animations/Reveal';
import { AgentIdCard } from '../motion/AgentIdCard';
import { slideLeft, slideRight } from '../../animations/variants';
import { SITE_CONFIG } from '../../data/config';

export function AboutSection() {
  return (
    <Section id="about" className="bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left: Copy + Mission/Vision */}
        <Reveal variants={slideLeft} className="lg:col-span-6 space-y-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#5BB4F5] mb-3">
              <span className="font-mono">02 / </span>About
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.35rem] font-bold tracking-tight text-white leading-[1.18]">
              Beyond Traditional Technology. Into Intelligent Possibilities.
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            At ALPHORAA AI INNOVATIONS, we believe the future of technology lies in intelligent systems that can understand, adapt and act. We focus on building innovative AI-powered solutions that simplify complex operations, automate workflows and unlock new possibilities for businesses.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-[0_4px_24px_-4px_rgba(18,59,96,0.05)] space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="w-9 h-9 rounded-xl bg-[#141414] text-[#5BB4F5] flex items-center justify-center">
                  <Compass className="w-4 h-4" aria-hidden="true" />
                </span>
                <DemoTag label={SITE_CONFIG.mission.note} />
              </div>
              <h3 className="font-display text-base font-semibold text-white">
                {SITE_CONFIG.mission.title}
              </h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                {SITE_CONFIG.mission.body}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-[0_4px_24px_-4px_rgba(18,59,96,0.05)] space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="w-9 h-9 rounded-xl bg-[#141414] text-[#F36B21] flex items-center justify-center">
                  <Eye className="w-4 h-4" aria-hidden="true" />
                </span>
                <DemoTag label={SITE_CONFIG.vision.note} />
              </div>
              <h3 className="font-display text-base font-semibold text-white">
                {SITE_CONFIG.vision.title}
              </h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                {SITE_CONFIG.vision.body}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Button to="/about" variant="secondary" withArrow>
              Learn More
            </Button>
          </div>
        </Reveal>

        {/* Right: Pass-style 3D AI Agent ID Card */}
        <Reveal variants={slideRight} className="lg:col-span-6">
          <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#141414] via-[#0A0A0A] to-black border border-white/10 shadow-[0_12px_36px_-12px_rgba(18,59,96,0.08)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#EAF4FB]">
                Interactive Agent Pass
              </p>
              <DemoTag label="Demo pass — tilt & click to flip" />
            </div>
            <AgentIdCard />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
