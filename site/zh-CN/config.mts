import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    nav: [
      { text: '首页', link: '/zh-CN/' },
      { text: '指南', link: '/zh-CN/guide/getting-started' },
      { text: '功能特性', link: '/zh-CN/guide/features' }
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/zh-CN/guide/getting-started' },
          { text: '功能特性', link: '/zh-CN/guide/features' },
          { text: '开发指南', link: '/zh-CN/guide/development' }
        ]
      }
    ],

    search: {
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '重置搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '输入',
              navigateText: '导航',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'esc'
            }
          }
        }
      }
    }
  }
});
