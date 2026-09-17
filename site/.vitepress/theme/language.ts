import { useData, useRouter, withBase } from 'vitepress';
import { onMounted, onUnmounted, watch } from 'vue';

/** Supported site languages. */
type Language = 'en' | 'zh-CN';

// storage key for the manual language preference
const storageKey = 'textgo-language';

// language menu links for desktop, narrow desktop and mobile layouts
const languageLinks = [
  '.VPNavBarTranslations a[lang]',
  '.VPNavBarExtra .translations a[lang]',
  '.VPNavScreenTranslations a[lang]'
].join(', ');

/**
 * Read the saved language preference from browser storage.
 *
 * @returns supported language, or undefined if missing, invalid or unavailable
 */
function readPreference(): Language | undefined {
  try {
    const language = localStorage.getItem(storageKey);
    return language === 'en' || language === 'zh-CN' ? language : undefined;
  } catch {
    // fall back to browser language detection when storage is unavailable
    return undefined;
  }
}

/**
 * Detect the homepage language and remember manual language selections.
 */
export function useLanguagePreference() {
  const router = useRouter();
  const { page } = useData();
  let preference: Language | undefined;
  let stopWatching: (() => void) | undefined;

  /**
   * Save the language selected from a navigation menu.
   *
   * @param event - language menu click event
   */
  function rememberLanguage(event: MouseEvent) {
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest<HTMLAnchorElement>(languageLinks);
    const language = link?.lang;
    if (language !== 'en' && language !== 'zh-CN') return;

    preference = language;
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // keep the manual choice in memory when it cannot be persisted
    }
  }

  /**
   * Apply the preferred language to the current homepage.
   */
  function selectHomeLanguage() {
    // preserve the explicit language of non-homepage links
    if (page.value.relativePath !== 'index.md' && page.value.relativePath !== 'zh-CN/index.md') return;

    // use the manual preference first, otherwise detect Chinese and default to English
    const language =
      preference ?? (/^zh(?:-|$)/i.test(navigator.language || navigator.languages?.[0] || '') ? 'zh-CN' : 'en');
    const home = withBase(language === 'zh-CN' ? '/zh-CN/' : '/');
    if (window.location.pathname !== home) {
      // preserve query parameters and anchors without adding a history entry
      void router.go(home + window.location.search + window.location.hash, { replace: true });
    }
  }

  onMounted(() => {
    preference = readPreference();
    // remember menu selections before the homepage watcher handles navigation
    document.addEventListener('click', rememberLanguage, true);
    // apply the preference on first load and subsequent homepage visits
    stopWatching = watch(() => page.value.relativePath, selectHomeLanguage, { immediate: true });
  });

  onUnmounted(() => {
    // remove the language menu listener and homepage watcher
    document.removeEventListener('click', rememberLanguage, true);
    stopWatching?.();
  });
}
