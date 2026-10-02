<script setup lang="ts">
import {
  PhArrowCounterClockwise,
  PhArrowElbowDownLeft,
  PhArrowsLeftRight,
  PhBracketsCurly,
  PhCheck,
  PhCopy,
  PhPushPin,
  PhSwap,
  PhTranslate,
  PhX
} from '@phosphor-icons/vue';
import { computed, nextTick, ref, watch } from 'vue';

const props = defineProps<{ chinese: boolean }>();
type Scenario = 'case' | 'json' | 'translate';
type Action = 'snake' | 'kebab' | 'camel' | 'format' | 'translate';
const scenario = ref<Scenario>('case');
const stage = ref<'selected' | 'result' | 'inserted'>('selected');
const result = ref('');
const originalResult = ref('');
const insertedText = ref('');
const copyStatus = ref<'idle' | 'copied' | 'failed'>('idle');
const resultInput = ref<HTMLTextAreaElement>();
const toolbarElement = ref<HTMLDivElement>();
const replayButton = ref<HTMLButtonElement>();

const copy = computed(() =>
  props.chinese
    ? {
        demo: 'TextGO 交互演示',
        scenarios: '选择演示场景',
        case: '命名转换',
        json: 'JSON 格式化',
        translate: 'AI 翻译',
        snake: '下划线',
        kebab: '连字符',
        camel: '小驼峰',
        format: '格式化',
        translateAction: '翻译',
        toolbar: '选中文本的操作工具栏',
        result: '处理结果',
        reset: '还原结果',
        copy: '复制',
        copied: '已复制',
        copyFailed: '复制失败，请选择文本后手动复制。',
        insert: '插入',
        close: '关闭结果',
        replay: '重新演示',
        replaceHint: '点击工具栏中的动作，直接替换选中文字。',
        selectedHint: '点击工具栏中的动作，查看处理结果。',
        resultHint: '点击“插入”，将结果替换到示例选区。',
        insertedHint: '已替换示例中的文本。',
        english: '英语',
        chinese: '简体中文'
      }
    : {
        demo: 'Interactive TextGO demo',
        scenarios: 'Choose a demo scenario',
        case: 'Naming',
        json: 'JSON',
        translate: 'AI Translation',
        snake: 'snake_case',
        kebab: 'kebab-case',
        camel: 'camelCase',
        format: 'Format',
        translateAction: 'Translate',
        toolbar: 'Actions for selected text',
        result: 'Action result',
        reset: 'Reset result',
        copy: 'Copy',
        copied: 'Copied',
        copyFailed: 'Copy failed. Select the text to copy it manually.',
        insert: 'Insert',
        close: 'Close result',
        replay: 'Replay',
        replaceHint: 'Click a toolbar action to replace the selected text.',
        selectedHint: 'Click a toolbar action to see the result.',
        resultHint: 'Click Insert to replace the example selection.',
        insertedHint: 'The example selection has been replaced.',
        english: 'English',
        chinese: 'Simplified Chinese'
      }
);

const scenarios: Scenario[] = ['case', 'json', 'translate'];
const sourceText = computed(() => {
  if (scenario.value === 'json') return '{"name":"TextGO","enabled":true}';
  if (scenario.value === 'translate') return 'Please send me the updated document.';
  return 'HelloWorld';
});
const documentName = computed(() => {
  if (scenario.value === 'json') return 'config.json';
  if (scenario.value === 'translate') return 'message.txt';
  return 'TextGO.md';
});
const actions = computed<{ id: Action; label: string }[]>(() => {
  if (scenario.value === 'json') {
    return [{ id: 'format', label: copy.value.format }];
  }
  if (scenario.value === 'translate') return [{ id: 'translate', label: copy.value.translateAction }];
  return [
    { id: 'snake', label: copy.value.snake },
    { id: 'kebab', label: copy.value.kebab },
    { id: 'camel', label: copy.value.camel }
  ];
});
const actionIcon = computed(() =>
  scenario.value === 'case' ? PhSwap : scenario.value === 'json' ? PhBracketsCurly : PhTranslate
);
const status = computed(() => {
  if (copyStatus.value === 'failed') return copy.value.copyFailed;
  if (copyStatus.value === 'copied') return copy.value.copied;
  if (stage.value === 'result') return copy.value.resultHint;
  if (stage.value === 'inserted') return copy.value.insertedHint;
  return scenario.value === 'case' ? copy.value.replaceHint : copy.value.selectedHint;
});

