import fs from 'fs';
import { defineLoader } from 'vitepress';
import type { Extension } from '../types';

export interface Searcher extends Extension {
  browser?: string;
  url: string;
}

declare const data: Searcher[];
export { data };

export default defineLoader({
  watch: ['../../../extensions/searchers/*.json'],
  async load(files): Promise<Searcher[]> {
    return files.map((file) => {
      const contents = fs.readFileSync(file, 'utf-8');
      return {
        path: file,
        ...JSON.parse(contents)
      };
    });
  }
});
