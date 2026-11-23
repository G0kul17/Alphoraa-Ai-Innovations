import { ArrowUp, MessageCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useChatbot } from '../../context/ChatbotContext';
import { useSmoothScroll } from '../../context/SmoothScrollContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { SITE_CONFIG } from '../../data/config';
import { AgentIcon } from '../common/AgentIcon';

export function FloatingUtilities() {
  const scrollY = useScrollPosition();
  const { isOpen, toggleChat } = useChatbot();
  const { scrollTo } = useSmoothScroll();
  const showBackToTop = scrollY > 600;

  const scrollToTop = () => {
    scrollTo(0);
  };

  return (
    <div className="keep-dark fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Bespoke Agent Launcher with Rotating Cyber Ring & Hover Pill */}
      <div className="relative flex items-center justify-end group pointer-events-auto">
        {/* Tooltip Pill on Hover - Always White & Crystal Clear in Both Themes */}
        <div
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 mr-3 rounded-full border border-[#F36B21]/60 shadow-2xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap"
          style={{
            backgroundColor: '#0A0A0A',
            color: '#FFFFFF',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#F36B21] animate-pulse" />
          <span
            className="text-xs font-bold tracking-wide"
            style={{ color: '#FFFFFF' }}
          >
            Ask ALPHORAA AI
          </span>
          <span
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-[#5BB4F5]/40"
            style={{
              backgroundColor: 'rgba(23, 105, 170, 0.35)',
              color: '#5BB4F5',
            }}
          >
            ONLINE
          </span>
        </div>

        <button
          type="button"
          onClick={toggleChat}
          aria-label={isOpen ? 'Close ALPHORAA AI Assistant' : 'Open ALPHORAA AI Assistant'}
          aria-expanded={isOpen}
          className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(243,107,33,0.4),0_0_20px_rgba(23,105,170,0.35)]"
          style={{ backgroundColor: '#0A0A0A' }}
        >
          {/* Outer Cyber Gradient Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1769AA] via-[#F36B21] to-[#5BB4F5] p-[2.5px] transition-transform duration-700 group-hover:rotate-180">
            {/* Inner Dark Cyber Core with Protected Background */}
            <div
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(180deg, #17212B 0%, #0A0A0A 100%)' }}
            />
          </div>

          {/* Bespoke Agent Icon (or X when open) */}
          <div className="relative z-10 flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6 text-white transition-transform duration-200 group-hover:rotate-90" aria-hidden="true" />
            ) : (
              <AgentIcon className="w-7 h-7 text-white drop-shadow-[0_0_10px_rgba(243,107,33,0.7)] group-hover:scale-110 transition-transform duration-200" />
            )}
          </div>

          {/* Glowing Status Dot */}
          {!isOpen && (
            <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F36B21] opacity-75" />
              <span
                className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#F36B21]"
                style={{ border: '2px solid #0A0A0A' }}
              />
            </span>
          )}
        </button>
      </div>

      {/* WhatsApp Link */}
      <a
        href={SITE_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp chat (placeholder URL)"
        title="WhatsApp (Placeholder URL)"
        className="pointer-events-auto w-11 h-11 rounded-full text-[#EAF4FB] border border-white/10 shadow-md flex items-center justify-center hover:scale-105 transition-all"
        style={{
          backgroundColor: '#0A0A0A',
          color: '#EAF4FB',
        }}
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
      </a>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="pointer-events-auto w-11 h-11 rounded-full text-white shadow-md flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
            style={{ backgroundColor: '#1769AA', color: '#FFFFFF' }}
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
