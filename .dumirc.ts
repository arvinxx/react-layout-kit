import { defineConfig } from 'dumi';

import { homepage } from './package.json';

export default defineConfig({
  themeConfig: {
    name: 'react-layout-kit',
    github: homepage,
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
});
