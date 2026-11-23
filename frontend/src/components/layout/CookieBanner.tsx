import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { EASE_SETTLE } from '../../animations/variants';

const STORAGE_KEY = 'alphoraa_cookie_consent_v1';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const timer = window.setTimeout(() => setVisible(true), 800);
        return () => window.clearTimeout(timer);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleChoice = (choice: 'accepted' | 'rejected') => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Ignore storage errors in restricted contexts
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: EASE_SETTLE }}
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-[0_16px_40px_-12px_rgba(18,59,96,0.2)] p-4 sm:p-5"
        >
          <p className="text-xs sm:text-sm text-white leading-relaxed">
            We use essential browser storage to remember your preferences on this frontend preview.{' '}
            <Link to="/cookies" className="font-semibold text-[#5BB4F5] underline underline-offset-2">
              Learn more
            </Link>
            .
          </p>
          <div className="mt-3.5 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleChoice('accepted')}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#1769AA] hover:bg-[#2B86C5] transition-colors min-h-[38px] cursor-pointer"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => handleChoice('rejected')}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/10 transition-colors min-h-[38px] cursor-pointer"
            >
              Reject
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
