import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Section } from '../common/Section';
import { Button } from '../common/Button';
import { DemoTag } from '../common/DemoTag';
import { ProductMockup } from '../products/ProductMockup';
import { PRODUCTS } from '../../data/products';
import { EASE_SMOOTH } from '../../animations/variants';

export function ProductsSection() {
  const [selectedId, setSelectedId] = useState(PRODUCTS[0].id);
  const activeProduct = PRODUCTS.find((p) => p.id === selectedId) || PRODUCTS[0];

  return (
    <Section
      id="products"
      chapterNumber="05"
      eyebrow="Products"
      title="Innovative Products. Intelligent Experiences."
      subtitle="Explore interactive UI prototypes of our modular software concepts. Placeholder products. Real product details will be supplied."
      className="bg-[#141414]/55"
    >
      <div
        className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#0A0A0A] border border-white/10 mb-8"
        role="tablist"
        aria-label="Select demo product"
      >
        {PRODUCTS.map((product) => {
          const isSelected = product.id === selectedId;
          return (
            <button
              key={product.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedId(product.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[#1769AA] text-white shadow-sm'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-[#141414]'
              }`}
            >
              {product.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeProduct.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: EASE_SMOOTH }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0A0A0A] border border-white/10 shadow-[0_12px_36px_-12px_rgba(18,59,96,0.08)]"
        >
          <div className="lg:col-span-5 space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#9CA3AF]">
              <DemoTag label="Demo placeholder product" />
              <span aria-hidden="true">·</span>
              <span className="font-medium text-[#5BB4F5]">{activeProduct.category}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {activeProduct.name}
            </h3>

            <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              {activeProduct.description}
            </p>

            <ul className="space-y-2.5 pt-1">
              {activeProduct.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-sm text-white">
                  <span className="mt-0.5 w-5 h-5 rounded-md bg-[#141414] text-[#5BB4F5] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button to={`/products/${activeProduct.slug}`} withArrow magnetic>
                Visit Product
              </Button>
              <span className="text-xs text-[#9CA3AF]">
                Placeholder specs — subject to updates
              </span>
            </div>
          </div>

          <div className="lg:col-span-7" data-cursor="View">
            <ProductMockup type={activeProduct.mockupType} />
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
