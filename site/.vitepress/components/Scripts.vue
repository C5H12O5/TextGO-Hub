<script setup lang="ts">
import { PhFileJs, PhFilePy, PhTerminal, PhTerminalWindow } from '@phosphor-icons/vue';
import type { Component } from 'vue';
import { Script, data } from '../data/scripts.data';
import Extensions from './Extensions.vue';

const props = defineProps<{
  title?: string;
  icon?: Component;
  emptyText?: string;
  filterText?: string;
}>();

const scriptGroupLabels: Record<string, string> = {
  javascript: 'JavaScript',
  python: 'Python',
  shell: 'Shell',
  powershell: 'PowerShell'
};
const scriptGroupOrder = Object.values(scriptGroupLabels);
const scriptGroupIcons: Record<string, Component> = {
  JavaScript: PhFileJs,
  Python: PhFilePy,
  Shell: PhTerminal,
  PowerShell: PhTerminalWindow
};
const groupByLanguage = (script: Script) => scriptGroupLabels[script.lang] || script.lang;

// install script via clipboard and deep-link
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
  <Extensions
    :data="data"
    :title="props.title"
    :icon="props.icon"
    :empty-text="props.emptyText"
    :filter-text="props.filterText"
    :group-by="groupByLanguage"
    :group-order="scriptGroupOrder"
    :group-icons="scriptGroupIcons"
    :install-handler="install"
  />
</template>
