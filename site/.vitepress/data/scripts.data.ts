import fs from 'fs';
import { defineLoader } from 'vitepress';

export interface Script {
  type: string;
  icon: string;
  lang: string;
  script: string;
  locales: {
    [key: string]: {
      name: string;
      description: string;
    };
  };
  platforms: string[];
}

declare const data: Script[];
export { data };

export default defineLoader({
  watch: ['../../../extensions/scripts/*.json'],
  async load(files): Promise<Script[]> {
    return files.map((file) => {
      const content = fs.readFileSync(file, 'utf-8');
      return JSON.parse(content);
    });
  }
});
