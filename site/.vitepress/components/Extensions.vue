<script setup lang="ts" generic="T extends Extension">
import { PhClipboardText, PhFunnel, PhInfo, PhMagnifyingGlass } from '@phosphor-icons/vue';
import { useData } from 'vitepress';
import { computed, nextTick, ref, shallowRef, useId } from 'vue';
import type { Extension } from '../types';
import Icon from './Icon.vue';
import SearchHighlight from './SearchHighlight.vue';

const props = withDefaults(
  defineProps<{
    data: T[];
    emptyText?: string;
    filterText?: string;
    groupBy?: (item: T) => string;
    groupOrder?: string[];
    installHandler: (item: T) => void;
  }>(),
  {
    emptyText: 'No items found',
    filterText: 'Filter by name or description...'
  }
);

// current language
const { lang } = useData();

// extension installation consent
const installConsentDialogId = useId();
const installConsentDialog = ref<HTMLDialogElement>();
const installTrigger = ref<HTMLElement>();
const pendingInstall = shallowRef<T>();
const isInstallConsentDialogOpen = ref(false);
const installConsentStorageKey = 'textgo:extension-install:clipboard-consent:v1';
const installConsentGrantedValue = 'granted';

const installConsentText = computed(() => {
  if (lang.value.startsWith('zh')) {
    return {
      title: '安装扩展',
      description: '安装扩展时，网站会先将扩展配置复制到系统剪贴板（会覆盖当前剪贴板内容），再打开 TextGO 完成安装。',
      question: '是否继续？',
      cancel: '取消',
      confirm: '同意并安装'
    };
  }

  return {
    title: 'Install extension',
    description:
      'To install extensions, this site will first copy the extension configuration to your system clipboard (replacing the current clipboard contents), then open TextGO to complete the installation.',
    question: 'Do you want to continue?',
    cancel: 'Cancel',
    confirm: 'Agree and install'
  };
});

const restoreInstallTriggerFocus = async () => {
  await nextTick();
  installTrigger.value?.focus();
};

const trapInstallConsentFocus = (event: KeyboardEvent) => {
  const buttons = installConsentDialog.value?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
  if (!buttons?.length) return;

  const first = buttons[0];
  const last = buttons[buttons.length - 1];
  const boundary = event.shiftKey ? first : last;

  if (document.activeElement === boundary) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  }
};

const requestInstall = async (item: T, event: MouseEvent) => {
  installTrigger.value = event.currentTarget as HTMLElement;

  if (window.localStorage.getItem(installConsentStorageKey) === installConsentGrantedValue) {
    props.installHandler(item);
    return;
  }

  pendingInstall.value = item;
  isInstallConsentDialogOpen.value = true;
  await nextTick();
  installConsentDialog.value?.showModal();
};

const cancelInstall = () => {
  pendingInstall.value = undefined;
  installConsentDialog.value?.close();
  isInstallConsentDialogOpen.value = false;
  void restoreInstallTriggerFocus();
};

const confirmInstall = () => {
  const item = pendingInstall.value;
  if (item === undefined) return;

  pendingInstall.value = undefined;
  installConsentDialog.value?.close();
  isInstallConsentDialogOpen.value = false;
  window.localStorage.setItem(installConsentStorageKey, installConsentGrantedValue);
  props.installHandler(item);
  void restoreInstallTriggerFocus();
};

// filter states
const filterInput = ref('');
const filterTags = ref<string[]>([]);
const searchTerms = computed(() => [...new Set(filterInput.value.toLowerCase().split(/\s+/).filter(Boolean))]);
const searchPattern = computed(() => {
  const terms = [...searchTerms.value]
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^$(){}|[\]\\]/g, '\\$&'));
  return terms.length ? new RegExp('(' + terms.join('|') + ')', 'gi') : null;
});

const emptyHint = computed(() => {
  const isChinese = lang.value.startsWith('zh');
  if (filterTags.value.length > 0) {
    return searchTerms.value.length > 0
      ? isChinese
        ? '试试更简短的关键词，或再次点击已选标签来放宽筛选。'
        : 'Try fewer keywords, or click a selected tag again to broaden your results.'
      : isChinese
        ? '再次点击已选标签，即可放宽筛选范围。'
        : 'Click a selected tag again to broaden your results.';
  }
  return isChinese
    ? '试试其他关键词，也可以搜索标签或使用空格组合多个关键词。'
    : 'Try different keywords or tags. Use spaces to combine multiple keywords.';
});

