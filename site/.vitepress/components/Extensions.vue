<script setup lang="ts" generic="T extends Extension">
import { PhFunnel, PhInfo } from '@phosphor-icons/vue';
import { useData } from 'vitepress';
import { computed, ref } from 'vue';
import type { Extension } from '../types';
import Icon from './Icon.vue';

const props = withDefaults(
  defineProps<{
    data: T[];
    emptyText?: string;
    filterText?: string;
    installHandler: (item: T) => void;
  }>(),
  {
    emptyText: 'No items found',
    filterText: 'Filter by name or description...'
  }
);

// current language
const { lang } = useData();

// filter states
const filterInput = ref('');
const filterTags = ref<string[]>([]);

// all available tags
const allTags = computed(() => {
  const tags = new Set<string>();
  props.data.forEach((item) => {
    const localTags = item.locales[lang.value]?.tags || [];
    localTags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
});

// add tag to filter
const addTag = (tag: string) => {
  if (!filterTags.value.includes(tag)) {
    filterTags.value.push(tag);
  }
};

// remove tag from filter
const removeTag = (tag: string) => {
  const index = filterTags.value.indexOf(tag);
  if (index > -1) {
    filterTags.value.splice(index, 1);
  }
};

// filtered and sorted items
const items = computed(() => {
  return props.data
    .map((item) => {
      const locale = item.locales[lang.value];
      return {
        ...item,
        // localized fields
        name: locale?.name || '',
        description: locale?.description || '',
        tags: locale?.tags || [],
        tip: locale?.tip || ''
      };
    })
    .filter((item) => {
      if (!item.name) return false;

      // filter by input value
      const search = filterInput.value.toLowerCase();
      if (search && !item.name.toLowerCase().includes(search) && !item.description.toLowerCase().includes(search)) {
        return false;
      }

      // filter by selected tags
      if (filterTags.value.length > 0) {
        const tags = item.tags || [];
        if (!filterTags.value.every((tag) => tags.includes(tag))) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => a.sort - b.sort);
});
</script>

<template>
  <div class="mt-6 mb-12">
    <!-- Filters -->
    <div class="mb-4 space-y-3">
      <input
        v-model="filterInput"
        type="search"
        :placeholder="props.filterText"
        class="w-full rounded-md border! border-(--vp-c-divider)! px-3! py-2! shadow-xs transition-colors focus:border-(--vp-c-brand-1)!"
      />
      <div v-if="allTags.length > 0" class="flex flex-wrap items-center gap-2">
        <PhFunnel weight="thin" class="size-6 opacity-80" />
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="filterTags.includes(tag) ? removeTag(tag) : addTag(tag)"
          :class="[
            'rounded-md px-2! py-0.5! text-sm font-medium shadow-xs transition-all active:scale-95',
            filterTags.includes(tag)
              ? 'bg-(--vp-c-brand-1)! text-(--vp-button-alt-bg)!'
              : 'bg-(--vp-button-alt-bg)! hover:bg-(--vp-c-divider)!'
          ]"
        >
          {{ tag }}
        </button>
      </div>
    </div>
    <!-- Items -->
    <div v-if="items.length > 0">
      <div
        v-for="item in items"
        :key="item.path"
        class="flex items-center gap-3 border-b border-(--vp-c-divider) py-3 last:border-b-0"
      >
        <Icon :icon="item.icon" class="size-8" />
        <div class="flex-2">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-(--vp-c-brand-1)">{{ item.name }}</span>
            <span
              v-for="tag in item.tags"
              :key="tag"
              @click="addTag(tag)"
              class="cursor-pointer rounded-md bg-(--vp-sidebar-bg-color) px-1.5 py-0.5 text-xs opacity-80 transition-all hover:opacity-100 active:scale-95"
            >
              {{ tag }}
            </span>
          </div>
          <div v-if="item.description" class="mt-1 text-sm opacity-60">{{ item.description }}</div>
        </div>
        <div v-if="item.tip" class="mr-2 flex flex-1 items-center justify-end gap-0.5 opacity-60">
          <PhInfo class="size-4 shrink-0" />
          <span class="text-xs italic">{{ item.tip }}</span>
        </div>
        <button
          @click="installHandler(item)"
          class="rounded-md p-1! transition-all hover:bg-(--vp-button-alt-bg)! active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6 opacity-80">
            <path
              fill="currentColor"
              d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4.18C9.6 1.84 10.7 1 12 1s2.4.84 2.82 2zm-7 0a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M7 7V5H5v14h14V5h-2v2zm5 11l-5-5h3V9h4v4h3z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div v-else class="flex items-center justify-center py-4">
      <p class="text-sm opacity-50">{{ props.emptyText }}</p>
    </div>
  </div>
</template>
