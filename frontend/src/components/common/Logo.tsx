import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  /** Hide the "AI INNOVATIONS" tagline under the wordmark. */
  compact?: boolean;
}

/**
 * Brand lockup: the orange triangle "i" mark (public/brand/logo-mark.png) plus a live-text
 * wordmark, so the text colour follows the active theme (white on black, dark on light).
 */
export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus-visible:rounded-md ${className}`}
      aria-label="ALPHORAA AI INNOVATIONS Home"
    >
      <img
        src={`${import.meta.env.BASE_URL}brand/logo-mark.png`}
        alt=""
        width={36}
        height={36}
        className="h-9 w-auto shrink-0 transition-transform duration-200 group-hover:scale-105"
        draggable={false}
      />
      <span className="flex flex-col leading-none text-white shrink-0">
        <span className="font-brand text-[1.35rem] font-extrabold tracking-tight whitespace-nowrap">
          ALPHORAA
        </span>
        {!compact && (
          <span className="mt-1 font-brand text-[0.55rem] font-semibold tracking-[0.2em] uppercase whitespace-nowrap">
            AI Innovations
          </span>
        )}
      </span>
    </Link>
  );
}
