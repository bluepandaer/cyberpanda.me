# CyberPanda网站中英文切换功能需求与技术设计文档

## 📋 项目概述

### 项目背景

CyberPanda（赛博熊猫）是一个专注于AI技术分享的个人品牌网站，定位为国际化自媒体平台。为了服务全球用户，需要实现中英文双语切换功能。

### 技术栈

* 框架：Astro 4.x
* 样式：Tailwind CSS
* 部署：Vercel
* 构建工具：Vite

### 现有结构

```
src/
├── components/
├── content/
│   └── post/
├── layouts/
├── pages/
├── styles/
└── config.yaml
```

## 🎯 功能需求

### 核心需求

1. **语言切换功能**
   * 支持中文（zh-CN）和英文（en）两种语言
   * 在导航栏添加语言切换按钮
   * 切换语言时保持当前页面位置
   * 记住用户语言偏好（localStorage）
2. **内容国际化**
   * 所有UI文本支持双语
   * 博客文章支持双语版本
   * URL结构支持多语言路由
3. **SEO优化**
   * 正确的 hreflang 标签
   * 语言特定的 meta 信息
   * 适配的 sitemap.xml
4. **用户体验**
   * 自动检测用户浏览器语言
   * 平滑的切换动画
   * 移动端友好的切换界面

### 页面范围

* 首页
* 博客列表页
* 博客详情页
* 工具推荐页
* 关于页面
* 404页面

## 🏗️ 技术设计

### 1. 目录结构设计

```
src/
├── i18n/
│   ├── ui.ts                 # UI文本翻译
│   ├── utils.ts              # i18n工具函数
│   └── config.ts             # 语言配置
├── content/
│   ├── post/
│   │   ├── zh/              # 中文文章
│   │   │   └── ai-tips.mdx
│   │   └── en/              # 英文文章
│   │       └── ai-tips.mdx
│   └── config.ts
├── pages/
│   ├── zh/                  # 中文页面路由
│   │   ├── blog/
│   │   ├── tools.astro
│   │   └── about.astro
│   ├── en/                  # 英文页面路由
│   │   ├── blog/
│   │   ├── tools.astro
│   │   └── about.astro
│   └── index.astro          # 根页面（重定向）
└── components/
    └── LanguagePicker.astro # 语言切换组件
```

### 2. 配置文件设计

#### `src/i18n/config.ts`

```typescript
export const languages = {
  zh: '中文',
  en: 'English',
};

export const defaultLang = 'zh';

export const ui = {
  zh: {
    'nav.home': '首页',
    'nav.blog': 'AI教程',
    'nav.tools': '工具推荐',
    'nav.about': '关于',
    'hero.title': 'AI改变生活的每一天',
    'hero.subtitle': '跟着赛博熊猫探索AI世界，掌握ChatGPT、Claude、Midjourney等AI工具的实用技巧',
    'hero.cta.explore': '开始探索',
    'hero.cta.subscribe': '订阅更新',
    'footer.rights': '版权所有',
    // ... 更多翻译
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'AI Tutorials',
    'nav.tools': 'Tools',
    'nav.about': 'About',
    'hero.title': 'AI Changes Life Every Day',
    'hero.subtitle': 'Follow CyberPanda to explore the AI world and master practical tips for ChatGPT, Claude, Midjourney and more',
    'hero.cta.explore': 'Start Exploring',
    'hero.cta.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved',
    // ... more translations
  },
} as const;
```

#### `src/i18n/utils.ts`

```typescript
import { ui, defaultLang } from './config';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = url.pathname;
  const parts = pathname?.split('/');
  if (parts[1] in ui) {
    return parts.slice(2).join('/') || undefined;
  }
  return undefined;
}
```

### 3. 组件设计

#### `src/components/LanguagePicker.astro`

