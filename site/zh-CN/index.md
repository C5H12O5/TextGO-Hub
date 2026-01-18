---
layout: home

hero:
  name: TextGO
  text: 全能文本处理工具
  tagline: 选中文本后弹出工具栏，一键执行自定义动作
  image:
    src: /icon_512x512.png
    alt: TextGO
  actions:
    - theme: brand
      text: 立即下载
      link: https://github.com/C5H12O5/TextGO/releases/latest
    - theme: alt
      text: 快速开始
      link: /zh-CN/guide/getting-started
    - theme: alt
      text: 获取扩展
      link: /zh-CN/extensions

features:
  - title: 快捷触发
    details: 可通过键盘快捷键、鼠标双击或拖拽选中触发，每种方式独立配置规则
  - title: 灵活模式
    details: 支持立即执行或工具栏交互两大模式，自由切换应对不同场景
  - title: 个性图标
    details: 工具栏图标支持上传自定义的 SVG 图片，打造专属风格
  - title: 开箱即用
    details: 内置丰富的文本类型和处理动作，简单配置即可使用
  - title: 灵活扩展
    details: 支持通过正则表达式、机器学习模型、脚本或接入本地/在线 AI 等方式扩展能力
  - title: 跨平台支持
    details: 原生支持 macOS 和 Windows，在各平台上提供一致的用户体验
---

<script setup>
import { onMounted } from 'vue'
import { data as release } from '../.vitepress/data/release.data'

onMounted(() => {
  const downloadBtn = document.querySelector('a.VPButton.brand[href*="releases/latest"]')
  if (downloadBtn && release.version) {
    downloadBtn.textContent = `立即下载 ${release.version}`
  }
})
</script>

<Home />
