import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ChevronDown, CheckCircle2, Mail } from 'lucide-react';
import { Section } from '../common/Section';
import { DemoTag } from '../common/DemoTag';
import { SAMPLE_TESTIMONIALS } from '../../data/testimonials';
import { GENERAL_FAQS } from '../../data/faqs';
import { EASE_SMOOTH } from '../../animations/variants';

export function TestimonialsAndFaqSection() {
  // Testimonials carousel state
  const [slideIdx, setSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % SAMPLE_TESTIMONIALS.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const currentTestimonial = SAMPLE_TESTIMONIALS[slideIdx];

  // FAQ accordion state
  const [openFaqId, setOpenFaqId] = useState<string | null>(GENERAL_FAQS[0].id);

  // Newsletter state
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
    }, 800);
  };

  return (
    <Section className="bg-[#0A0A0A]">
      <div className="space-y-20">
        {/* Sample Testimonials Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="rounded-3xl bg-black border border-white/10 p-7 sm:p-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5BB4F5]">
                Feedback Format
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                Client Perspectives
              </h2>
            </div>
            <DemoTag label="Sample testimonial. Replace with real client feedback." />
          </div>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={currentTestimonial.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE_SMOOTH }}
              className="space-y-4 max-w-3xl"
            >
              <p className="text-base sm:text-xl text-white leading-relaxed font-medium">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </p>
              <footer className="text-sm text-[#9CA3AF]">
                <span className="font-semibold text-[#EAF4FB]">
                  {currentTestimonial.authorName}
                </span>{' '}
                · {currentTestimonial.role} · {currentTestimonial.organization}
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-7 flex items-center justify-between">
            <div className="flex items-center gap-2" role="tablist" aria-label="Select sample testimonial">
              {SAMPLE_TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={slideIdx === idx}
                  aria-label={`View sample testimonial ${idx + 1}`}
                  onClick={() => setSlideIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    slideIdx === idx ? 'w-7 bg-[#1769AA]' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setSlideIdx((prev) => (prev - 1 + SAMPLE_TESTIMONIALS.length) % SAMPLE_TESTIMONIALS.length)
                }
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-[#EAF4FB] hover:border-[#1769AA] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setSlideIdx((prev) => (prev + 1) % SAMPLE_TESTIMONIALS.length)}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-[#EAF4FB] hover:border-[#1769AA] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* FAQ + Newsletter Two-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* FAQ Accordion */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#5BB4F5] mb-2">
              Common Questions
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {GENERAL_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="py-1">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${faq.id}`}
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full py-4 flex items-center justify-between gap-4 text-left cursor-pointer group"
                    >
                      <span className="font-display text-sm sm:text-base font-semibold text-white group-hover:text-[#5BB4F5] transition-colors">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#9CA3AF] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#5BB4F5]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${faq.id}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-4 text-sm text-[#9CA3AF] leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Newsletter Simulation Card */}
          <div className="lg:col-span-5 p-7 sm:p-8 rounded-3xl bg-[#141414]/70 border border-[#1769AA]/15">
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="w-10 h-10 rounded-xl bg-[#0A0A0A] text-[#5BB4F5] flex items-center justify-center shadow-xs">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </span>
              <DemoTag label="Frontend simulation" />
            </div>

            <h3 className="font-display text-xl font-bold text-white">
              Stay Informed on AI Engineering
            </h3>
            <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
              Preview our newsletter signup flow. This is a frontend simulation only—no email address is stored or sent.
            </p>

            {subscribed ? (
              <div className="mt-6 p-4 rounded-2xl bg-[#0A0A0A] border border-[#1769AA]/25 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#EAF4FB]">
                  <CheckCircle2 className="w-4 h-4 text-[#5BB4F5]" aria-hidden="true" />
                  <span>Subscription simulated</span>
                </div>
                <p className="text-xs text-[#9CA3AF]">
                  Simulated confirmation for <span className="font-medium text-white">{email}</span>. No data was transmitted.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubscribed(false);
                    setEmail('');
                  }}
                  className="text-xs font-semibold text-[#5BB4F5] hover:underline cursor-pointer"
                >
                  Reset demo form
                </button>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} noValidate className="mt-6 space-y-3">
                <div>
                  <label htmlFor="newsletter-email" className="block text-xs font-semibold text-[#EAF4FB] mb-1.5">
                    Business Email
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(emailError)}
                    aria-describedby={emailError ? 'newsletter-error' : undefined}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-sm text-white placeholder:text-[#9CA3AF] focus:border-[#1769AA] focus:outline-none"
                  />
                  {emailError && (
                    <p id="newsletter-error" className="mt-1.5 text-xs text-red-600 font-medium">
                      {emailError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-5 rounded-xl gradient-accent-cta text-white text-sm font-semibold min-h-[44px] hover:brightness-105 transition-all disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? 'Simulating...' : 'Subscribe (Demo)'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
