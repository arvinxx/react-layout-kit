import { defineConfig } from 'dumi';

import { homepage } from './package.json';

export default defineConfig({
  themeConfig: {
    name: 'react-layout-kit',
    github: homepage,
    apiHeader: {
      sourceUrl: `{github}/tree/master/src/{atomId}/index.tsx`,
      docUrl: `{github}/tree/master/docs/components/{atomId}.md`,
    },
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
});
