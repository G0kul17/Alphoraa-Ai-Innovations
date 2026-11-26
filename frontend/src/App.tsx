import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { ChatbotProvider } from './context/ChatbotContext';
import { SmoothScrollProvider } from './context/SmoothScrollContext';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { PageLoader } from './components/common/PageLoader';
import { PageTransition } from './components/animations/PageTransition';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const Solutions = lazy(() => import('./pages/Solutions'));
const SolutionDetails = lazy(() => import('./pages/SolutionDetails'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const CaseStudyDetails = lazy(() => import('./pages/CaseStudyDetails'));
const About = lazy(() => import('./pages/About'));
const Insights = lazy(() => import('./pages/Insights'));
const InsightDetails = lazy(() => import('./pages/InsightDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetails />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:slug" element={<SolutionDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<CaseStudyDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/cookies" element={<LegalPage type="cookies" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    // HashRouter: GitHub Pages has no SPA fallback, so deep links and refresh
    // would 404 with BrowserRouter. Hash URLs always resolve to index.html.
    <HashRouter>
      <SmoothScrollProvider>
        <ChatbotProvider>
          <ScrollToTop />
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </ChatbotProvider>
      </SmoothScrollProvider>
    </HashRouter>
  );
}
