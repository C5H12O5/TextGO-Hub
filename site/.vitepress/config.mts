import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'TextGO',
  description: 'A cross-platform text processing tool',

  head: [['link', { rel: 'icon', href: '/logo_32x32.png' }]],

  themeConfig: {
    logo: { src: '/logo_32x32.png', width: 24, height: 24 },

    socialLinks: [{ icon: 'github', link: 'https://github.com/C5H12O5/TextGO' }]
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/getting-started' },
          { text: 'Features', link: '/guide/features' }
        ],

        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Getting Started', link: '/guide/getting-started' },
              { text: 'Features', link: '/guide/features' },
              { text: 'Development', link: '/guide/development' }
            ]
          }
        ]
      }
    },
    'zh-cn': {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh-cn/' },
          { text: '指南', link: '/zh-cn/guide/getting-started' },
          { text: '功能特性', link: '/zh-cn/guide/features' }
        ],

        sidebar: [
          {
            text: '指南',
            items: [
              { text: '快速开始', link: '/zh-cn/guide/getting-started' },
              { text: '功能特性', link: '/zh-cn/guide/features' },
              { text: '开发指南', link: '/zh-cn/guide/development' }
            ]
          }
        ],

        darkModeSwitchLabel: '外观',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        langMenuLabel: '选择语言'
      }
    }
  }
});
