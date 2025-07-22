import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
import { useTranslations } from './i18n/utils';
import { ui, type Lang } from './i18n/config';

export function getHeaderData(lang: Lang) {
  const t = useTranslations(lang);
  
  return {
    links: [
      {
        text: t('nav.home'),
        href: `/${lang}`,
      },
      {
        text: t('nav.blog'),
        href: `/${lang}/blog`,
      },
      {
        text: t('nav.about'),
        href: `/${lang}/about`,
      },
      {
        text: t('nav.contact'),
        href: `/${lang}/contact`,
      },
    ],
    actions: [
      { 
        text: t('hero.cta.explore'), 
        href: `/${lang}/blog`, 
        variant: 'primary' 
      }
    ],
  };
}

// Keep legacy export for compatibility
export const headerData = {
  links: [
    {
      text: 'Home',
      href: '/zh/',
    },
    {
      text: 'Blog',
      href: '/zh/blog',
    },
    {
      text: 'About',
      href: '/zh/about',
    },
    {
      text: 'Contact',
      href: '/zh/contact',
    },
  ],
  actions: [{ text: 'Explore', href: '/zh/blog', variant: 'primary' }],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '#' },
        { text: 'Security', href: '#' },
        { text: 'Team', href: '#' },
        { text: 'Enterprise', href: '#' },
        { text: 'Customer stories', href: '#' },
        { text: 'Pricing', href: '#' },
        { text: 'Resources', href: '#' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { text: 'Developer API', href: '#' },
        { text: 'Partners', href: '#' },
        { text: 'Atom', href: '#' },
        { text: 'Electron', href: '#' },
        { text: 'AstroWind Desktop', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Docs', href: '#' },
        { text: 'Community Forum', href: '#' },
        { text: 'Professional Services', href: '#' },
        { text: 'Skills', href: '#' },
        { text: 'Status', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://twitter.com/cyberpanda_me' },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/yourusername' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://linkedin.com/in/yourprofile' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    🐼 Made with ❤️ by <a class="text-blue-600 underline dark:text-muted" href="https://cyberpanda.me">CyberPanda</a> · All rights reserved.
  `,
};
