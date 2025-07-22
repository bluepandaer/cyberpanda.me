import { ui, defaultLang, type Lang, type UIKeys } from './config';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKeys): string {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  const parts = pathname?.split('/').filter(Boolean);
  
  // If first part is a language code, remove it
  if (parts.length > 0 && parts[0] in ui) {
    parts.shift();
  }
  
  return parts.length > 0 ? parts.join('/') : '';
}

export function getLocalizedUrl(url: string, lang: Lang, currentLang?: Lang): string {
  // Remove current language prefix if it exists
  let cleanUrl = url;
  if (currentLang && url.startsWith(`/${currentLang}`)) {
    cleanUrl = url.substring(`/${currentLang}`.length);
  }
  
  // Ensure the URL starts with /
  if (!cleanUrl.startsWith('/')) {
    cleanUrl = '/' + cleanUrl;
  }
  
  // Add new language prefix
  return `/${lang}${cleanUrl === '/' ? '' : cleanUrl}`;
}

export function detectLanguage(): Lang {
  // Try to get from localStorage first
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('preferred-lang');
    if (stored && stored in ui) {
      return stored as Lang;
    }
    
    // Try to detect from browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang in ui) {
      return browserLang as Lang;
    }
  }
  
  return defaultLang;
}

export function saveLanguagePreference(lang: Lang) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-lang', lang);
  }
}

export function getLanguageAlternates(currentUrl: URL, currentLang: Lang): Array<{lang: Lang, url: string}> {
  const route = getRouteFromUrl(currentUrl);
  const baseUrl = `${currentUrl.protocol}//${currentUrl.host}`;
  
  return Object.keys(ui)
    .filter(lang => lang !== currentLang)
    .map(lang => ({
      lang: lang as Lang,
      url: `${baseUrl}/${lang}${route ? `/${route}` : ''}`
    }));
}