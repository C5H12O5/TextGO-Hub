<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';
import { Script, data as scripts } from '../data/scripts.data';

defineProps<{
  downloadLabel?: string;
}>();

const { lang } = useData();

const currentLang = computed(() => {
  return lang.value === 'zh-CN' ? 'zh-CN' : 'en';
});

const getLocalizedName = (extension: Script) => {
  return extension.locales[currentLang.value]?.name || extension.locales['en']?.name || '';
};

const getLocalizedDescription = (extension: Script) => {
  return extension.locales[currentLang.value]?.description || extension.locales['en']?.description || '';
};

const downloadScript = (extension: Script) => {
  const content = JSON.stringify({
    type: extension.type,
    icon: extension.icon,
    lang: extension.lang,
    script: extension.script,
    locales: extension.locales,
    platforms: extension.platforms
  }, null, 2);

  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  // link.download = extension.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
</script>

<template>
  <div class="my-6">
    <div v-for="script in scripts"
      class="flex gap-3 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div class="text-2xl">{{ script.icon }}</div>
      <div class="flex-1">
        <div class="flex gap-2 items-center mb-1">
          <span class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">{{ script.lang }}</span>
          <span class="font-medium">{{ getLocalizedName(script) }}</span>
          <span v-for="platform in script.platforms" :key="platform"
            class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">{{ platform }}</span>
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">{{ getLocalizedDescription(script) }}</div>
      </div>
      <button @click="downloadScript(script)"
        class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer text-sm">{{ downloadLabel
        }}</button>
    </div>
  </div>
</template>
