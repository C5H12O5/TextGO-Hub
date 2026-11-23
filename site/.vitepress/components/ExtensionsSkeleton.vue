<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';

// Loading state for the async `ExtensionsPage`: it receives the page title through the same slot and
// sketches the filters and lists until the chunk with all extension data arrives. Keep it free of
// heavy imports, since it ships in the theme bundle.
const { lang } = useData();
const isChinese = computed(() => lang.value.startsWith('zh'));
const loadingText = computed(() => (isChinese.value ? '正在加载扩展…' : 'Loading extensions…'));

// Approximate the localized tab and install labels so the real controls swap in without shifting.
const segmentWidths = computed(() => (isChinese.value ? [50, 50] : [68, 81]));
const installWidth = computed(() => `${isChinese.value ? 68 : 78}px`);

// Uneven widths read as real content rather than a uniform grid.
const tagWidths = [36, 56, 44, 68, 52, 40, 64, 48, 58];
const groups = [
  {
    title: 80,
    rows: [
      { name: 120, tags: [44, 52], description: 64 },
      { name: 96, tags: [48], description: 52 },
      { name: 136, tags: [40, 56], description: 70 },
      { name: 88, tags: [52], description: 46 },
      { name: 112, tags: [44, 40], description: 58 }
    ]
  },
  {
    title: 56,
    rows: [
      { name: 104, tags: [48], description: 56 },
      { name: 128, tags: [40, 52], description: 66 },
      { name: 92, tags: [56], description: 50 }
    ]
  }
];
</script>

<template>
  <div aria-busy="true" :style="{ '--install-width': installWidth }">
    <header class="page-header">
      <div class="page-title">
        <slot />
      </div>
      <div class="segmented" aria-hidden="true">
        <span v-for="(width, index) in segmentWidths" :key="index" class="segment">
          <span class="bone segment-bone" :style="{ width: `${width}px` }" />
        </span>
      </div>
    </header>

    <div role="status" class="sr-only">{{ loadingText }}</div>

    <div class="extensions" aria-hidden="true">
      <div class="filters">
        <div class="search-field">
          <span class="bone search-icon-bone" />
          <span class="bone search-text-bone" />
        </div>
        <div class="tag-filters">
          <span
            v-for="(width, index) in tagWidths"
            :key="index"
            class="bone tag-filter-bone"
            :style="{ width: `${width}px` }"
          />
        </div>
      </div>

      <div class="groups">
        <div v-for="(group, groupIndex) in groups" :key="groupIndex" class="list">
          <div class="list-header">
            <span class="bone list-icon-bone" />
            <span class="bone list-title-bone" :style="{ width: `${group.title}px` }" />
            <span class="bone list-count-bone" />
          </div>
          <div v-for="(row, rowIndex) in group.rows" :key="rowIndex" class="row">
            <span class="row-icon"><span class="bone row-icon-bone" /></span>
            <div class="row-main">
              <div class="row-title">
                <span class="bone row-name-bone" :style="{ width: `${row.name}px` }" />
                <span
                  v-for="(width, tagIndex) in row.tags"
                  :key="tagIndex"
                  class="bone row-tag-bone"
                  :style="{ width: `${width}px` }"
                />
              </div>
              <span class="bone row-description-bone" :style="{ width: `${row.description}%` }" />
            </div>
            <span class="bone install-bone" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Geometry mirrors `ExtensionsPage.vue` and `Extensions.vue` so the swap to real content does not shift. */
.bone {
  display: block;
  flex-shrink: 0;
  border-radius: 4px;
  background-color: color-mix(in oklab, var(--vp-c-text-1) 9%, transparent);
  animation: bone-pulse 1.6s ease-in-out infinite;
}

/* header */
.page-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 24px;
}
.page-title {
  flex-shrink: 0;
}
.segmented {
  display: flex;
  max-width: 100%;
  min-width: 0;
  flex-grow: 1;
  gap: 2px;
  margin-left: auto;
  padding: 2px;
  border-radius: var(--tg-radius-field);
  background-color: var(--tg-track);
}
.segment {
  display: flex;
  min-height: 40px;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
}
.segment-bone {
  height: 12px;
}

/* filters */
.extensions {
  margin: 24px 0 48px;
  /* skip the outline entirely when the chunk arrives quickly */
  animation: skeleton-in 0.2s 0.12s both;
}
.filters {
  display: grid;
  gap: 12px;
  margin-bottom: 24px;
}
.search-field {
  display: flex;
  height: 36px;
  align-items: center;
  gap: 8px;
  padding: 0 12px 0 11px;
  border: 1px solid var(--tg-control-edge);
  border-radius: var(--tg-radius-field);
  background-color: var(--vp-c-bg);
}
.search-icon-bone {
  width: 16px;
  height: 16px;
  border-radius: 999px;
}
.search-text-bone {
  width: min(240px, 50%);
  height: 12px;
}
.tag-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}
.tag-filter-bone {
  height: 24px;
  border-radius: calc(var(--tg-radius-field) - 2px);
}

/* lists */
.groups {
  display: grid;
  gap: 24px;
}
.list {
  overflow: hidden;
  border: 1px solid var(--tg-border);
  border-radius: var(--tg-radius-box);
  background-color: var(--vp-c-bg);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
.list-header {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  padding: 4px 12px;
  border-bottom: 1px solid var(--tg-border);
  background-color: var(--tg-surface-150);
  background-image: var(--tg-header-gradient);
}
.list-icon-bone {
  width: 16px;
  height: 16px;
}
.list-title-bone {
  height: 10px;
}
.list-count-bone {
  width: 24px;
  height: 18px;
  margin-left: auto;
  border-radius: 999px;
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 10px 12px 10px 14px;
}
.row:nth-child(odd) {
  /* the header is the first child, so odd rows are the even list items */
  background-color: var(--tg-surface-150);
}
.row-icon {
  display: grid;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  place-items: center;
}
.row-icon-bone {
  width: 24px;
  height: 24px;
  border-radius: 6px;
}
.row-main {
  min-width: 0;
  flex: 2 1 0;
}
.row-title {
  display: flex;
  min-height: 22px;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
}
.row-name-bone {
  max-width: 100%;
  height: 14px;
}
.row-tag-bone {
  height: 20px;
  border-radius: var(--tg-radius-selector);
}
.row-description-bone {
  max-width: 100%;
  height: 12px;
  margin-top: 6px;
  margin-bottom: 4px;
}
.install-bone {
  width: var(--install-width);
  height: 28px;
  border-radius: var(--tg-radius-field);
}

@keyframes bone-pulse {
  50% {
    opacity: 0.5;
  }
}
@keyframes skeleton-in {
  from {
    opacity: 0;
  }
}

@media (min-width: 640px) {
  .segmented {
    flex-grow: 0;
  }
  .segment {
    min-height: 28px;
    flex: none;
    padding: 0 14px;
  }
}

@media (max-width: 639px) {
  .search-field {
    height: 44px;
  }
  .tag-filter-bone {
    height: 32px;
  }
  .row {
    padding: 12px;
  }
  .install-bone {
    width: 44px;
    height: 44px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bone,
  .extensions {
    animation: none;
  }
}
</style>
