import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    nav: [
      { text: '首页', link: '/zh-CN/' },
      { text: '指南', link: '/zh-CN/guide/getting-started', activeMatch: '/zh-CN/guide/' },
      { text: '扩展', link: '/zh-CN/extensions' }
    ],

    sidebar: [
      {
        text: '简介',
        collapsed: false,
        items: [
          { text: '什么是 TextGO?', link: '/zh-CN/guide/what-is-textgo' },
          { text: '快速开始', link: '/zh-CN/guide/getting-started' }
        ]
      },
      {
        text: '使用说明',
        collapsed: false,
        items: [
          { text: '注册快捷键', link: '/zh-CN/guide/register-shortcuts' },
          {
            text: '自定义识别类型',
            items: [
              { text: '机器学习模型', link: '/zh-CN/guide/train-models' },
              { text: '正则表达式', link: '/zh-CN/guide/write-regexps' }
            ]
          },
          {
            text: '自定义执行动作',
            items: [
              { text: '网页搜索', link: '/zh-CN/guide/web-search' },
              { text: '调用 LLM API', link: '/zh-CN/guide/llm-api' },
              { text: 'JavaScript 脚本', link: '/zh-CN/guide/javascript-scripts' },
              { text: 'Python 脚本', link: '/zh-CN/guide/python-scripts' },
              { text: 'Shell 脚本', link: '/zh-CN/guide/shell-scripts' }
            ]
          }
        ]
      },
      {
        items: [{ text: '常见问题', link: '/zh-CN/guide/faq' }]
      },
      {
        items: [{ text: '贡献指南', link: '/zh-CN/guide/contribution' }]
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
    },

    editLink: {
      pattern: 'https://github.com/C5H12O5/TextGO-Hub/edit/main/site/:path',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      message: '基于 <a href="https://github.com/C5H12O5/TextGO/blob/main/LICENSE">GPLv3</a> 开源协议发布',
      copyright: '版权所有 © 2025-至今 <a href="https://github.com/C5H12O5">C5H12O5</a>'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    notFound: {
      title: '页面未找到',
      quote: '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页'
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容'
  }
});