```astro
---
import { languages } from '~/i18n/config';
import { getLangFromUrl, getRouteFromUrl } from '~/i18n/utils';

const lang = getLangFromUrl(Astro.url);
const route = getRouteFromUrl(Astro.url);
---

<div class="language-picker relative">
  <button
    id="language-toggle"
    class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors"
    aria-label="Select language"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
    <span class="hidden sm:inline">{languages[lang]}</span>
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  
  <div
    id="language-menu"
    class="absolute right-0 mt-2 w-48 rounded-lg bg-dark-800 border border-gray-700 shadow-lg hidden"
  >
    {Object.entries(languages).map(([code, name]) => (
      <a
        href={`/${code}${route ? `/${route}` : ''}`}
        class={`block px-4 py-2 hover:bg-primary/10 transition-colors ${
          lang === code ? 'text-primary' : ''
        }`}
        data-lang={code}
      >
        {name}
      </a>
    ))}
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('language-toggle');
    const menu = document.getElementById('language-menu');
  
    toggle?.addEventListener('click', () => {
      menu?.classList.toggle('hidden');
    });
  
    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
      if (!toggle?.contains(e.target) && !menu?.contains(e.target)) {
        menu?.classList.add('hidden');
      }
    });
  
    // 保存语言偏好
    const langLinks = document.querySelectorAll('[data-lang]');
    langLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        localStorage.setItem('preferred-lang', lang);
      });
    });
  });
</script>

<style>
  .language-picker {
    @apply z-50;
  }
  
  #language-menu {
    animation: fadeIn 0.2s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
```

### 4. 路由设计

#### `src/pages/index.astro`（根路由重定向）

```astro
---
// 检测用户语言偏好并重定向
const preferredLang = Astro.cookies.get('preferred-lang')?.value || 
                     Astro.request.headers.get('accept-language')?.split(',')[0].split('-')[0] || 
                     'zh';

return Astro.redirect(`/${preferredLang}/`);
---
```

#### `src/pages/[lang]/index.astro`（语言特定首页）

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';
import Features from '~/components/widgets/Features.astro';
import { languages } from '~/i18n/config';
import { useTranslations } from '~/i18n/utils';

export function getStaticPaths() {
  return Object.keys(languages).map((lang) => ({
    params: { lang }
  }));
}

const { lang } = Astro.params;
const t = useTranslations(lang);

const metadata = {
  title: t('meta.home.title'),
  description: t('meta.home.description'),
};
---

<Layout metadata={metadata} {lang}>
  <Hero
    title={t('hero.title')}
    subtitle={t('hero.subtitle')}
    actions={[
      {
        text: t('hero.cta.explore'),
        href: `/${lang}/blog`,
        icon: 'tabler:rocket',
      },
      {
        text: t('hero.cta.subscribe'),
        href: `/${lang}/subscribe`,
        icon: 'tabler:mail',
      },
    ]}
  />
  
  <Features {lang} />
</Layout>
```

### 5. 内容管理设计

#### `src/content/config.ts`

```typescript
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string().default('CyberPanda'),
    image: image().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    lang: z.enum(['zh', 'en']),
    translationKey: z.string(), // 用于关联不同语言版本
  }),
});

export const collections = {
  'blog': blogCollection,
};
```

#### 文章文件示例

```markdown
// src/content/blog/zh/chatgpt-tips.mdx
---
title: "5个ChatGPT提示词技巧，效率提升10倍"
description: "掌握这些提示词技巧，让AI真正成为你的得力助手"
publishDate: 2024-01-20
tags: ["ChatGPT", "提示词", "效率工具"]
lang: "zh"
translationKey: "chatgpt-tips-guide"
---

// src/content/blog/en/chatgpt-tips.mdx
---
title: "5 ChatGPT Prompt Tips to 10x Your Productivity"
description: "Master these prompt techniques to make AI your true assistant"
publishDate: 2024-01-20
tags: ["ChatGPT", "Prompts", "Productivity"]
lang: "en"
translationKey: "chatgpt-tips-guide"
---
```

### 6. SEO优化设计

#### Layout组件中的语言标签

```astro
---
// src/layouts/PageLayout.astro
const { lang = 'zh' } = Astro.props;
const alternateLanguages = Object.keys(languages).filter(l => l !== lang);
---

