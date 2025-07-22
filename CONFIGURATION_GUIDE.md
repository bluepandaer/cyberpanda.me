# CyberPanda 网站配置指南

本文档提供了修改网站信息、内容和外观的完整指南，无需直接修改代码。

## 📁 主要配置文件

### 1. `src/config.yaml` - 核心配置文件

这是最重要的配置文件，包含网站的基本信息和 SEO 设置。

#### 网站基本信息
```yaml
site:
  name: CyberPanda                    # 网站名称
  site: 'https://cyberpanda.me'       # 网站域名
  base: '/'                          # 基础路径
  trailingSlash: false               # URL 是否包含尾斜杠
```

#### SEO 元数据
```yaml
metadata:
  title:
    default: CyberPanda                # 默认页面标题
    template: '%s — CyberPanda'        # 页面标题模板
  description: "🐼 专注网络安全与AI技术分享，为独立创业者提供技术洞察与实用教程。"
  
  # Open Graph (社交媒体分享)
  openGraph:
    site_name: CyberPanda
    images:
      - url: '~/assets/images/default.png'
        width: 1200
        height: 628
    type: website
  
  # Twitter 卡片
  twitter:
    handle: '@cyberpanda_me'           # Twitter 用户名
    site: '@cyberpanda_me'
    cardType: summary_large_image
```

#### 博客配置
```yaml
apps:
  blog:
    isEnabled: true                    # 启用博客功能
    postsPerPage: 6                    # 每页显示文章数量
    
    post:
      isEnabled: true
      permalink: '/%slug%'             # 文章 URL 格式
    
    list:
      pathname: 'blog'                 # 博客主路径 (/blog)
    
    category:
      pathname: 'category'             # 分类路径 (/category)
    
    tag:
      pathname: 'tag'                  # 标签路径 (/tag)
    
    isRelatedPostsEnabled: true        # 显示相关文章
    relatedPostsCount: 4               # 相关文章数量
```

#### 分析和主题
```yaml
analytics:
  vendors:
    googleAnalytics:
      id: null                         # Google Analytics ID (如: G-XXXXXXXXXX)

ui:
  theme: 'system'                      # 主题: system | light | dark | light:only | dark:only
```

### 2. `src/navigation.ts` - 导航和页脚配置

#### 页脚社交媒体链接
```typescript
socialLinks: [
  { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://twitter.com/cyberpanda_me' },
  { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/yourusername' },
  { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://linkedin.com/in/yourprofile' },
  { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
],
```

#### 页脚版权信息
```typescript
footNote: `
  🐼 Made with ❤️ by <a class="text-blue-600 underline dark:text-muted" href="https://cyberpanda.me">CyberPanda</a> · All rights reserved.
`,
```

#### 页脚链接组
```typescript
footerData = {
  links: [
    {
      title: 'Product',              // 分组标题
      links: [                       // 链接列表
        { text: 'Features', href: '#' },
        { text: 'Security', href: '#' },
        // ... 更多链接
      ],
    },
    // ... 更多分组
  ],
}
```

## 📝 内容管理

### 博客文章管理

在 `src/data/post/` 目录中创建 `.md` 或 `.mdx` 文件：

```markdown
---
title: "文章标题"
excerpt: "文章摘要描述"
category: "技术教程"
tags: ["AI", "网络安全", "教程"]
author: "CyberPanda"
publishDate: 2024-01-15
image: "~/assets/images/article-image.jpg"
lang: "zh"                           # 语言: zh | en
translationKey: "unique-key"         # 用于关联不同语言版本
---

# 文章内容

这里是文章的 Markdown 内容...
```

#### 支持的 Front Matter 字段
- `title`: 文章标题 *（必需）*
- `excerpt`: 文章摘要
- `category`: 分类
- `tags`: 标签数组
- `author`: 作者
- `publishDate`: 发布日期
- `updateDate`: 更新日期
- `image`: 特色图片
- `lang`: 语言（zh/en）
- `translationKey`: 翻译关联键
- `draft`: 是否为草稿（true/false）

## 🌐 多语言配置

### 语言配置 (`src/i18n/config.ts`)
```typescript
export const languages = {
  en: 'English',
  zh: '中文',
};

export const defaultLang = 'zh';
```

### 界面文本翻译 (`src/i18n/ui.ts`)
```typescript
export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'hero.title': 'Welcome to CyberPanda',
  },
  zh: {
    'nav.home': '首页',
    'nav.blog': '博客',
    'hero.title': '欢迎来到 CyberPanda',
  },
} as const;
```

## 🎨 样式和资源

### 图片资源
- **Logo**: `src/assets/images/logo.png`
- **默认图片**: `src/assets/images/default.png`
- **网站图标**: `src/assets/favicons/`

### 自定义样式
- **全局样式**: `src/styles/`
- **组件样式**: 使用 Tailwind CSS 类名

## 🔧 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查和格式化
npm run check        # 运行所有检查
npm run fix          # 自动修复格式问题
```

## 📋 快速修改清单

### 更换网站信息
1. ✅ 修改 `src/config.yaml` 中的 `site.name` 和 `site.site`
2. ✅ 更新 `metadata.title` 和 `metadata.description`
3. ✅ 修改社交媒体链接 `metadata.twitter.handle`

### 更新联系方式
1. ✅ 修改 `src/navigation.ts` 中的 `socialLinks`
2. ✅ 更新页脚版权信息 `footNote`
3. ✅ 添加联系页面内容

### 发布新文章
1. ✅ 在 `src/data/post/` 创建新的 `.md` 文件
2. ✅ 添加完整的 front matter
3. ✅ 编写 Markdown 内容
4. ✅ 保存文件，自动生成页面

### 自定义主题
1. ✅ 修改 `src/config.yaml` 中的 `ui.theme`
2. ✅ 替换 `src/assets/images/` 中的图片
3. ✅ 自定义 CSS 样式（如需要）

## ⚠️ 注意事项

- 修改配置文件后需要重启开发服务器
- 图片文件放在 `src/assets/images/` 目录中
- 多语言内容需要创建对应语言的文件
- URL 路径会自动根据配置生成
- 所有修改都是静态的，构建时生成最终页面

## 🆘 故障排除

### 常见问题
1. **页面不显示**: 检查文件路径和 front matter 格式
2. **样式错误**: 确认 Tailwind CSS 类名正确
3. **构建失败**: 运行 `npm run check` 检查错误
4. **图片不显示**: 确认图片路径以 `~/assets/` 开头

### 获取帮助
- 查看 [Astro 官方文档](https://docs.astro.build/)
- 检查控制台错误信息
- 运行 `npm run check` 进行诊断