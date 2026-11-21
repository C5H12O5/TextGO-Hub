<script setup lang="ts">
import type { Component } from 'vue';
import { Searcher, data } from '../data/searchers.data';
import Extensions from './Extensions.vue';

const props = defineProps<{
  title?: string;
  icon?: Component;
  emptyText?: string;
  filterText?: string;
}>();

// install website searcher via clipboard and deep-link
const install = (searcher: Searcher) => {
  navigator.clipboard
    .writeText(
      JSON.stringify({
        id: searcher.name,
        icon: searcher.icon,
        browser: searcher.browser,
        url: searcher.url
      })
    )
    .then(() => {
      window.location.href = `textgo://settings/searcher?install=true`;
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
    :install-handler="install"
  />
</template>
