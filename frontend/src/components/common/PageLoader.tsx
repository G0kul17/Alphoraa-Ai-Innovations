import { Container } from './Container';

export function PageLoader() {
  return (
    <div className="min-h-[65vh] pt-28 pb-16" aria-busy="true" aria-label="Loading page">
      <Container>
        <div className="max-w-2xl space-y-4 animate-pulse">
          <div className="h-3 w-28 rounded bg-[#141414]" />
          <div className="h-10 w-3/4 rounded-lg bg-[#141414]" />
          <div className="h-5 w-full rounded bg-[#141414]/80" />
          <div className="h-5 w-5/6 rounded bg-[#141414]/80" />
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-52 rounded-2xl bg-[#0A0A0A] border border-white/10 p-6" />
          ))}
        </div>
      </Container>
    </div>
  );
}
