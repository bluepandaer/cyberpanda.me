import { getAsset } from './utils/permalinks';
import { useTranslations } from './i18n/utils';
import { type Lang } from './i18n/config';

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

export function getFooterData(lang: Lang) {
  const t = useTranslations(lang);
  
  return {
    links: [
      {
        title: 'Navigation',
        links: [
          { text: t('nav.home'), href: `/${lang}` },
          { text: t('nav.blog'), href: `/${lang}/blog` },
          { text: t('nav.about'), href: `/${lang}/about` },
          { text: t('nav.contact'), href: `/${lang}/contact` },
        ],
      },
    ],
    secondaryLinks: [
      { text: lang === 'zh' ? '使用条款' : 'Terms', href: `/${lang}/terms` },
      { text: lang === 'zh' ? '隐私政策' : 'Privacy Policy', href: `/${lang}/privacy` },
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
}

// Keep legacy export for compatibility
export const footerData = {
  links: [
    {
      title: 'Navigation',
      links: [
        { text: 'Home', href: '/zh/' },
        { text: 'AI Tutorials', href: '/zh/blog' },
        { text: 'About', href: '/zh/about' },
        { text: 'Contact', href: '/zh/contact' },
      ],
    },
  ],
  secondaryLinks: [
    { text: '使用条款', href: '/zh/terms' },
    { text: '隐私政策', href: '/zh/privacy' },
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
