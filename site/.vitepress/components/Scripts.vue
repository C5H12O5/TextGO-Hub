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
  <div class="scripts-list">
    <div v-if="scripts.length === 0" class="empty">
      No scripts found.
    </div>
    <div v-else class="list">
      <div v-for="script in scripts" class="item">
        <div class="icon">{{ script.icon }}</div>
        <div class="content">
          <div class="row">
            <span class="lang">{{ script.lang }}</span>
            <span class="name">{{ getLocalizedName(script) }}</span>
            <span v-for="platform in script.platforms" :key="platform" class="platform">{{ platform }}</span>
          </div>
          <div class="desc">{{ getLocalizedDescription(script) }}</div>
        </div>
        <button @click="downloadScript(script)">{{ downloadLabel }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scripts-list {
  margin: 24px 0;
}

.empty {
  padding: 48px 0;
  text-align: center;
  color: var(--vp-c-text-2);
}

.item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.item:last-child {
  border-bottom: none;
}

.icon {
  font-size: 24px;
}

.content {
  flex: 1;
}

.row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 4px;
}

.lang {
  padding: 2px 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  font-size: 12px;
}

.name {
  font-weight: 500;
}

.platform {
  padding: 2px 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  font-size: 12px;
}

.desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

button {
  padding: 6px 12px;
  background: var(--vp-c-brand-1);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: var(--vp-c-brand-2);
}
</style>
