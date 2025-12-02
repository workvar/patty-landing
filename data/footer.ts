export type FooterLink = {
  label: string;
  href: string;
};

export type FooterSectionKey = 'features' | 'legal' | 'resources' | 'about' | 'support';

export type FooterSection = {
  id: FooterSectionKey;
  title: string;
  links: FooterLink[];
};

export const footerSections: Record<FooterSectionKey, FooterSection> = {
  features: {
    id: 'features',
    title: 'Features',
    links: [
      { label: 'Patty', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Project Management', href: '#' },
    ],
  },
  legal: {
    id: 'legal',
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms and Conditions', href: '#' },
      { label: 'Refund Policy', href: '#' },
    ],
  },
  resources: {
    id: 'resources',
    title: 'Resources',
    links: [
      { label: 'Blogs', href: '/blog' },
      { label: 'Case Studies', href: '#' },
    ],
  },
  about: {
    id: 'about',
    title: 'About Us',
    links: [
      { label: 'Careers', href: '#' },
      { label: 'Affiliate Program', href: '#' },
    ],
  },
  support: {
    id: 'support',
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '#' },
      { label: 'FAQs', href: '#' },
      { label: 'Help Center', href: '#' },
    ],
  },
};

// Layout for the link sections (3 columns x 2 rows)
// Row 1: Features | Legal | Resources
// Row 2: Blank   | About  | Support
export const footerGridOrder: (FooterSectionKey | null)[] = [
  'features',
  'legal',
  'resources',
  null,
  'about',
  'support',
];
