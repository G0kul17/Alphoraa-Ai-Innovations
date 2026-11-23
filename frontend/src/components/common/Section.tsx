import React from 'react';
import { motion } from 'motion/react';
import { Container } from './Container';
import { EASE_SMOOTH, staggerContainer, wordRevealItem } from '../../animations/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SectionProps {
  id?: string;
  chapterNumber?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  as?: 'section' | 'div';
}

export function Section({
  id,
  chapterNumber,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
  headerClassName = '',
  align = 'left',
  theme = 'light',
  as: Component = 'section',
}: SectionProps) {
  const reducedMotion = useReducedMotion();
  const alignClasses = align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl';
  const isDark = theme === 'dark';

  const headingWords = title ? title.split(' ') : [];

  return (
    <Component id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>
        {(eyebrow || title || subtitle) && (
          <div className={`mb-10 sm:mb-14 ${alignClasses} ${headerClassName}`}>
            {(chapterNumber || eyebrow) && (
              <div className="mb-3 overflow-hidden">
                <motion.p
                  initial={reducedMotion ? false : { y: '100%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, ease: EASE_SMOOTH }}
                  className={`text-xs font-semibold tracking-[0.14em] uppercase ${
                    isDark ? 'text-[#F36B21]' : 'text-[#5BB4F5]'
                  }`}
                >
                  {chapterNumber ? (
                    <span className="font-mono">{chapterNumber} / </span>
                  ) : null}
                  <span>{eyebrow}</span>
                </motion.p>
              </div>
            )}

            {title && (
              <h2
                className={`font-display text-2xl sm:text-3xl lg:text-[2.45rem] font-bold tracking-tight leading-[1.16] ${
                  isDark ? 'text-white' : 'text-white'
                }`}
              >
                {reducedMotion ? (
                  title
                ) : (
                  <motion.span
                    variants={staggerContainer(0.05, 0.04)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="inline"
                  >
                    {headingWords.map((word, idx) => (
                      <span
                        key={`${word}-${idx}`}
                        className="inline-block overflow-hidden align-bottom pb-[0.06em]"
                      >
                        <motion.span variants={wordRevealItem} className="inline-block">
                          {word}
                        </motion.span>
                        {idx < headingWords.length - 1 ? '\u00A0' : ''}
                      </span>
                    ))}
                  </motion.span>
                )}
              </h2>
            )}

            {subtitle && (
              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE_SMOOTH }}
                className={`mt-4 text-base sm:text-lg leading-relaxed ${
                  isDark ? 'text-[#EAF4FB]/80' : 'text-[#9CA3AF]'
                }`}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        {children}
      </Container>
    </Component>
  );
}
