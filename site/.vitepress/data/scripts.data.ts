import fs from 'fs';
import { defineLoader } from 'vitepress';
import type { Extension } from '../types';

export interface Script extends Extension {
  lang: string;
  script: string;
}

declare const data: Script[];
export { data };

export default defineLoader({
  watch: ['../../../extensions/scripts/*.json'],
  async load(files): Promise<Script[]> {
    return files.map((file) => {
      const content = fs.readFileSync(file, 'utf-8');
      return {
        path: file,
        ...JSON.parse(content)
      };
    });
  }
});
