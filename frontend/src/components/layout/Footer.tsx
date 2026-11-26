import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Github, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Container } from '../common/Container';
import { DemoTag } from '../common/DemoTag';
import { Stagger } from '../animations/Stagger';
import { fadeUp } from '../../animations/variants';
import { SITE_CONFIG } from '../../data/config';
import { FOOTER_QUICK_LINKS, LEGAL_LINKS } from '../../data/navigation';
import { SERVICES } from '../../data/services';

const SOCIAL_ICONS: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  X: Twitter,
  GitHub: Github,
  YouTube: Youtube,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="keep-dark bg-[#000000] text-white border-t border-white/10">
      <Container className="py-16">
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <motion.div variants={fadeUp} className="lg:col-span-4 space-y-5">
            <Logo variant="light" />
            <p className="text-sm text-[#EAF4FB]/80 leading-relaxed max-w-sm">
              Engineering intelligent AI systems, autonomous agents, and resilient software automation for modern organizations.
            </p>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#EAF4FB]/60 mb-2.5">
                Social Channels (Placeholder Links)
              </p>
              <div className="flex items-center gap-2.5">
                {SITE_CONFIG.socialLinks.map((social) => {
                  const Icon = SOCIAL_ICONS[social.label] || Github;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      onClick={(e) => e.preventDefault()}
                      aria-label={`${social.label} (${social.note})`}
                      title={`${social.label} — ${social.note}`}
                      className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#EAF4FB] hover:bg-[#F36B21] hover:border-[#F36B21] hover:text-white transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-block text-sm text-[#EAF4FB]/80 hover:text-white hover:translate-x-1 transition-all duration-200 motion-reduce:transform-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-block text-sm text-[#EAF4FB]/80 hover:text-white hover:translate-x-1 transition-all duration-200 motion-reduce:transform-none"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div variants={fadeUp} className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-sm font-semibold text-white">
                Contact Information
              </h3>
              <DemoTag label="Placeholder" tone="light" />
            </div>
            <ul className="space-y-3 text-sm text-[#EAF4FB]/80">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#F36B21] shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={`mailto:${SITE_CONFIG.contactPlaceholders.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {SITE_CONFIG.contactPlaceholders.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#F36B21] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{SITE_CONFIG.contactPlaceholders.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F36B21] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{SITE_CONFIG.contactPlaceholders.address}</span>
              </li>
            </ul>
          </motion.div>
        </Stagger>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EAF4FB]/70">
          <p>&copy; {currentYear} {SITE_CONFIG.companyName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
