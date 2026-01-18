import { defineConfig } from 'vitepress';
import tailwindcss from '@tailwindcss/vite';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'TextGO',

  head: [['link', { rel: 'icon', href: '/icon.ico' }]],

  lastUpdated: true,

  themeConfig: {
    logo: { src: '/icon.ico', width: 24, height: 24 },

    socialLinks: [{ icon: 'github', link: 'https://github.com/C5H12O5/TextGO' }],

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: 'Extensions', link: '/extensions' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'What is TextGO?', link: '/guide/what-is-textgo' },
          { text: 'Getting Started', link: '/guide/getting-started' }
        ]
      },
      {
        text: 'User Manual',
        collapsed: false,
        items: [
          { text: 'Register Shortcuts', link: '/guide/register-shortcuts' },
          {
            text: 'Custom Recognitions',
            items: [
              { text: 'Machine Learning Models', link: '/guide/train-models' },
              { text: 'Regular Expressions', link: '/guide/write-regexps' }
            ]
          },
          {
            text: 'Custom Actions',
            items: [
              { text: 'Web Search', link: '/guide/web-search' },
              { text: 'Call LLM API', link: '/guide/llm-api' },
              { text: 'JavaScript Scripts', link: '/guide/javascript-scripts' },
              { text: 'Python Scripts', link: '/guide/python-scripts' },
              { text: 'Shell Scripts', link: '/guide/shell-scripts' }
            ]
          }
        ]
      },
      {
        items: [{ text: 'FAQ', link: '/guide/faq' }]
      },
      {
        items: [{ text: 'Contribution', link: '/guide/contribution' }]
      }
    ],

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/C5H12O5/TextGO-Hub/edit/main/site/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'Released under the <a href="https://github.com/C5H12O5/TextGO/blob/main/LICENSE">GPLv3</a> License.',
      copyright: 'Copyright © 2025-present <a href="https://github.com/C5H12O5">C5H12O5</a>'
    },

    lastUpdated: {
      formatOptions: {
        forceLocale: true
      }
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
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