function reset() {
  stage.value = 'selected';
  result.value = '';
  originalResult.value = '';
  insertedText.value = '';
  copyStatus.value = 'idle';
}

function chooseScenario(value: Scenario) {
  if (scenario.value === value) return;
  scenario.value = value;
  reset();
}

async function runAction(action: Action) {
  const name = sourceText.value;
  switch (action) {
    case 'snake':
      result.value = name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
      break;
    case 'kebab':
      result.value = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      break;
    case 'camel':
      result.value = name.charAt(0).toLowerCase() + name.slice(1);
      break;
    case 'format':
      result.value = JSON.stringify(JSON.parse(name), null, 2);
      break;
    case 'translate':
      // This is a local example of the translation popup; it does not call an AI service.
      result.value = '请把更新后的文档发给我。';
      break;
  }
  if (scenario.value === 'case') {
    await insertResult();
    return;
  }
  originalResult.value = result.value;
  stage.value = 'result';
  copyStatus.value = 'idle';
  await nextTick();
  resultInput.value?.focus({ preventScroll: true });
}

async function copyResult() {
  try {
    await navigator.clipboard.writeText(result.value);
    copyStatus.value = 'copied';
  } catch {
    copyStatus.value = 'failed';
  }
}

async function insertResult() {
  insertedText.value = result.value;
  stage.value = 'inserted';
  copyStatus.value = 'idle';
  await nextTick();
  replayButton.value?.focus({ preventScroll: true });
}

async function closeResult() {
  reset();
  await nextTick();
  toolbarElement.value?.querySelector('button')?.focus({ preventScroll: true });
}

watch(() => props.chinese, reset);
watch(result, () => {
  copyStatus.value = 'idle';
});
</script>

