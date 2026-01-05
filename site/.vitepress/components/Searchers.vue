<script setup lang="ts">
import { Searcher, data } from '../data/searchers.data';
import Extensions from './Extensions.vue';

const props = defineProps<{
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
  <Extensions :data="data" :empty-text="props.emptyText" :filter-text="props.filterText" :install-handler="install" />
</template>
