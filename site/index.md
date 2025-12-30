---
layout: home

hero:
  name: TextGO
  text: All-in-One Text Tool
  tagline: ✨ Automatically recognize text types and execute custom actions via shortcuts
  image:
    src: /logo_512x512.png
    alt: TextGO
  actions:
    - theme: brand
      text: Download
      link: https://github.com/C5H12O5/TextGO/releases/latest
    - theme: alt
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/C5H12O5/TextGO

features:
  - title: Multiple Trigger Methods
    details: Global hotkeys, mouse double-click, or text selection - each with independent rule configurations
  - title: Flexible Execution Modes
    details: Choose instant execution or interactive toolbar mode based on your workflow
  - title: Ready to Use
    details: Built-in rich text types and processing actions, simple configuration for immediate use
  - title: Highly Extensible
    details: Extend with regex, ML models, scripts, or local AI for custom recognition and processing
  - title: Customizable Icons
    details: Choose from built-in icon library or upload custom SVG icons to create a personalized toolbar
  - title: Cross-Platform
    details: Native support for macOS and Windows with consistent experience across platforms
---
<script setup>
import { onMounted } from 'vue'
import { data as release } from './.vitepress/data/release.data'

onMounted(() => {
  // 查找"Download"按钮并添加版本号
  const downloadBtn = document.querySelector('a.VPButton.brand[href*="releases/latest"]')
  if (downloadBtn && release.version) {
    downloadBtn.textContent = `Download ${release.version}`
  }
})
</script>
<Home />