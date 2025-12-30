---
layout: home

hero:
  name: TextGO
  text: 全能文本处理工具
  tagline: ✨ 通过快捷键触发，自动识别选中文本类型并执行自定义动作
  image:
    src: /logo_512x512.png
    alt: TextGO
  actions:
    - theme: brand
      text: 立即下载
      link: https://github.com/C5H12O5/TextGO/releases/latest
    - theme: alt
      text: 使用说明
      link: /zh-CN/guide/getting-started

features:
  - title: 多种触发方式
    details: 支持键盘快捷键、鼠标双击或拖拽选中触发，每种方式可独立配置规则
  - title: 灵活执行模式
    details: 支持立即执行或工具栏交互模式，自由切换以适应不同场景
  - title: 开箱即用
    details: 内置丰富的文本类型和处理动作，简单配置即可使用
  - title: 高度可定制
    details: 可通过正则、机器学习模型、脚本或接入本地 AI 扩展识别和处理能力
  - title: 个性化图标
    details: 支持从内置图标库选择或上传自定义 SVG 图标，打造个性化的工具栏
  - title: 跨平台支持
    details: 原生支持 macOS 和 Windows，在各平台上提供一致的用户体验
---
<script setup>
import { onMounted } from 'vue'
import { data as release } from '../.vitepress/data/release.data'

onMounted(() => {
  // 查找"立即下载"按钮并添加版本号
  const downloadBtn = document.querySelector('a.VPButton.brand[href*="releases/latest"]')
  if (downloadBtn && release.version) {
    downloadBtn.textContent = `立即下载 ${release.version}`
  }
})
</script>
<Home />