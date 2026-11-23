import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { Button } from '../common/Button';
import { IconRenderer } from '../common/IconRenderer';
import { MAIN_NAV_ITEMS } from '../../data/navigation';
import { SERVICES } from '../../data/services';
import { INDUSTRIES } from '../../data/industries';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useSmoothScroll } from '../../context/SmoothScrollContext';
import { EASE_SETTLE } from '../../animations/variants';

export function Header() {
  const scrollY = useScrollPosition();
  const location = useLocation();
  const { setLocked } = useSmoothScroll();
  const isHome = location.pathname === '/';
  const isScrolled = scrollY > 40 || !isHome;
  const isTransparentDarkHero = isHome && !isScrolled;

  const [openMenu, setOpenMenu] = useState<'services' | 'solutions' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<'services' | 'solutions' | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setLocked(mobileOpen);
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
        setLocked(false);
      };
    }
  }, [mobileOpen, setLocked]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md shadow-[0_6px_24px_-8px_rgba(18,59,96,0.12)] border-b border-white/10 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className={`mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-8 ${isTransparentDarkHero ? 'keep-dark' : ''}`}>
        {/* Zone 1: Brand wordmark switches light over dark hero -> dark on scrolled/inner */}
        <Logo variant={isTransparentDarkHero ? 'light' : 'dark'} />

        {/* Zone 2: Desktop centered navigation */}
        <nav className="hidden xl:flex items-center gap-6" aria-label="Main navigation">
          {MAIN_NAV_ITEMS.map((item) => {
            if (item.hasMegaMenu) {
              const menuKey = item.hasMegaMenu;
              const isActive =
                location.pathname.startsWith(item.path) || openMenu === menuKey;
              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(menuKey)}
                  onMouseLeave={() => setOpenMenu((prev) => (prev === menuKey ? null : prev))}
                >
                  <button
                    type="button"
                    aria-expanded={openMenu === menuKey}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMenu((prev) => (prev === menuKey ? null : menuKey))
                    }
                    className={`relative py-2 inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isTransparentDarkHero
                        ? isActive
                          ? 'text-[#F36B21]'
                          : 'text-white/90 hover:text-white'
                        : isActive
                        ? 'text-[#5BB4F5]'
                        : 'text-white hover:text-[#5BB4F5]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openMenu === menuKey ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`absolute bottom-1 left-0 h-[2px] transition-all duration-200 ${
                        isTransparentDarkHero ? 'bg-[#F36B21]' : 'bg-[#1769AA]'
                      } ${isActive ? 'w-full' : 'w-0'}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `group relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                    isTransparentDarkHero
                      ? isActive
                        ? 'text-[#F36B21]'
                        : 'text-white/90 hover:text-white'
                      : isActive
                      ? 'text-[#5BB4F5]'
                      : 'text-white hover:text-[#5BB4F5]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-1 left-0 h-[2px] transition-all duration-200 ${
                        isTransparentDarkHero ? 'bg-[#F36B21]' : 'bg-[#1769AA]'
                      } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                      aria-hidden="true"
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Zone 3: Magnetic Primary CTA + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <div className="hidden sm:block">
            <Button to="/contact" size="sm" withArrow magnetic>
              Let&apos;s Talk
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            className={`xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border transition-colors cursor-pointer ${
              isTransparentDarkHero
                ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
                : 'border-white/10 bg-black/90 text-[#EAF4FB] hover:bg-white/10'
            }`}
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: EASE_SETTLE }}
            onMouseEnter={() => setOpenMenu(openMenu)}
            onMouseLeave={() => setOpenMenu(null)}
            className="hidden xl:block absolute left-0 right-0 top-full bg-[#0A0A0A] border-t border-white/10 shadow-[0_24px_48px_-16px_rgba(18,59,96,0.16)]"
          >
            <div className="mx-auto max-w-[1280px] px-8 py-7">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5BB4F5]">
                  {openMenu === 'services'
                    ? 'Capabilities & Engineering Services'
                    : 'Industry Applications'}
                </p>
                <Link
                  to={openMenu === 'services' ? '/services' : '/solutions'}
                  className="text-xs font-semibold text-[#5BB4F5] hover:text-[#F36B21] transition-colors"
                >
                  View all {openMenu === 'services' ? 'Services' : 'Solutions'} &rarr;
                </Link>
              </div>

              {openMenu === 'services' ? (
                <div className="grid grid-cols-4 gap-3">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.slug}`}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#141414] text-[#5BB4F5] flex items-center justify-center shrink-0 group-hover:bg-[#1769AA] group-hover:text-white transition-colors">
                        <IconRenderer name={service.icon} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white group-hover:text-[#5BB4F5] transition-colors">
                          {service.title}
                        </p>
                        <p className="text-xs text-[#9CA3AF] line-clamp-2 mt-0.5 leading-snug">
                          {service.tagline}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {INDUSTRIES.map((ind) => (
                    <Link
                      key={ind.id}
                      to={`/solutions/${ind.slug}`}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#141414] text-[#5BB4F5] flex items-center justify-center shrink-0 group-hover:bg-[#1769AA] group-hover:text-white transition-colors">
                        <IconRenderer name={ind.icon} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white group-hover:text-[#5BB4F5] transition-colors">
                          {ind.name}
                        </p>
                        <p className="text-xs text-[#9CA3AF] line-clamp-2 mt-0.5 leading-snug">
                          {ind.tagline}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Slide-In Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 xl:hidden bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: EASE_SETTLE }}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto w-full max-w-sm h-[100dvh] bg-[#0A0A0A] shadow-2xl flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <Logo variant="dark" />
                <div className="flex items-center gap-1">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
                </div>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1" aria-label="Mobile navigation links">
                {MAIN_NAV_ITEMS.map((item, idx) => {
                  if (item.hasMegaMenu) {
                    const key = item.hasMegaMenu;
                    const expanded = mobileAccordion === key;
                    const subItems =
                      key === 'services'
                        ? SERVICES.map((s) => ({ label: s.title, to: `/services/${s.slug}` }))
                        : INDUSTRIES.map((i) => ({ label: i.name, to: `/solutions/${i.slug}` }));
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="border-b border-white/5 py-1"
                      >
                        <div className="flex items-center justify-between">
                          <Link
                            to={item.path}
                            className="py-2.5 text-base font-medium text-white"
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setMobileAccordion(expanded ? null : key)}
                            aria-expanded={expanded}
                            aria-label={`Toggle ${item.label} submenu`}
                            className="w-11 h-11 inline-flex items-center justify-center rounded-lg text-[#9CA3AF] hover:bg-white/10 cursor-pointer"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                expanded ? 'rotate-180 text-[#5BB4F5]' : ''
                              }`}
                            />
                          </button>
                        </div>
                        {expanded && (
                          <div className="pl-3 pb-3 space-y-1">
                            {subItems.map((sub) => (
                              <Link
                                key={sub.to}
                                to={sub.to}
                                className="block py-2 text-sm text-[#9CA3AF] hover:text-[#5BB4F5]"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="border-b border-white/5"
                    >
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                          `block py-3 text-base font-medium ${
                            isActive ? 'text-[#5BB4F5]' : 'text-white'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="p-5 border-t border-white/5 bg-black">
                <Button to="/contact" size="md" withArrow className="w-full">
                  Let&apos;s Talk
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
