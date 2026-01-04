<script setup lang="ts">
import { PhDownloadSimple, PhFunnel } from '@phosphor-icons/vue';
import { useData } from 'vitepress';
import { computed, ref } from 'vue';
import { Script, data } from '../data/scripts.data';
import Icon from './Icon.vue';

const props = withDefaults(
  defineProps<{
    filterText?: string;
    emptyText?: string;
  }>(),
  {
    filterText: 'Filter scripts...',
    emptyText: 'No scripts found'
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
  data.forEach((script) => script.tags?.forEach((tag) => tags.add(tag)));
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

// filtered and sorted scripts
const scripts = computed(() => {
  return data
    .map((script) => ({
      ...script,
      // localized name and description
      name: script.locales[lang.value]?.name || '',
      description: script.locales[lang.value]?.description || ''
    }))
    .filter((script) => {
      if (!script.name) return false;

      // filter by input value
      const search = filterInput.value.toLowerCase();
      if (search && !script.name.toLowerCase().includes(search) && !script.description.toLowerCase().includes(search)) {
        return false;
      }

      // filter by selected tags
      if (filterTags.value.length > 0) {
        const tags = script.tags || [];
        if (!filterTags.value.every((tag) => tags.includes(tag))) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => a.sort - b.sort);
});

// install script via deep link
const install = (script: Script) => {
  navigator.clipboard
    .writeText(
      JSON.stringify({
        id: script.name,
        icon: script.icon,
        lang: script.lang,
        script: script.script
      })
    )
    .then(() => {
      window.location.href = `textgo://settings/script?install=true`;
    });
};
</script>

<template>
  <div class="my-6">
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
    <!-- Scripts -->
    <div v-if="scripts.length > 0">
      <div
        v-for="script in scripts"
        :key="script.path"
        class="flex items-center gap-3 border-b border-(--vp-c-divider) py-3 last:border-b-0"
      >
        <Icon :icon="script.icon" class="size-8" />
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-(--vp-c-brand-1)">{{ script.name }}</span>
            <span
              v-for="tag in script.tags"
              :key="tag"
              @click="addTag(tag)"
              class="cursor-pointer rounded-md bg-(--vp-sidebar-bg-color) px-1.5 py-0.5 text-xs opacity-80 transition-opacity hover:opacity-100"
            >
              {{ tag }}
            </span>
          </div>
          <div v-if="script.description" class="mt-1 text-sm opacity-60">{{ script.description }}</div>
        </div>
        <button @click="install(script)" class="rounded-md p-1! transition-colors hover:bg-(--vp-button-alt-bg)!">
          <PhDownloadSimple class="size-6 opacity-80" />
        </button>
      </div>
    </div>
    <div v-else class="flex items-center justify-center py-4">
      <p class="text-sm opacity-50">{{ props.emptyText }}</p>
    </div>
  </div>
</template>
