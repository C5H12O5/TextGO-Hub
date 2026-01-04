<script setup lang="ts">
import { PhDownloadSimple } from "@phosphor-icons/vue";
import { useData } from 'vitepress';
import { computed } from 'vue';
import { Script, data } from '../data/scripts.data';
import Icon from './Icon.vue';

const { lang } = useData();

// localized scripts based on current language
const scripts = computed(() => {
  return data.map(script => ({
    ...script,
    name: script.locales[lang.value]?.name || '',
    description: script.locales[lang.value]?.description || ''
  })).filter(script => script.name);
});

// install script via deep link
const install = (script: Script) => {
  navigator.clipboard.writeText(JSON.stringify({
    id: script.name,
    icon: script.icon,
    lang: script.lang,
    script: script.script
  })).then(() => {
    window.location.href = `textgo://settings/${script.type}?install=true`;
  });
};
</script>

<template>
  <div class="my-6">
    <div v-for="script in scripts" :key="script.name"
      class="flex items-center gap-3 py-3 border-b border-(--vp-c-divider) last:border-b-0">
      <Icon :icon="script.icon" class="size-8" />
      <div class="flex-1">
        <div class="flex gap-2 items-center">
          <span class="font-semibold text-(--vp-c-brand-1)">{{ script.name }}</span>
          <span v-for="platform in script.platforms" :key="platform"
            class="px-1.5 py-0.5 bg-(--vp-sidebar-bg-color) rounded-md text-xs">{{ platform }}</span>
        </div>
        <div v-if="script.description" class="text-sm opacity-60 mt-1">{{ script.description }}</div>
      </div>
      <button @click="install(script)" class="p-1! hover:bg-(--vp-sidebar-bg-color)! rounded-md transition-colors">
        <PhDownloadSimple class="size-6 opacity-80" />
      </button>
    </div>
  </div>
</template>
