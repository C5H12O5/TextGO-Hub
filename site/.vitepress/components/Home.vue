<script setup lang="ts">
import {
  PhAppleLogo,
  PhBookOpenText,
  PhDesktop,
  PhDownloadSimple,
  PhKeyboard,
  PhLightning,
  PhPalette,
  PhPuzzlePiece,
  PhTextAa,
  PhWindowsLogo
} from '@phosphor-icons/vue';
import { Underline } from '@theojs/lumen';
import { useData, withBase } from 'vitepress';
import { VPButton } from 'vitepress/theme';
import { computed } from 'vue';
import { data as release } from '../data/release.data';
import HomeDemo from './HomeDemo.vue';

const { lang } = useData();
const isChinese = computed(() => lang.value.startsWith('zh'));
const localePath = computed(() => (isChinese.value ? '/zh-CN' : ''));
const copy = computed(() =>
  isChinese.value
    ? {
        title: '全能文本处理工具',
        tagline: '让每一次选中，都直达所需动作',
        download: '立即下载',
        guide: '快速开始',
        extensions: '获取扩展',
        features: [
          {
            title: '快捷触发',
            details: '键盘快捷键、鼠标双击、Shift 扩展选中或拖拽选中，每种方式独立配置。',
            icon: PhKeyboard
          },
          { title: '灵活模式', details: '直接执行动作，或呼出工具栏后选择。', icon: PhLightning },
          { title: '个性外观', details: '自定义工具栏 SVG 图标，分别设置浅色和深色主题。', icon: PhPalette },
          { title: '开箱即用', details: '内置常用文本类型和处理动作，简单配置即可使用。', icon: PhTextAa },
          { title: '支持扩展', details: '通过正则、脚本、分类模型和本地或在线 AI 扩展能力。', icon: PhPuzzlePiece },
          { title: '跨平台', details: '原生支持 macOS 和 Windows。', icon: PhDesktop }
        ]
      }
    : {
        title: 'All-in-One Text Tool',
        tagline: 'Turn every selection into the action you need',
        download: 'Download',
        guide: 'Quick Start',
        extensions: 'Get Extensions',
        features: [
          {
            title: 'Multiple Triggers',
            details: 'Hotkeys, double-click, Shift-click, or drag-select. Configure each independently.',
            icon: PhKeyboard
          },
          {
            title: 'Flexible Modes',
            details: 'Run an action directly or choose from the floating toolbar.',
            icon: PhLightning
          },
          {
            title: 'Custom Appearance',
            details: 'Custom SVG toolbar icons and separate light and dark themes.',
            icon: PhPalette
          },
          {
            title: 'Ready to Use',
            details: 'Built-in text types and actions, ready after a simple setup.',
            icon: PhTextAa
          },
          {
            title: 'Extensible',
            details: 'Add regex, scripts, classification models, and local or cloud AI.',
            icon: PhPuzzlePiece
          },
          { title: 'Cross-Platform', details: 'Native support for macOS and Windows.', icon: PhDesktop }
        ]
      }
);
const downloadText = computed(() => `${copy.value.download}${release.version ? ` ${release.version}` : ''}`);
</script>

<template>
  <div class="textgo-home">
    <section class="home-hero" aria-labelledby="home-title">
      <div class="hero-intro">
        <h1 id="home-title" :aria-label="`TextGO ${copy.title}`">
          <span class="hero-name" aria-hidden="true">
            <span>Text</span>
            <span class="hero-name-go"><span class="hero-name-go-text">GO</span></span>
          </span>
          <span class="hero-title">
            {{ copy.title }}
            <Underline class="hero-underline" aria-hidden="true" />
          </span>
        </h1>
        <p class="hero-tagline">{{ copy.tagline }}</p>
        <div class="hero-actions">
          <VPButton class="hero-download" theme="brand" href="https://github.com/C5H12O5/TextGO/releases/latest">
            <PhDownloadSimple :size="18" weight="bold" aria-hidden="true" />
            <span>{{ downloadText }}</span>
          </VPButton>
          <VPButton theme="alt" :href="withBase(`${localePath}/guide/getting-started`)">
            <PhBookOpenText :size="18" weight="bold" aria-hidden="true" />
            <span>{{ copy.guide }}</span>
          </VPButton>
          <VPButton theme="alt" :href="withBase(`${localePath}/extensions`)">
            <PhPuzzlePiece :size="18" weight="bold" aria-hidden="true" />
            <span>{{ copy.extensions }}</span>
          </VPButton>
        </div>
        <p class="hero-platforms">
          <span><PhAppleLogo :size="16" weight="fill" aria-hidden="true" />macOS</span>
          <span><PhWindowsLogo :size="16" weight="fill" aria-hidden="true" />Windows</span>
        </p>
      </div>
      <HomeDemo :chinese="isChinese" />
    </section>

    <section class="home-features" :aria-label="isChinese ? 'TextGO 功能' : 'TextGO features'">
      <article v-for="feature in copy.features" :key="feature.title" class="feature-card">
        <component :is="feature.icon" class="feature-watermark" :size="128" weight="light" aria-hidden="true" />
        <span class="feature-icon"
          ><component :is="feature.icon" :size="24" weight="duotone" aria-hidden="true"
        /></span>
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </article>
    </section>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'TextGO Wordmark';
  src: url('/fonts/manrope-textgo-800.ttf') format('truetype');
  font-style: normal;
  font-weight: 800;
  font-display: swap;
}

.textgo-home {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 64px 0;
}

.home-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 28px;
  padding-bottom: 32px;
}

.hero-intro {
  min-width: 0;
}

