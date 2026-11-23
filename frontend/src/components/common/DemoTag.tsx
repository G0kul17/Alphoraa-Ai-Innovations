interface DemoTagProps {
  label?: string;
  className?: string;
  tone?: 'dark' | 'light';
}

export function DemoTag({
  label = 'Demo content',
  className = '',
  tone = 'dark',
}: DemoTagProps) {
  const colorClass =
    tone === 'light' ? 'text-[#EAF4FB]/80' : 'text-[#9CA3AF]';

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide uppercase ${colorClass} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-sm bg-[#F36B21]" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
