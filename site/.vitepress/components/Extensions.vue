<script setup lang="ts" generic="T extends Extension">
import {
  PhClipboardText,
  PhDownloadSimple,
  PhFunnel,
  PhInfo,
  PhLightbulb,
  PhMagnifyingGlass
} from '@phosphor-icons/vue';
import { useData } from 'vitepress';
import { computed, nextTick, ref, shallowRef, useId, type Component } from 'vue';
import type { Extension } from '../types';
import Icon from './Icon.vue';
import SearchHighlight from './SearchHighlight.vue';

const props = withDefaults(
  defineProps<{
    data: T[];
    /** List title used when items are not grouped. */
    title?: string;
    /** List icon used when a group has no icon of its own. */
    icon?: Component;
    emptyText?: string;
    filterText?: string;
    groupBy?: (item: T) => string;
    groupOrder?: string[];
    groupIcons?: Record<string, Component>;
    installHandler: (item: T) => void;
  }>(),
  {
    title: '',
    emptyText: 'No items found',
    filterText: 'Filter by name or description...'
  }
);

// current language
const { lang } = useData();
const isChinese = computed(() => lang.value.startsWith('zh'));
const listText = computed(() =>
  isChinese.value
    ? { install: '安装', results: '筛选结果：', viewSource: '在 GitHub 上查看源码' }
    : { install: 'Install', results: 'Results: ', viewSource: 'View source on GitHub' }
);

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
  if (filterTags.value.length > 0) {
    return searchTerms.value.length > 0
      ? isChinese.value
        ? '试试更简短的关键词，或再次点击已选标签来放宽筛选。'
        : 'Try fewer keywords, or click a selected tag again to broaden your results.'
      : isChinese.value
        ? '再次点击已选标签，即可放宽筛选范围。'
        : 'Click a selected tag again to broaden your results.';
  }
  return isChinese.value
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
    return [{ label: props.title, items: [...items.value].sort((a, b) => a.sort - b.sort) }];
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

// group header icon, falling back to the list icon
const groupIcon = (label: string) => props.groupIcons?.[label] ?? props.icon;
</script>

<template>
  <div class="extensions">
    <!-- Filters -->
    <div class="filters">
      <div class="search-field">
        <PhMagnifyingGlass aria-hidden="true" focusable="false" class="search-icon" />
        <input v-model="filterInput" type="search" :aria-label="props.filterText" :placeholder="props.filterText" />
      </div>
      <div class="tag-filters">
        <div class="result-count">
          <PhFunnel aria-hidden="true" focusable="false" class="result-count-icon" />
          <output aria-live="polite" aria-atomic="true">
            <span class="sr-only">{{ listText.results }}</span
            >{{ items.length }}
          </output>
        </div>
        <button
          v-for="tag in allTags"
          :key="tag"
          type="button"
          class="tag-filter"
          :aria-pressed="filterTags.includes(tag)"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>
    <!-- Items -->
    <div v-if="items.length > 0" class="groups">
      <section v-for="group in itemGroups" :key="group.label || 'items'" class="list">
        <header v-if="group.label" class="list-header">
          <component
            :is="groupIcon(group.label)"
            v-if="groupIcon(group.label)"
            aria-hidden="true"
            focusable="false"
            class="list-icon"
          />
          <h2 class="list-title"><SearchHighlight :text="group.label" :pattern="searchPattern" /></h2>
          <span class="list-count" aria-hidden="true">{{ group.items.length }}</span>
        </header>
        <ul class="rows">
          <li v-for="item in group.items" :key="item.path" class="row">
            <span class="row-icon" aria-hidden="true"><Icon :icon="item.icon" class="size-6" /></span>
            <div class="row-main">
              <div class="row-title">
                <a
                  :href="`https://github.com/C5H12O5/TextGO-Hub/blob/main/${item.path.split('/').slice(-3).join('/')}`"
                  target="_blank"
                  :title="listText.viewSource"
                  class="row-name"
                >
                  <SearchHighlight :text="item.name" :pattern="searchPattern" />
                </a>
                <button
                  v-for="tag in item.tags"
                  :key="tag"
                  type="button"
                  class="tag"
                  :aria-pressed="filterTags.includes(tag)"
                  @click="toggleTag(tag)"
                >
                  <SearchHighlight :text="tag" :pattern="searchPattern" />
                </button>
              </div>
              <p v-if="item.description" class="row-description">
                <SearchHighlight :text="item.description" :pattern="searchPattern" />
              </p>
            </div>
            <p v-if="item.tip" class="row-tip">
              <PhInfo aria-hidden="true" focusable="false" class="row-tip-icon" />
              <span>{{ item.tip }}</span>
            </p>
            <button
              type="button"
              class="push-button install-button"
              :aria-label="`${listText.install} ${item.name}`"
              @click="requestInstall(item, $event)"
            >
              <PhDownloadSimple aria-hidden="true" focusable="false" weight="bold" class="install-icon" />
              <span class="install-label">{{ listText.install }}</span>
            </button>
          </li>
        </ul>
      </section>
    </div>
    <div v-else class="list empty">
      <PhMagnifyingGlass aria-hidden="true" focusable="false" class="empty-icon" />
      <p class="empty-title">{{ props.emptyText }}</p>
      <p class="empty-hint">
        <PhLightbulb aria-hidden="true" focusable="false" class="empty-hint-icon" />
        <span>{{ emptyHint }}</span>
      </p>
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
      class="sheet-dialog"
      @click.self="cancelInstall"
      @cancel.prevent="cancelInstall"
      @keydown.tab="trapInstallConsentFocus"
    >
      <div class="sheet">
        <h2 :id="`${installConsentDialogId}-title`" class="sheet-title">
          <PhClipboardText aria-hidden="true" focusable="false" class="sheet-title-icon" />
          <span>{{ installConsentText.title }}</span>
        </h2>
        <div :id="`${installConsentDialogId}-description`" class="sheet-body">
          <p>{{ installConsentText.description }}</p>
          <p>{{ installConsentText.question }}</p>
        </div>
        <div class="sheet-actions">
          <button type="button" autofocus class="push-button" @click="cancelInstall">
            {{ installConsentText.cancel }}
          </button>
          <button type="button" class="push-button push-button-submit" @click="confirmInstall">
            {{ installConsentText.confirm }}
          </button>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
