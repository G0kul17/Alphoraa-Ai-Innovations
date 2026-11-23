import { useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { ProductMockup } from '../components/products/ProductMockup';
import { getProductBySlug } from '../data/products';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import NotFound from './NotFound';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  useDocumentMeta(
    product ? product.name : 'Product Not Found',
    product ? product.tagline : 'Requested product was not found.'
  );

  if (!product) {
    return <NotFound />;
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: product.name },
        ]}
        title={product.name}
        subtitle={product.tagline}
        demoLabel="Placeholder product — real product details will be supplied"
      />

      <section className="py-14 sm:py-20 bg-black">
        <Container className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5BB4F5]">
                {product.category}
              </p>
              <h2 className="font-display text-2xl font-bold text-white">
                Conceptual Overview
              </h2>
              <p className="text-base text-[#9CA3AF] leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-2.5 pt-2">
                {product.features.map((feat) => (
                  <p key={feat} className="flex items-start gap-2.5 text-sm text-white">
                    <span className="mt-0.5 w-5 h-5 rounded-md bg-[#141414] text-[#5BB4F5] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                    <span>{feat}</span>
                  </p>
                ))}
              </div>

              <div className="pt-3">
                <Button to="/contact" withArrow>
                  Request Product Walkthrough
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ProductMockup type={product.mockupType} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-3">
              <h3 className="font-display text-lg font-bold text-white">
                Intended Users
              </h3>
              <ul className="space-y-2">
                {product.intendedUsers.map((user) => (
                  <li key={user} className="text-sm text-[#9CA3AF]">
                    • {user}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-3">
              <h3 className="font-display text-lg font-bold text-white">
                Placeholder Status Notes
              </h3>
              <ul className="space-y-2">
                {product.architectureNotes.map((note) => (
                  <li key={note} className="text-sm text-[#9CA3AF]">
                    • {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