// all available tags
const allTags = computed(() => {
  const tags = new Set<string>();
  props.data.forEach((item) => {
    const localTags = item.locales[lang.value]?.tags || [];
    localTags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
});

// toggle tag filter
const toggleTag = (tag: string) => {
  const index = filterTags.value.indexOf(tag);
  if (index === -1) {
    filterTags.value.push(tag);
  } else {
    filterTags.value.splice(index, 1);
  }
};

// filtered items
const items = computed(() => {
  return props.data
    .map((item) => {
      const locale = item.locales[lang.value];
      return {
        ...item,
        // localized fields
        name: locale?.name || '',
        description: locale?.description || '',
        tags: locale?.tags || [],
        tip: locale?.tip || ''
      };
    })
    .filter((item) => {
      if (!item.name) return false;

      // Match every keyword across the name, description, tags and optional group.
      const searchableText = [item.name, item.description, ...item.tags, props.groupBy?.(item) || '']
        .join(' ')
        .toLowerCase();
      if (!searchTerms.value.every((term) => searchableText.includes(term))) {
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
    });
});

// group items first, then sort within each group
const itemGroups = computed(() => {
  if (!props.groupBy) {
    return [{ label: '', items: [...items.value].sort((a, b) => a.sort - b.sort) }];
  }

  const groups = new Map<string, typeof items.value>();
  items.value.forEach((item) => {
    const label = props.groupBy?.(item) || '';
    const group = groups.get(label);
    if (group) {
      group.push(item);
    } else {
      groups.set(label, [item]);
    }
  });

  const order = props.groupOrder || [];
  const orderIndex = (label: string) => {
    const index = order.indexOf(label);
    return index === -1 ? order.length : index;
  };

  return Array.from(groups, ([label, groupItems]) => ({
    label,
    items: groupItems.sort((a, b) => a.sort - b.sort)
  })).sort((a, b) => orderIndex(a.label) - orderIndex(b.label) || a.label.localeCompare(b.label));
});
</script>

<template>
  <div class="mt-6 mb-12">
    <!-- Filters -->
    <div class="mb-4 space-y-3">
      <div class="group relative">
        <PhMagnifyingGlass
          aria-hidden="true"
          focusable="false"
          class="pointer-events-none absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-(--vp-c-text-2) transition-colors group-focus-within:text-(--vp-c-brand-1) motion-reduce:transition-none"
        />
        <input
          v-model="filterInput"
          type="search"
          :aria-label="props.filterText"
          :placeholder="props.filterText"
          class="w-full rounded-md border! border-(--vp-c-divider)! py-2! pr-3! pl-10! shadow-xs transition-colors focus:border-(--vp-c-brand-1)! motion-reduce:transition-none"
        />
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <div class="mr-1 flex shrink-0 items-center gap-1.5 text-(--vp-c-text-2)">
          <PhFunnel aria-hidden="true" focusable="false" class="size-4.5 shrink-0" />
          <output aria-live="polite" aria-atomic="true" class="min-w-8 text-center text-sm tabular-nums">
            <span class="sr-only">{{ lang.startsWith('zh') ? '筛选结果：' : 'Results: ' }}</span>
            ({{ items.length }})
          </output>
        </div>
        <button
          v-for="tag in allTags"
          :key="tag"
          type="button"
          :aria-pressed="filterTags.includes(tag)"
          @click="toggleTag(tag)"
          :class="[
            'cursor-pointer rounded-md px-2! py-1.5! text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--vp-c-brand-1) motion-reduce:transition-none sm:py-0.5!',
            filterTags.includes(tag)
              ? 'bg-(--vp-c-brand-soft)! text-(--vp-c-brand-2)!'
              : 'bg-(--vp-c-bg-soft)! text-(--vp-c-text-2) hover:bg-(--vp-c-default-soft)! hover:text-(--vp-c-text-1)'
          ]"
        >
          {{ tag }}
        </button>
      </div>
    </div>
    <!-- Items -->
    <div v-if="items.length > 0">
      <section v-for="group in itemGroups" :key="group.label || 'items'" :class="group.label ? 'mt-8 first:mt-0' : ''">
        <h2
          v-if="group.label"
          class="m-0! mb-2! flex items-center gap-2 border-0! pt-2! text-sm! leading-6! tracking-wide! text-(--vp-c-text-2)"
        >
          <span><SearchHighlight :text="group.label" :pattern="searchPattern" /></span>
        </h2>
        <div class="rounded-lg border border-(--vp-c-divider) px-3 sm:px-4">
          <div
            v-for="item in group.items"
            :key="item.path"
            class="grid grid-cols-[2rem_minmax(0,1fr)_2.75rem] items-center gap-x-3 gap-y-1 border-b border-(--vp-c-divider) py-3 last:border-b-0 sm:flex sm:gap-3"
          >
            <Icon :icon="item.icon" class="size-8" />
            <div class="min-w-0 sm:flex-2">
              <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                <a
                  :href="`https://github.com/C5H12O5/TextGO-Hub/blob/main/${item.path.split('/').slice(-3).join('/')}`"
                  target="_blank"
                  class="min-w-0 font-semibold wrap-anywhere text-(--vp-c-brand-1) no-underline! hover:underline!"
                >
                  <SearchHighlight :text="item.name" :pattern="searchPattern" />
                </a>
                <button
                  v-for="tag in item.tags"
                  :key="tag"
                  type="button"
                  :aria-pressed="filterTags.includes(tag)"
                  @click="toggleTag(tag)"
                  :class="[
                    'cursor-pointer rounded-md px-1.5! py-0.5! text-xs whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--vp-c-brand-1) motion-reduce:transition-none',
                    filterTags.includes(tag)
                      ? 'bg-(--vp-c-brand-soft)! text-(--vp-c-brand-2)!'
                      : 'bg-(--vp-c-bg-soft)! text-(--vp-c-text-2) hover:bg-(--vp-c-divider)! hover:text-(--vp-c-text-1)'
                  ]"
                >
                  <SearchHighlight :text="tag" :pattern="searchPattern" />
                </button>
              </div>
              <div v-if="item.description" class="mt-1 text-sm wrap-anywhere text-(--vp-c-text-2)">
                <SearchHighlight :text="item.description" :pattern="searchPattern" />
              </div>
            </div>
            <div
              v-if="item.tip"
              class="col-start-2 row-start-2 flex min-w-0 items-start gap-1 text-(--vp-c-text-2) sm:mr-2 sm:max-w-1/3 sm:shrink-0 sm:justify-end"
            >
              <PhInfo aria-hidden="true" focusable="false" class="mt-0.5 size-4 shrink-0" />
              <span class="text-xs leading-5">{{ item.tip }}</span>
            </div>
            <button
              type="button"
              :aria-label="`${installConsentText.confirm}: ${item.name}`"
              @click="requestInstall(item, $event)"
              class="col-start-3 row-start-1 shrink-0 rounded-md p-2.5! text-(--vp-c-text-2) transition-all hover:bg-(--vp-c-brand-soft)! hover:text-(--vp-c-brand-1) focus-visible:bg-(--vp-c-brand-soft)! focus-visible:text-(--vp-c-brand-1) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--vp-c-brand-1) active:scale-95 motion-reduce:transition-none sm:p-1!"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6">
                <path
                  fill="currentColor"
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4.18C9.6 1.84 10.7 1 12 1s2.4.84 2.82 2zm-7 0a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M7 7V5H5v14h14V5h-2v2zm5 11l-5-5h3V9h4v4h3z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
    <div v-else class="flex min-h-44 flex-col items-center justify-center px-4 py-8 text-center">
      <PhMagnifyingGlass aria-hidden="true" focusable="false" class="mb-3 size-7 text-(--vp-c-text-3)" />
      <p class="m-0! text-base font-medium">{{ props.emptyText }}</p>
      <p class="mt-2! mb-0! max-w-md text-sm leading-6! text-(--vp-c-text-2)">{{ emptyHint }}</p>
    </div>
  </div>

  <Teleport to="body">
    <dialog
      v-if="isInstallConsentDialogOpen"
      ref="installConsentDialog"
      role="alertdialog"
      aria-modal="true"
      :aria-labelledby="`${installConsentDialogId}-title`"
      :aria-describedby="`${installConsentDialogId}-description`"
      class="fixed inset-0 m-0 h-full max-h-none w-full max-w-none items-center justify-center border-0 bg-transparent p-4 backdrop:bg-black/50 open:flex"
      @click.self="cancelInstall"
      @cancel.prevent="cancelInstall"
      @keydown.tab="trapInstallConsentFocus"
    >
      <div class="w-full max-w-120 rounded-xl bg-(--vp-c-bg) p-6 text-(--vp-c-text-1) shadow-2xl">
        <div class="flex items-start gap-4">
          <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-(--vp-c-brand-soft)">
            <PhClipboardText class="size-6 text-(--vp-c-brand-1)" />
          </div>
          <div>
            <h2 :id="`${installConsentDialogId}-title`" class="m-0 text-lg font-semibold">
              {{ installConsentText.title }}
            </h2>
            <div :id="`${installConsentDialogId}-description`" class="mt-2 text-sm leading-6 text-(--vp-c-text-2)">
              <p class="m-0">{{ installConsentText.description }}</p>
              <p class="mt-2 mb-0">{{ installConsentText.question }}</p>
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-end gap-3">
          <button
            type="button"
            autofocus
            class="rounded-md bg-(--vp-button-alt-bg) px-4! py-2! text-sm font-medium transition-colors hover:bg-(--vp-button-alt-hover-bg) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--vp-c-brand-1)"
            @click="cancelInstall"
          >
            {{ installConsentText.cancel }}
          </button>
          <button
            type="button"
            class="rounded-md bg-(--vp-button-brand-bg) px-4! py-2! text-sm font-medium text-(--vp-button-brand-text) transition-colors hover:bg-(--vp-button-brand-hover-bg) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--vp-c-brand-1)"
            @click="confirmInstall"
          >
            {{ installConsentText.confirm }}
          </button>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>
