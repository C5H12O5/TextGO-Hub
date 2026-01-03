<script setup lang="ts">
import * as phosphor from '@phosphor-icons/vue';
import { computed, type Component } from 'vue';

export type IconProps = {
  /** Icon name or base64-encoded SVG data URL. */
  icon: Component | string;
  /** Custom style class name. */
  class?: string;
};

const props = defineProps<IconProps>();

// mapping of phosphor icons
const phosphorIcons = Object.fromEntries(
  Object.entries(phosphor).filter(([name]) => name.startsWith('Ph'))
) as Record<string, Component>;

/**
 * Decode base64 SVG data URL to SVG HTML string.
 *
 * @param base64 - base64 SVG data URL
 * @param className - optional style class name
 */
function decodeBase64SVG(base64: string, className?: string): string {
  const data = base64.replace('data:image/svg+xml;base64,', '');
  const svg = atob(data);
  if (!className) {
    return svg;
  }
  // inject class attribute into the SVG tag
  return svg.replace(/<svg([^>]*)>/, (match, attrs) => {
    // check if class attribute already exists
    if (attrs.includes('class=')) {
      return match.replace(/class="([^"]*)"/, `class="$1 ${className}"`);
    }
    return `<svg${attrs} class="${className}">`;
  });
}

const isComponent = computed(() => typeof props.icon !== 'string');
const isBase64SVG = computed(() => typeof props.icon === 'string' && props.icon.startsWith('data:image/svg+xml;base64,'));

const iconComponent = computed(() => {
  if (isComponent.value) {
    return props.icon as Component;
  }
  if (!isBase64SVG.value) {
    return phosphorIcons[`Ph${props.icon as string}`];
  }
  return null;
});

const decodedSVG = computed(() => {
  if (isBase64SVG.value) {
    return decodeBase64SVG(props.icon as string, props.class);
  }
  return null;
});
</script>

<template>
  <!-- render phosphor icon component -->
  <component v-if="iconComponent" :is="iconComponent" :class="props.class" />
  <!-- render base64 SVG -->
  <span v-else-if="isBase64SVG" v-html="decodedSVG"></span>
</template>
