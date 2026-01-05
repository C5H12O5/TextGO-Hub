<script setup lang="ts" generic="T extends Extension">
import { PhDownloadSimple, PhFunnel } from '@phosphor-icons/vue';
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
    .map((item) => ({
      ...item,
      // localized fields
      tags: item.locales[lang.value]?.tags || [],
      name: item.locales[lang.value]?.name || '',
      description: item.locales[lang.value]?.description || ''
    }))
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
        class="w-full rounded-md border! border-(--vp-c-divider)! px-3! py-2! transition-colors focus:border-(--vp-c-brand-1)!"
      />
      <div v-if="allTags.length > 0" class="flex flex-wrap items-center gap-2">
        <PhFunnel weight="thin" class="size-6 opacity-80" />
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="filterTags.includes(tag) ? removeTag(tag) : addTag(tag)"
          :class="[
            'rounded-md px-3! py-1! text-sm transition-colors',
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
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-(--vp-c-brand-1)">{{ item.name }}</span>
            <span
              v-for="tag in item.tags"
              :key="tag"
              @click="addTag(tag)"
              class="cursor-pointer rounded-md bg-(--vp-sidebar-bg-color) px-1.5 py-0.5 text-xs opacity-80 transition-opacity hover:opacity-100"
            >
              {{ tag }}
            </span>
          </div>
          <div v-if="item.description" class="mt-1 text-sm opacity-60">{{ item.description }}</div>
        </div>
        <button @click="installHandler(item)" class="rounded-md p-1! transition-colors hover:bg-(--vp-button-alt-bg)!">
          <PhDownloadSimple class="size-6 opacity-80" />
        </button>
      </div>
    </div>
    <div v-else class="flex items-center justify-center py-4">
      <p class="text-sm opacity-50">{{ props.emptyText }}</p>
    </div>
  </div>
</template>
