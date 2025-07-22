export const languages = {
  zh: '中文',
  en: 'English',
} as const;

export const defaultLang = 'zh' as const;
export type Lang = keyof typeof languages;

export const ui = {
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.blog': 'AI教程',
    'nav.tools': '工具推荐',
    'nav.about': '关于',
    'nav.contact': '联系',
    'nav.services': '服务',
    'nav.pricing': '价格',

    // Hero Section
    'hero.title': 'AI改变生活的每一天',
    'hero.subtitle': '跟着赛博熊猫探索AI世界，掌握ChatGPT、Claude、Midjourney等AI工具的实用技巧',
    'hero.cta.explore': '开始探索',
    'hero.cta.subscribe': '订阅更新',
    'hero.cta.download': '下载',

    // Blog
    'blog.title': 'AI教程与资讯',
    'blog.subtitle': '最新AI工具使用技巧和行业趋势分析',
    'blog.readMore': '阅读更多',
    'blog.publishedOn': '发布于',
    'blog.category': '分类',
    'blog.tags': '标签',
    'blog.relatedPosts': '相关文章',
    'blog.noPostsFound': '暂无文章',
    'blog.backToBlog': '返回博客',

    // Features
    'features.title': '为什么选择我们',
    'features.subtitle': '专业的AI工具使用指南和实战经验分享',

    // Footer
    'footer.rights': '版权所有',
    'footer.madeBy': '由',
    'footer.allRightsReserved': '保留所有权利',

    // Meta
    'meta.home.title': 'CyberPanda - AI改变生活的每一天',
    'meta.home.description': '跟着赛博熊猫探索AI世界，掌握ChatGPT、Claude、Midjourney等AI工具的实用技巧，提升工作和生活效率。',
    'meta.blog.title': 'AI教程与资讯',
    'meta.blog.description': '最新AI工具使用技巧和行业趋势分析，包括ChatGPT、Claude、Midjourney等热门AI工具的实战指南。',

    // Common
    'common.loading': '加载中...',
    'common.error': '出错了',
    'common.retry': '重试',
    'common.cancel': '取消',
    'common.confirm': '确认',
    'common.close': '关闭',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.blog': 'AI Tutorials',
    'nav.tools': 'Tools',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.services': 'Services',
    'nav.pricing': 'Pricing',

    // Hero Section
    'hero.title': 'AI Changes Life Every Day',
    'hero.subtitle': 'Follow CyberPanda to explore the AI world and master practical tips for ChatGPT, Claude, Midjourney and more',
    'hero.cta.explore': 'Start Exploring',
    'hero.cta.subscribe': 'Subscribe',
    'hero.cta.download': 'Download',

    // Blog
    'blog.title': 'AI Tutorials & News',
    'blog.subtitle': 'Latest AI tool tips and industry trend analysis',
    'blog.readMore': 'Read More',
    'blog.publishedOn': 'Published on',
    'blog.category': 'Category',
    'blog.tags': 'Tags',
    'blog.relatedPosts': 'Related Posts',
    'blog.noPostsFound': 'No posts found',
    'blog.backToBlog': 'Back to Blog',

    // Features
    'features.title': 'Why Choose Us',
    'features.subtitle': 'Professional AI tool guides and hands-on experience sharing',

    // Footer
    'footer.rights': 'All rights reserved',
    'footer.madeBy': 'Made by',
    'footer.allRightsReserved': 'All rights reserved',

    // Meta
    'meta.home.title': 'CyberPanda - AI Changes Life Every Day',
    'meta.home.description': 'Follow CyberPanda to explore the AI world and master practical tips for ChatGPT, Claude, Midjourney and other AI tools to boost work and life efficiency.',
    'meta.blog.title': 'AI Tutorials & News',
    'meta.blog.description': 'Latest AI tool tips and industry trend analysis, including practical guides for popular AI tools like ChatGPT, Claude, and Midjourney.',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.retry': 'Retry',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
  },
} as const;

export type UIKeys = keyof typeof ui[typeof defaultLang];