<template>
  <section class="home-demo" :aria-label="copy.demo">
    <div class="scenario-options" role="group" :aria-label="copy.scenarios">
      <button
        v-for="item in scenarios"
        :key="item"
        type="button"
        :aria-pressed="scenario === item"
        @mouseenter="chooseScenario(item)"
        @click="chooseScenario(item)"
      >
        {{ copy[item] }}
      </button>
    </div>

    <div class="demo-stage">
      <div class="document-window">
        <div class="document-titlebar">
          <span class="window-controls" aria-hidden="true"><i></i><i></i><i></i></span>
          <span>{{ documentName }}</span>
        </div>
        <div class="document-body">
          <p class="document-context">
            {{
              scenario === 'case' ? '# Naming' : scenario === 'json' ? '// App settings' : 'Subject: Document update'
            }}
          </p>
          <pre v-if="stage === 'inserted'" class="inserted-text">{{ insertedText }}</pre>
          <pre v-else><mark>{{ sourceText }}</mark></pre>
        </div>
        <div class="document-status" aria-hidden="true">
          <span>UTF-8</span><span>{{ documentName.split('.').pop()?.toUpperCase() }}</span>
        </div>
      </div>

      <div
        v-if="stage === 'selected'"
        ref="toolbarElement"
        class="selection-toolbar"
        role="group"
        :aria-label="copy.toolbar"
      >
        <span class="toolbar-handle" aria-hidden="true"></span>
        <button v-for="action in actions" :key="action.id" type="button" @click="runAction(action.id)">
          <component :is="actionIcon" :size="17" aria-hidden="true" />
          <span>{{ action.label }}</span>
        </button>
      </div>

      <div
        v-if="stage === 'result'"
        class="result-window"
        :class="{ 'translation-window': scenario === 'translate' }"
        role="region"
        :aria-label="copy.result"
      >
        <div class="result-titlebar">
          <PhPushPin :size="14" class="pin-icon" aria-hidden="true" />
          <span v-if="scenario === 'translate'" class="result-title"
            ><PhTranslate :size="14" aria-hidden="true" />{{ copy.translateAction }}</span
          >
          <div class="result-controls">
            <template v-if="scenario !== 'translate'">
              <button type="button" :title="copy.reset" :aria-label="copy.reset" @click="result = originalResult">
                <PhArrowCounterClockwise :size="15" aria-hidden="true" />
              </button>
              <button type="button" :title="copy.copy" :aria-label="copy.copy" @click="copyResult">
                <component :is="copyStatus === 'copied' ? PhCheck : PhCopy" :size="15" aria-hidden="true" />
              </button>
              <button type="button" :title="copy.insert" :aria-label="copy.insert" @click="insertResult">
                <PhArrowElbowDownLeft :size="15" aria-hidden="true" />
              </button>
            </template>
            <button type="button" :title="copy.close" :aria-label="copy.close" @click="closeResult">
              <PhX :size="15" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div v-if="scenario === 'translate'" class="translation-content">
          <div class="translation-languages">
            <span>{{ copy.english }}</span
            ><PhArrowsLeftRight :size="14" aria-hidden="true" /><span>{{ copy.chinese }}</span>
          </div>
          <p class="translation-source">{{ sourceText }}</p>
          <textarea ref="resultInput" v-model="result" :aria-label="copy.result" spellcheck="false" />
          <div class="translation-actions">
            <button type="button" @click="copyResult">
              <component :is="copyStatus === 'copied' ? PhCheck : PhCopy" :size="14" aria-hidden="true" />{{
                copy.copy
              }}
            </button>
            <button type="button" @click="insertResult">
              <PhArrowElbowDownLeft :size="14" aria-hidden="true" />{{ copy.insert }}
            </button>
          </div>
        </div>
        <div v-else class="result-editor">
          <div class="line-numbers" aria-hidden="true">
            <span v-for="line in result.split('\n').length" :key="line">{{ line }}</span>
          </div>
          <textarea ref="resultInput" v-model="result" :aria-label="copy.result" spellcheck="false" />
        </div>
      </div>
    </div>

    <div class="demo-footer">
      <p role="status">{{ status }}</p>
      <button v-if="stage !== 'selected'" ref="replayButton" type="button" @click="closeResult">
        <PhArrowCounterClockwise :size="14" aria-hidden="true" />{{ copy.replay }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.home-demo {
  min-width: 0;
  width: 100%;
  max-width: 560px;
  justify-self: center;
}

.scenario-options {
  display: flex;
  justify-content: center;
  gap: 4px;
  width: fit-content;
  max-width: 100%;
  padding: 4px;
  margin: 0 auto;
  border-radius: 9px;
  background: var(--vp-c-bg-soft);
}

.scenario-options button {
  padding: 6px 12px;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  transition:
    color 0.2s,
    background-color 0.2s,
    box-shadow 0.2s;
}

.scenario-options button:hover {
  color: var(--vp-c-text-1);
}
.scenario-options button[aria-pressed='true'] {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-shadow: 0 1px 4px #0000000d;
}

.demo-stage {
  position: relative;
  height: 416px;
  perspective: 1000px;
  isolation: isolate;
}

.demo-stage::before {
  position: absolute;
  z-index: -1;
  inset: 76px 30px 60px;
  border-radius: 50%;
  background: var(--vp-home-hero-image-background-image);
  filter: blur(65px);
  opacity: 0.15;
  content: '';
}

.document-window {
  position: absolute;
  top: 38px;
  right: 24px;
  left: 8px;
  height: 278px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  box-shadow:
    1px 2px 0 var(--vp-c-divider),
    12px 24px 40px -24px #00000040;
  transform: rotateX(8deg) rotateY(-12deg) rotateZ(-2deg);
}

.document-titlebar {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 36px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 11px;
  font-weight: 500;
}

.window-controls {
  display: flex;
  position: absolute;
  left: 12px;
  gap: 6px;
}
.window-controls i {
  width: 9px;
  height: 9px;
  border: 1px solid #00000012;
  border-radius: 50%;
  background: #ff6058;
}
.window-controls i:nth-child(2) {
  background: #ffbd2e;
}
.window-controls i:nth-child(3) {
  background: #28c840;
}

.document-body {
  padding: 22px 26px;
}
.document-context {
  margin-bottom: 14px;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  line-height: 20px;
}
.document-body pre {
  margin: 0;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: 25px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.document-body mark {
  padding: 3px 2px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
.document-status {
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: space-between;
  padding: 4px 12px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  font-size: 9px;
  line-height: 16px;
}

.selection-toolbar {
  display: flex;
  position: absolute;
  z-index: 2;
  top: 205px;
  left: 104px;
  align-items: center;
  height: 34px;
  padding: 2px 4px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  box-shadow:
    0 4px 14px #0000001a,
    0 16px 24px -16px #00000040;
  transform: rotateX(8deg) rotateY(-12deg) rotateZ(-2deg) translateZ(55px);
}

.toolbar-handle {
  width: 3px;
  height: 14px;
  margin: 0 6px 0 2px;
  border-radius: 2px;
  background: var(--vp-c-text-3);
  opacity: 0.55;
}
.selection-toolbar button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  padding: 0 8px;
  border-radius: 4px;
  color: var(--vp-c-text-1);
  font-size: 11px;
  font-weight: 450;
  white-space: nowrap;
}
.selection-toolbar button:hover {
  background: var(--vp-c-default-soft);
}

.result-window {
  position: absolute;
  z-index: 3;
  top: 181px;
  right: 0;
  width: 305px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow:
    0 10px 32px -12px #00000040,
    1px 2px 0 var(--vp-c-divider);
  transform: rotateX(5deg) rotateY(-8deg) rotateZ(-1deg) translateZ(65px);
  animation: show-result 0.25s ease-out;
}

.result-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 6px 0 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}
.pin-icon {
  flex-shrink: 0;
}
.result-title {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
}
.result-controls {
  display: flex;
  gap: 1px;
  margin-left: auto;
}
.result-controls button {
  display: grid;
  place-items: center;
  width: 26px;
  height: 25px;
  border-radius: 4px;
}
.result-controls button:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}
.result-editor {
  display: flex;
  height: 140px;
  padding: 12px 0;
}
.line-numbers {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 30px;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  line-height: 22px;
  text-align: center;
  overflow: hidden;
}
.result-editor textarea {
  width: 100%;
  min-width: 0;
  padding: 0 12px 0 4px;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  line-height: 22px;
  white-space: pre;
}
textarea {
  display: block;
  border: 0;
  border-radius: 0;
  background: transparent;
  resize: none;
}
textarea:focus {
  outline: none;
}

