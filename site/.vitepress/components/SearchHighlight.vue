<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  text: string;
  pattern: RegExp | null;
}>();

// The single capture group keeps matched text at odd indexes, without injecting HTML.
const parts = computed(() => (props.pattern ? props.text.split(props.pattern) : [props.text]));
</script>

<template>
  <template v-for="(part, index) in parts" :key="index">
    <mark v-if="index % 2 === 1" class="rounded-xs bg-(--vp-c-brand-soft) text-inherit">{{ part }}</mark>
    <template v-else>{{ part }}</template>
  </template>
</template>