/* Mirrors the TextGO app's macOS list: see `List.svelte` and `src/styles/macos.css` in the app. */
.extensions {
  margin: 24px 0 48px;
}

/* filters */
.filters {
  display: grid;
  gap: 12px;
  margin-bottom: 24px;
}

.search-field {
  position: relative;
}
.search-icon {
  position: absolute;
  top: 50%;
  left: 11px;
  width: 16px;
  height: 16px;
  color: var(--vp-c-text-3);
  pointer-events: none;
  translate: 0 -50%;
  transition: color 0.2s;
}
.search-field:focus-within .search-icon {
  color: var(--vp-c-brand-1);
}
.search-field input {
  width: 100%;
  height: 36px;
  padding: 0 12px 0 34px;
  border: 1px solid var(--tg-control-edge);
  border-radius: var(--tg-radius-field);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.search-field input:focus {
  border-color: color-mix(in oklab, var(--vp-c-brand-1) 80%, transparent);
  box-shadow: 0 0 0 3px var(--tg-field-ring);
  outline: none;
}

.tag-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}
.result-count {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-width: 44px;
  margin-right: 2px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 24px;
  font-variant-numeric: tabular-nums;
}
.result-count-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* filter tags: raised push buttons that take the selection fill while on, like the app's check boxes */
.tag-filter {
  height: 24px;
  padding: 0 8px;
  border: 1px solid var(--tg-control-edge);
  border-radius: calc(var(--tg-radius-field) - 2px);
  background-color: var(--tg-control-fill);
  box-shadow: var(--tg-control-shadow);
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  white-space: nowrap;
}
.tag-filter:hover {
  color: var(--vp-c-text-1);
}
.tag-filter:active {
  background-color: var(--tg-control-pressed);
}
.tag-filter[aria-pressed='true'] {
  border-color: var(--tg-emphasis);
  background-color: var(--tg-emphasis);
  color: var(--tg-emphasis-content);
}
.tag-filter[aria-pressed='true']:active {
  background-color: color-mix(in oklab, var(--tg-emphasis), #000 10%);
}

/* lists: bordered container with a gradient header and striped rows */
.groups {
  display: grid;
  gap: 24px;
}
.list {
  overflow: hidden;
  border: 1px solid var(--tg-border);
  border-radius: var(--tg-radius-box);
  background-color: var(--vp-c-bg);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
.list-header {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  padding: 4px 12px;
  border-bottom: 1px solid var(--tg-border);
  background-color: var(--tg-surface-150);
  background-image: var(--tg-header-gradient);
  color: var(--vp-c-text-2);
  text-shadow: 0 1px rgb(0 0 0 / 0.05);
}
.list-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
.list-title {
  margin: 0;
  padding: 0;
  border: 0;
  color: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: normal;
}
.list-count {
  min-width: 22px;
  margin-left: auto;
  padding: 0 6px;
  border-radius: 999px;
  background-color: var(--tg-track);
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  text-shadow: none;
  font-variant-numeric: tabular-nums;
}

.rows {
  margin: 0;
  padding: 0;
  list-style: none;
}
.row {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  margin: 0;
  padding: 10px 12px 10px 14px;
}
.row:nth-child(even) {
  background-color: var(--tg-surface-150);
}

.row-icon {
  display: grid;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  place-items: center;
  color: var(--vp-c-text-1);
}

.row-main {
  min-width: 0;
  flex: 2 1 0;
}
.row-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
}
.row-name {
  min-width: 0;
  border-radius: 3px;
  color: var(--vp-c-text-1);
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  overflow-wrap: anywhere;
  text-decoration: none;
}
.row-name:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.row-description {
  margin: 2px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 20px;
  overflow-wrap: anywhere;
}

/* row tags: ghost badges */
.tag {
  height: 20px;
  padding: 0 6px;
  border-radius: var(--tg-radius-selector);
  background-color: var(--tg-track);
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
}
.tag:hover {
  background-color: color-mix(in oklab, var(--vp-c-text-1) 11%, transparent);
  color: var(--vp-c-text-1);
}
.tag[aria-pressed='true'] {
  background-color: var(--tg-emphasis);
  color: var(--tg-emphasis-content);
}

.row-tip {
  display: flex;
  max-width: 33%;
  flex-shrink: 0;
  align-items: flex-start;
  gap: 4px;
  margin: 0 4px 0 0;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 18px;
}
.row-tip-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-top: 2px;
}

