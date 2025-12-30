import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'TextGO',

  head: [['link', { rel: 'icon', href: '/logo_32x32.png' }]],

  themeConfig: {
    logo: { src: '/logo_32x32.png', width: 24, height: 24 },

    socialLinks: [{ icon: 'github', link: 'https://github.com/C5H12O5/TextGO' }],

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
    ],

    search: {
      provider: 'local'
    }
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN'
    }
  }
});
