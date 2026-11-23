import type { NavItem } from '../types';

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services', hasMegaMenu: 'services' },
  { label: 'Solutions', path: '/solutions', hasMegaMenu: 'solutions' },
  { label: 'Products', path: '/products' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'About Us', path: '/about' },
  { label: 'Insights', path: '/insights' },
  { label: 'Contact', path: '/contact' },
];

export const FOOTER_QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Products (Demo)', path: '/products' },
  { label: 'Portfolio (Demo)', path: '/portfolio' },
  { label: 'Insights', path: '/insights' },
  { label: 'Contact', path: '/contact' },
];

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Cookie Policy', path: '/cookies' },
];
