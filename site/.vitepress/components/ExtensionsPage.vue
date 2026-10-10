<script setup lang="ts">
import { PhCode, PhGlobe } from '@phosphor-icons/vue';
import { useData, useRouter } from 'vitepress';
import { computed, onMounted, onUnmounted, ref, useId } from 'vue';
import { data as scripts } from '../data/scripts.data';
import { data as searchers } from '../data/searchers.data';
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
    count: scripts.filter((item) => item.locales[lang.value]?.name).length,
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
    count: searchers.filter((item) => item.locales[lang.value]?.name).length,
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
    <header class="flex flex-wrap items-center gap-x-6 gap-y-4">
      <div class="shrink-0">
        <slot />
      </div>
      <div
        ref="tabList"
        role="tablist"
        :aria-label="isChinese ? '扩展类型' : 'Extension types'"
        class="ml-auto flex max-w-full min-w-0 grow gap-1 rounded-xl bg-(--vp-c-bg-soft) p-1 sm:grow-0"
        @keydown="onTabKeydown"
      >
        <button
          v-for="category in categories"
          :id="`${tabGroupId}-${category.id}-tab`"
          :key="category.id"
          type="button"
          role="tab"
          :aria-selected="activeCategory === category.id"
          :aria-controls="`${tabGroupId}-${category.id}-panel`"
          :tabindex="activeCategory === category.id ? 0 : -1"
          :class="[
            'flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5! py-2! text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--vp-c-brand-1) motion-reduce:transition-none sm:flex-none sm:gap-2 sm:px-4!',
            activeCategory === category.id
              ? 'bg-(--vp-c-brand-soft)! text-(--vp-c-brand-2)'
              : 'text-(--vp-c-text-2) hover:bg-(--vp-c-divider)! hover:text-(--vp-c-text-1)'
          ]"
          @click="selectCategory(category.id)"
        >
          <component :is="category.icon" aria-hidden="true" focusable="false" class="size-4.5 shrink-0" />
          <span>{{ category.label }}</span>
          <span class="min-w-4 text-xs tabular-nums">{{ category.count }}</span>
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
      <component :is="category.component" :empty-text="category.emptyText" :filter-text="category.filterText" />
    </section>
  </div>
</template>
