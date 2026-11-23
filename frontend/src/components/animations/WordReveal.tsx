import { motion } from 'motion/react';
import { staggerContainer, wordRevealItem } from '../../animations/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface WordRevealProps {
  text: string;
  highlightWords?: string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function WordReveal({
  text,
  highlightWords = [],
  className = '',
  as: Tag = 'h1',
}: WordRevealProps) {
  const reducedMotion = useReducedMotion();
  const words = text.split(' ');

  if (reducedMotion) {
    return (
      <Tag className={className}>
        {words.map((word, idx) => {
          const isHighlighted = highlightWords.includes(word);
          return (
            <span key={`${word}-${idx}`} className={isHighlighted ? 'gradient-accent-text' : undefined}>
              {word}
              {idx < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        variants={staggerContainer(0.06, 0.05)}
        initial="hidden"
        animate="visible"
        className="inline"
      >
        {words.map((word, idx) => {
          const isHighlighted = highlightWords.includes(word);
          return (
            <span key={`${word}-${idx}`} className="inline-block overflow-hidden align-bottom pb-[0.06em]">
              <motion.span
                variants={wordRevealItem}
                className={`inline-block ${isHighlighted ? 'gradient-accent-text' : ''}`}
              >
                {word}
              </motion.span>
              {idx < words.length - 1 ? '\u00A0' : ''}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