/* push buttons: raised fill with a 1px edge, no hover state, darken while pressed */
.push-button {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 28px;
  padding: 0 10px;
  border: 1px solid var(--tg-control-edge);
  border-radius: var(--tg-radius-field);
  background-color: var(--tg-control-fill);
  box-shadow: var(--tg-control-shadow);
  color: var(--vp-c-text-1);
  font-size: 13px;
  line-height: 1;
  white-space: nowrap;
}
.push-button:active {
  background-color: var(--tg-control-pressed);
}
.push-button-submit {
  background-color: var(--tg-emphasis);
  color: var(--tg-emphasis-content);
}
.push-button-submit:active {
  background-color: color-mix(in oklab, var(--tg-emphasis), var(--vp-c-text-1) 12%);
}
.install-icon {
  width: 15px;
  height: 15px;
  color: var(--vp-c-brand-1);
}

:is(.tag-filter, .tag, .row-name, .push-button):focus-visible {
  outline: 2px solid var(--tg-focus-ring);
  outline-offset: 1px;
}

/* empty state */
.empty {
  display: flex;
  min-height: 176px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
}
.empty-icon {
  width: 28px;
  height: 28px;
  margin-bottom: 12px;
  color: var(--vp-c-text-3);
}
.empty-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}
.empty-hint {
  display: flex;
  max-width: 28rem;
  align-items: flex-start;
  gap: 4px;
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 22px;
  text-align: left;
}
.empty-hint-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 3px;
}

/* install consent: a sheet with large concentric corners and a light dimming layer */
.sheet-dialog {
  position: fixed;
  inset: 0;
  width: 100%;
  max-width: none;
  height: 100%;
  max-height: none;
  margin: 0;
  padding: 16px;
  border: 0;
  background: transparent;
  color: var(--vp-c-text-1);
}
.sheet-dialog[open] {
  display: flex;
  align-items: center;
  justify-content: center;
}
.sheet-dialog::backdrop {
  background-color: var(--tg-sheet-backdrop);
}
.sheet {
  display: flex;
  width: 100%;
  max-width: 440px;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border-radius: var(--tg-radius-sheet);
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--tg-sheet-shadow);
  animation: sheet-in 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.dark .sheet {
  box-shadow:
    0 0 0 1px rgb(255 255 255 / 0.1),
    0 24px 64px -12px rgb(0 0 0 / 0.6);
}
.sheet-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
}
.sheet-title-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
}
.sheet-body {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 22px;
}
.sheet-body p {
  margin: 0;
}
.sheet-body p + p {
  margin-top: 8px;
}
.sheet-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}
.sheet-actions .push-button {
  min-width: 80px;
  height: 32px;
  padding: 0 14px;
  font-size: 14px;
}

@keyframes sheet-in {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
}

@media (max-width: 639px) {
  .search-field input {
    height: 44px;
    font-size: 16px;
  }
  .tag-filter {
    height: 32px;
    line-height: 30px;
  }
  .row {
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr) auto;
    gap: 4px 12px;
    padding: 12px;
  }
  .row-icon {
    grid-row: 1;
  }
  .row-tip {
    grid-column: 2 / -1;
    grid-row: 2;
    max-width: none;
    margin: 0;
  }
  .install-button {
    grid-column: 3;
    grid-row: 1;
    width: 44px;
    height: 44px;
    padding: 0;
  }
  .install-icon {
    width: 18px;
    height: 18px;
  }
  .install-label {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .search-icon,
  .search-field input {
    transition: none;
  }
  .sheet {
    animation: none;
  }
}
</style>
