---
layout: home

hero:
  name: TextGO
  text: All-in-One Text Tool
  tagline: Select text and run custom actions instantly or from a toolbar
  image:
    src: /icon_512x512.png
    alt: TextGO
  actions:
    - theme: brand
      text: Download
      link: https://github.com/C5H12O5/TextGO/releases/latest
    - theme: alt
      text: Quick Start
      link: /guide/getting-started
    - theme: alt
      text: Extensions
      link: /extensions

features:
  - title: Multiple Triggers
    details: Hotkeys, double-click, shift-click, or drag-select, each with independent rule configurations.
  - title: Flexible Modes
    details: Choose instant execution or interactive toolbar mode based on your workflow.
  - title: Customizable Appearance
    details: Use custom SVG toolbar icons and customize light and dark themes separately.
  - title: Ready to Use
    details: Built-in rich text types and processing actions, simple configuration for immediate use.
  - title: Highly Extensible
    details: Extend with regex, ML models, scripts, or local/cloud AI for custom recognition and processing.
  - title: Cross-Platform
    details: Native support for macOS and Windows with consistent experience across platforms.
---

<script setup>
import { onMounted } from 'vue'
import { data as release } from './.vitepress/data/release.data'

onMounted(() => {
  const downloadBtn = document.querySelector('a.VPButton.brand[href*="releases/latest"]')
  if (downloadBtn && release.version) {
    downloadBtn.textContent = `Download ${release.version}`
  }
})
</script>

<Home />
