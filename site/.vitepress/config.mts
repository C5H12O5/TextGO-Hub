import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'TextGO',

  head: [['link', { rel: 'icon', href: '/logo_32x32.png' }]],

  lastUpdated: true,

  themeConfig: {
    logo: { src: '/logo_32x32.png', width: 24, height: 24 },

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
              { text: 'Train Models', link: '/guide/train-models' },
              { text: 'Regular Expressions', link: '/guide/write-regexps' }
            ]
          },
          {
            text: 'Custom Actions',
            items: [
              { text: 'Open URLs', link: '/guide/open-urls' },
              { text: 'Call Local AI', link: '/guide/local-ai' },
              { text: 'JavaScript Scripts', link: '/guide/javascript-scripts' },
              { text: 'Python Scripts', link: '/guide/python-scripts' }
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
  }
});