<html lang={lang}>
<head>
  <!-- 语言切换的SEO标签 -->
  <link rel="alternate" hreflang={lang} href={Astro.url.href} />
  {alternateLanguages.map(altLang => (
    <link 
      rel="alternate" 
      hreflang={altLang} 
      href={Astro.url.href.replace(`/${lang}/`, `/${altLang}/`)} 
    />
  ))}
  <link rel="alternate" hreflang="x-default" href={`${Astro.site}zh/`} />
  
  <!-- Open Graph语言标签 -->
  <meta property="og:locale" content={lang === 'zh' ? 'zh_CN' : 'en_US'} />
  {alternateLanguages.map(altLang => (
    <meta 
      property="og:locale:alternate" 
      content={altLang === 'zh' ? 'zh_CN' : 'en_US'} 
    />
  ))}
</head>
```

### 7. 导航组件国际化

```astro
---
// src/components/widgets/Header.astro
import { useTranslations } from '~/i18n/utils';
import LanguagePicker from '~/components/LanguagePicker.astro';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

const navigationLinks = [
  { text: t('nav.home'), href: `/${lang}/` },
  { text: t('nav.blog'), href: `/${lang}/blog` },
  { text: t('nav.tools'), href: `/${lang}/tools` },
  { text: t('nav.about'), href: `/${lang}/about` },
];
---

<header>
  <nav>
    <!-- 导航链接 -->
    {navigationLinks.map(link => (
      <a href={link.href}>{link.text}</a>
    ))}
  
    <!-- 语言切换器 -->
    <LanguagePicker />
  </nav>
</header>
```

## 🚀 实施步骤

### Phase 1: 基础架构（第1-2天）

1. 创建i18n目录结构
2. 实现语言配置和工具函数
3. 创建语言切换组件
4. 设置路由重定向

### Phase 2: 页面国际化（第3-4天）

1. 迁移现有页面到语言特定路由
2. 提取所有UI文本到翻译文件
3. 更新组件使用翻译函数
4. 测试语言切换功能

### Phase 3: 内容国际化（第5-6天）

1. 重组博客内容结构
2. 创建示例双语文章
3. 更新博客列表和详情页
4. 实现语言过滤功能

### Phase 4: 优化和测试（第7天）

1. SEO标签优化
2. 性能优化
3. 移动端测试
4. 部署到Vercel

## 📋 测试清单

### 功能测试

* [ ]  语言切换按钮正常工作
* [ ]  切换语言后URL正确更新
* [ ]  页面内容正确显示对应语言
* [ ]  浏览器后退/前进正常工作
* [ ]  localStorage记住语言偏好
* [ ]  首次访问自动检测语言

### 兼容性测试

* [ ]  Chrome/Firefox/Safari兼容
* [ ]  移动端iOS/Android正常
* [ ]  不同屏幕尺寸响应式正常

### SEO测试

* [ ]  hreflang标签正确
* [ ]  sitemap包含所有语言版本
* [ ]  Google Search Console无错误

### 性能测试

* [ ]  页面加载速度无明显下降
* [ ]  语言切换无明显延迟
* [ ]  Lighthouse分数保持95+

## 🔧 开发注意事项

1. **保持URL一致性**
   * 中文：`/zh/blog/ai-tips`
   * 英文：`/en/blog/ai-tips`
2. **翻译质量**
   * 专业术语保持一致
   * 避免机器翻译
   * 保持品牌调性
3. **性能优化**
   * 使用静态生成避免运行时开销
   * 合理使用代码分割
   * 优化翻译文件大小
4. **用户体验**
   * 平滑的切换动画
   * 清晰的语言标识
   * 合理的默认语言选择

## 📚 参考资源

* [Astro i18n官方文档](https://docs.astro.build/en/guides/internationalization/)
* [URL结构最佳实践](https://developers.google.com/search/docs/specialty/international/localized-versions)
* [hreflang标签指南](https://developers.google.com/search/docs/specialty/international/hreflang)

## 🎯 交付标准

1. 所有页面支持中英文切换
2. 至少5篇双语示例文章
3. 完整的UI文本翻译
4. 通过所有测试项
5. 部署到生产环境

---

本文档作为开发指南，具体实现时可根据实际情况调整。如有疑问，请联系：hello@cyberpanda.me
