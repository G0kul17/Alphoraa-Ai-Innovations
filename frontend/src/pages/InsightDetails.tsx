import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, Share2 } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { CoverArtwork } from '../components/common/CoverArtwork';
import { BLOG_POSTS, getPostBySlug } from '../data/posts';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import NotFound from './NotFound';

export default function InsightDetails() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useDocumentMeta(
    post ? post.title : 'Article Not Found',
    post ? post.excerpt : 'Requested article was not found.'
  );

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      setProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!post) {
    return <NotFound />;
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#1769AA] to-[#F36B21] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Insights', to: '/insights' },
          { label: post.title },
        ]}
        title={post.title}
        subtitle={`${post.category} · ${post.publishedAt} · ${post.readTime} · ${post.author}`}
        demoLabel="Demo article"
      />

      <article className="py-14 sm:py-20 bg-black">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="h-56 sm:h-72 rounded-3xl overflow-hidden mb-8 border border-white/10">
              <CoverArtwork variant={post.coverVariant} label={post.title} />
            </div>

            <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
              <p className="text-sm text-[#9CA3AF]">
                Written by <span className="font-semibold text-[#EAF4FB]">{post.author}</span>
              </p>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A0A0A] border border-white/10 text-xs font-semibold text-[#EAF4FB] hover:border-[#1769AA] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#5BB4F5]" aria-hidden="true" />
                    <span>Link copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#5BB4F5]" aria-hidden="true" />
                    <span>Copy link</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-8 bg-[#0A0A0A] p-7 sm:p-10 rounded-3xl border border-white/10">
              <p className="text-lg font-medium text-white leading-relaxed">
                {post.excerpt}
              </p>

              {post.sections.map((sec) => (
                <section key={sec.heading} className="space-y-3">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#EAF4FB]">
                    {sec.heading}
                  </h2>
                  {sec.body.map((para) => (
                    <p key={para} className="text-base text-[#9CA3AF] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            {/* Related Posts */}
            <div className="mt-14">
              <h2 className="font-display text-xl font-bold text-white mb-5">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/insights/${rel.slug}`}
                    className="group p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-[#1769AA]/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs text-[#5BB4F5] font-semibold mb-1.5">
                        {rel.category}
                      </p>
                      <h3 className="font-display text-sm font-bold text-white group-hover:text-[#5BB4F5] leading-snug">
                        {rel.title}
                      </h3>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5BB4F5]">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
