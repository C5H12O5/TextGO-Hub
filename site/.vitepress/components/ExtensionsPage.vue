<script setup lang="ts">
import { PhCode, PhGlobe } from '@phosphor-icons/vue';
import { useData, useRouter } from 'vitepress';
import { computed, onMounted, onUnmounted, ref, useId } from 'vue';
import Scripts from './Scripts.vue';
import Searchers from './Searchers.vue';

type Category = 'scripts' | 'websites';

const { lang } = useData();
const router = useRouter();
const tabGroupId = useId();
const tabList = ref<HTMLElement>();
const activeCategory = ref<Category>('scripts');
const isChinese = computed(() => lang.value.startsWith('zh'));

const categories = computed(() => [
  {
    id: 'scripts' as const,
    label: isChinese.value ? '脚本' : 'Scripts',
    icon: PhCode,
    component: Scripts,
    filterText: isChinese.value
      ? '搜索名称、描述、标签或脚本语言…'
      : 'Search names, descriptions, tags or languages...',
    emptyText: isChinese.value ? '未找到匹配的脚本' : 'No scripts found'
  },
  {
    id: 'websites' as const,
    label: isChinese.value ? '网站' : 'Websites',
    icon: PhGlobe,
    component: Searchers,
    filterText: isChinese.value ? '搜索名称、描述或标签…' : 'Search names, descriptions or tags...',
    emptyText: isChinese.value ? '未找到匹配的网站' : 'No websites found'
  }
]);

// Keep existing Chinese and English section links working.
function syncCategoryFromHash() {
  const hash = window.location.hash.toLowerCase();
  if (hash === '#websites' || hash === `#${encodeURIComponent('网站').toLowerCase()}`) {
    activeCategory.value = 'websites';
  } else if (!hash || hash === '#scripts' || hash === `#${encodeURIComponent('脚本').toLowerCase()}`) {
    activeCategory.value = 'scripts';
  }
}

function selectCategory(category: Category) {
  if (activeCategory.value === category) return;
  activeCategory.value = category;
  void router.go(`${window.location.pathname}${window.location.search}#${category}`, { replace: true });
}

function onTabKeydown(event: KeyboardEvent) {
  const currentIndex = categories.value.findIndex((category) => category.id === activeCategory.value);
  let nextIndex: number;

  switch (event.key) {
    case 'ArrowRight':
      nextIndex = (currentIndex + 1) % categories.value.length;
      break;
    case 'ArrowLeft':
      nextIndex = (currentIndex + categories.value.length - 1) % categories.value.length;
      break;
    case 'Home':
      nextIndex = 0;
      break;
    case 'End':
      nextIndex = categories.value.length - 1;
      break;
    default:
      return;
  }

  event.preventDefault();
  selectCategory(categories.value[nextIndex].id);
  tabList.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus();
}

onMounted(() => {
  syncCategoryFromHash();
  window.addEventListener('hashchange', syncCategoryFromHash);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', syncCategoryFromHash);
});
</script>

<template>
  <div>
    <header class="page-header">
      <div class="page-title">
        <slot />
      </div>
      <div
        ref="tabList"
        role="tablist"
        :aria-label="isChinese ? '扩展类型' : 'Extension types'"
        class="segmented"
        @keydown="onTabKeydown"
      >
        <button
          v-for="category in categories"
          :id="`${tabGroupId}-${category.id}-tab`"
          :key="category.id"
          type="button"
          role="tab"
          class="segment"
          :aria-selected="activeCategory === category.id"
          :aria-controls="`${tabGroupId}-${category.id}-panel`"
          :tabindex="activeCategory === category.id ? 0 : -1"
          @click="selectCategory(category.id)"
        >
          <component :is="category.icon" aria-hidden="true" focusable="false" class="segment-icon" />
          <span>{{ category.label }}</span>
        </button>
      </div>
    </header>

    <section
      v-for="category in categories"
      :id="`${tabGroupId}-${category.id}-panel`"
      :key="category.id"
      v-show="activeCategory === category.id"
      role="tabpanel"
      :aria-labelledby="`${tabGroupId}-${category.id}-tab`"
    >
      <component
        :is="category.component"
        :title="category.label"
        :icon="category.icon"
        :empty-text="category.emptyText"
        :filter-text="category.filterText"
      />
    </section>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 24px;
}
.page-title {
  flex-shrink: 0;
}

/* segmented control: recessed track with the selected segment raised like a push button */
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
  min-width: 0;
  min-height: 40px;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: calc(var(--tg-radius-field) - 2px);
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition:
    color 0.2s,
    background-color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;
}
.segment:hover {
  color: var(--vp-c-text-1);
}
.segment[aria-selected='true'] {
  border-color: var(--tg-control-edge);
  background-color: var(--tg-control-fill);
  box-shadow: var(--tg-control-shadow);
  color: var(--vp-c-text-1);
}
.segment:focus-visible {
  outline: 2px solid var(--tg-focus-ring);
  outline-offset: 1px;
}
.segment-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
.segment[aria-selected='true'] .segment-icon {
  color: var(--vp-c-brand-1);
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

@media (prefers-reduced-motion: reduce) {
  .segment {
    transition: none;
  }
}
</style>