.translation-window {
  top: 185px;
}
.translation-content {
  padding: 12px;
}
.translation-languages {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
  color: var(--vp-c-text-2);
  font-size: 10px;
  line-height: 18px;
}
.translation-source {
  padding-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 11px;
  line-height: 18px;
}
.translation-content textarea {
  width: 100%;
  height: 48px;
  margin-top: 10px;
  padding: 0;
  color: var(--vp-c-text-1);
  font-size: 12px;
  line-height: 20px;
}
.translation-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 2px;
}
.translation-actions button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 4px;
  border-radius: 3px;
  color: var(--vp-c-text-2);
  font-size: 10px;
}
.translation-actions button:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.demo-footer {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px 16px;
  min-height: 40px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  line-height: 20px;
}
.demo-footer p {
  margin: 0;
}
.demo-footer button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-text-2);
}
.demo-footer button:hover {
  color: var(--vp-c-brand-1);
}
button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

@keyframes show-result {
  from {
    opacity: 0;
    translate: 0 8px;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@media (max-width: 1100px) and (min-width: 960px) {
  .selection-toolbar {
    left: 72px;
  }
  .selection-toolbar button {
    gap: 4px;
    padding-right: 6px;
    padding-left: 6px;
  }
}

@media (max-width: 639px) {
  .demo-stage {
    height: 410px;
  }
  .document-window {
    top: 28px;
    right: 8px;
    left: 0;
    height: 255px;
    transform: rotateX(5deg) rotateY(-5deg) rotateZ(-1deg);
  }
  .document-body {
    padding: 22px 20px;
  }
  .document-body pre {
    font-size: 12px;
    line-height: 24px;
  }
  .selection-toolbar {
    top: 190px;
    left: 40px;
    transform: rotateX(5deg) rotateY(-5deg) rotateZ(-1deg) translateZ(20px);
  }
  .selection-toolbar button {
    gap: 4px;
    padding-right: 6px;
    padding-left: 6px;
  }
  .result-window {
    top: 171px;
    right: 4px;
    max-width: calc(100% - 28px);
    transform: rotateX(3deg) rotateY(-4deg) rotateZ(-1deg) translateZ(20px);
  }
  .translation-window {
    top: 190px;
  }
  .demo-footer {
    min-height: 44px;
    text-align: center;
  }
}

@media (max-width: 374px) {
  .scenario-options button {
    padding-right: 8px;
    padding-left: 8px;
    font-size: 11px;
  }
  .selection-toolbar {
    left: 16px;
  }
  .selection-toolbar button {
    padding-right: 5px;
    padding-left: 5px;
    font-size: 10px;
  }
  .selection-toolbar button svg {
    width: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scenario-options button {
    transition: none;
  }
  .result-window {
    animation: none;
  }
}
</style>
