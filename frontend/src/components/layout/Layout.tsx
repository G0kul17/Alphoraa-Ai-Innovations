import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { FloatingUtilities } from './FloatingUtilities';
import { Chatbot } from '../chatbot/Chatbot';
import { Preloader } from '../motion/Preloader';
import { CustomCursor } from '../motion/CustomCursor';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Preloader />
      <CustomCursor />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1769AA] focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingUtilities />
      <Chatbot />
      <CookieBanner />
    </div>
  );
}
