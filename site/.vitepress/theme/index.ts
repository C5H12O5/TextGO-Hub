import type { EnhanceAppContext } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import ExtensionsPage from '../components/ExtensionsPage.vue';
import Home from '../components/Home.vue';
import Scripts from '../components/Scripts.vue';
import Searchers from '../components/Searchers.vue';
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
    app.component('Home', Home);
    app.component('ExtensionsPage', ExtensionsPage);
    app.component('Scripts', Scripts);
    app.component('Searchers', Searchers);
  }
};
