import { Check } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { DemoTag } from '../components/common/DemoTag';
import { ProductMockup } from '../components/products/ProductMockup';
import { FinalCtaSection } from '../components/home/FinalCtaSection';
import { PRODUCTS } from '../data/products';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Products() {
  useDocumentMeta(
    'Products (Demo Placeholders)',
    'Placeholder product concepts for AI Agent Console, Workflow Automation Studio, and Insights Dashboard.'
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
        title="Innovative Products. Intelligent Experiences."
        subtitle="Placeholder products. Real product details will be supplied."
        demoLabel="Placeholder product concepts"
      />

      <section className="py-16 sm:py-20 bg-black">
        <Container className="space-y-12">
          {PRODUCTS.map((product, idx) => (
            <div
              key={product.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 rounded-3xl bg-[#0A0A0A] border border-white/10 shadow-[0_4px_24px_-4px_rgba(18,59,96,0.05)]"
            >
              <div className={`lg:col-span-5 space-y-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF]">
                  <DemoTag label="Demo product" />
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#5BB4F5]">{product.category}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {product.name}
                </h2>
                <p className="text-base text-[#9CA3AF] leading-relaxed">
                  {product.description}
                </p>

                <ul className="space-y-2.5">
                  {product.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-white">
                      <span className="mt-0.5 w-5 h-5 rounded-md bg-[#141414] text-[#5BB4F5] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <Button to={`/products/${product.slug}`} withArrow>
                    Visit Product
                  </Button>
                </div>
              </div>

              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <ProductMockup type={product.mockupType} />
              </div>
            </div>
          ))}
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