.hero-intro h1 {
  margin: 0;
  font-size: 56px;
  font-weight: 700;
  line-height: 64px;
  letter-spacing: -0.4px;
}

.hero-name,
.hero-title {
  display: block;
}

.hero-name {
  display: flex;
  align-items: center;
  gap: 0.34em;
  width: fit-content;
  padding-block: 0.12em;
  color: var(--vp-c-text-1);
  font-family: 'TextGO Wordmark', var(--vp-font-family-base);
  font-size: 1.5em;
  font-weight: 800;
  font-variant-ligatures: none;
  line-height: 1;
  letter-spacing: 0;
  transform: translateY(-0.1em);
}

.hero-name-go {
  position: relative;
  display: inline-grid;
  isolation: isolate;
  color: var(--vp-c-bg);
  font-size: 0.8em;
  transform: translate(-0.13em, -0.045em) rotate(-5deg);
}

.hero-name-go-text,
.hero-name-go::before,
.hero-name-go::after {
  background: color-mix(in srgb, var(--vp-c-brand-3), var(--vp-button-brand-bg));
  clip-path: polygon(0 0, calc(100% - 0.64em) 0, 100% 50%, calc(100% - 0.64em) 100%, 0 100%);
}

.hero-name-go-text {
  position: relative;
  z-index: 1;
  display: block;
  padding: 0.095em 0.6em 0.13em 0.17em;
  letter-spacing: 0.035em;
}

.hero-name-go::before,
.hero-name-go::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
}

.hero-name-go::before {
  opacity: 0.1176;
  transform: translate(-0.2em, 0.09em);
}

.hero-name-go::after {
  opacity: 0.28;
  transform: translate(-0.1em, 0.045em);
}

.hero-title {
  position: relative;
  isolation: isolate;
  width: fit-content;
  color: var(--vp-c-text-1);
  text-wrap: balance;
}

.hero-underline {
  position: absolute;
  z-index: -1;
  inset: 0;
  pointer-events: none;
}

.hero-underline :deep(.hero-text) {
  display: block;
  width: 100%;
  height: 100%;
}

.hero-underline :deep(.hero-svg) {
  top: auto;
  bottom: -0.18em;
}

.hero-tagline {
  max-width: 28em;
  margin-top: 12px;
  color: var(--vp-c-text-2);
  font-size: 24px;
  line-height: 36px;
  text-wrap: balance;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.hero-actions :deep(.VPButton) {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.hero-platforms {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 14px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 20px;
}
.hero-platforms span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.home-features {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.feature-card {
  --feature-wash: var(--vp-c-brand-soft);
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  /* A brand wash that starts behind the icon and fades into the card surface. */
  background:
    radial-gradient(140% 90% at 0% 0%, var(--feature-wash), transparent 55%),
    color-mix(in srgb, var(--vp-c-bg-soft) 65%, var(--vp-c-bg));
  transition:
    border-color 0.25s,
    box-shadow 0.25s;
}
.dark .feature-card {
  --feature-wash: color-mix(in srgb, var(--vp-c-brand-3) 6%, transparent);
}
.feature-card:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-3) 45%, var(--vp-c-divider));
  box-shadow: 0 12px 28px -18px color-mix(in srgb, var(--vp-c-brand-3) 60%, transparent);
}

.feature-icon {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--vp-c-brand-3) 26%, transparent),
    color-mix(in srgb, var(--vp-c-brand-3) 10%, transparent)
  );
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-3) 22%, transparent);
  color: var(--vp-c-brand-1);
}

/* The card's own icon, oversized and faint, fills the empty corner beside the icon chip. */
.feature-watermark {
  position: absolute;
  z-index: -1;
  top: -22px;
  right: -14px;
  color: var(--vp-c-brand-3);
  opacity: 0.08;
  pointer-events: none;
  transform: rotate(10deg);
  transition:
    opacity 0.25s,
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.feature-card:hover .feature-watermark {
  opacity: 0.14;
  transform: rotate(6deg) scale(1.06);
}

.feature-card h2 {
  margin-top: 14px;
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
}
.feature-card p {
  margin-top: 6px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 22px;
  text-wrap: pretty;
}

a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

@media (max-width: 1100px) {
  .textgo-home {
    padding-right: 32px;
    padding-left: 32px;
  }
  .hero-intro h1 {
    font-size: 48px;
    line-height: 56px;
  }
  .hero-tagline {
    font-size: 20px;
    line-height: 32px;
  }
  .hero-actions {
    gap: 8px;
  }
}

@media (max-width: 959px) {
  .home-hero {
    grid-template-columns: 1fr;
    gap: 36px;
    padding-bottom: 36px;
  }
  .hero-intro {
    text-align: center;
  }
  .hero-name,
  .hero-title {
    margin: 0 auto;
  }
  .hero-tagline {
    margin-right: auto;
    margin-left: auto;
  }
  .hero-actions,
  .hero-platforms {
    justify-content: center;
  }
  .home-features {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 639px) {
  .textgo-home {
    padding: 32px 24px 0;
  }
  .home-hero {
    gap: 28px;
  }
  .hero-intro h1 {
    font-size: 32px;
    line-height: 40px;
  }
  .hero-tagline {
    margin-top: 8px;
    font-size: 18px;
    line-height: 28px;
  }
  .hero-actions {
    margin-top: 24px;
  }
  .home-features {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .feature-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    column-gap: 16px;
    padding: 20px;
  }
  .feature-icon {
    grid-row: 1 / span 2;
  }
  .feature-card h2 {
    margin-top: 0;
  }
  .feature-card p {
    margin-top: 4px;
  }
  .feature-watermark {
    width: 96px;
    height: 96px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-card,
  .feature-watermark {
    transition: none;
  }
}
</style>
