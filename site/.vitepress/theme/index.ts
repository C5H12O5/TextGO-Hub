import { Underline } from '@theojs/lumen';
import type { EnhanceAppContext } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Scripts from '../components/Scripts.vue';
import Searchers from '../components/Searchers.vue';

import '@theojs/lumen/style';
import './styles.css';

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }: EnhanceAppContext) => {
    app.component('Home', Underline);
    app.component('Scripts', Scripts);
    app.component('Searchers', Searchers);
  }
};
