import type { EnhanceAppContext } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent, h } from 'vue';
import { useLanguagePreference } from './language';

import '@theojs/lumen/style';
import './styles.css';

export default {
  extends: DefaultTheme,
  Layout: {
    setup() {
      useLanguagePreference();
      return () => h(DefaultTheme.Layout);
    }
  },
  enhanceApp: ({ app }: EnhanceAppContext) => {
    app.component(
      'Home',
      defineAsyncComponent(() => import('../components/Home.vue'))
    );
    app.component(
      'ExtensionsPage',
      defineAsyncComponent(() => import('../components/ExtensionsPage.vue'))
    );
    app.component(
      'Scripts',
      defineAsyncComponent(() => import('../components/Scripts.vue'))
    );
    app.component(
      'Searchers',
      defineAsyncComponent(() => import('../components/Searchers.vue'))
    );
  }
};
