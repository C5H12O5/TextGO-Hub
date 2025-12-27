import { Underline } from "@theojs/lumen";
import type { EnhanceAppContext } from "vitepress";
import DefaultTheme from "vitepress/theme";

import "@theojs/lumen/style";
import "./styles.css";

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }: EnhanceAppContext) => {
    app.component("Home", Underline);
  },
};
