import type { EnhanceAppContext } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent, h } from 'vue';
import ExtensionsSkeleton from '../components/ExtensionsSkeleton.vue';
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
      defineAsyncComponent({
        loader: () => import('../components/ExtensionsPage.vue'),
        // Client-side navigation would otherwise leave the page blank until the extension data arrives.
        loadingComponent: ExtensionsSkeleton,
        delay: 0
      })
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
