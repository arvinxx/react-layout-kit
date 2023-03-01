import { defineConfig } from 'dumi';
import type { SiteThemeConfig } from 'dumi-theme-antd-style';

import { homepage } from './package.json';

const themeConfig: SiteThemeConfig = {
  name: 'react-layout-kit',
  github: homepage,
  apiHeader: {
    sourceUrl: `{github}/tree/master/src/{atomId}/index.tsx`,
    docUrl: `{github}/tree/master/docs/components/{atomId}.md`,
  },
  hero: {
    actions: [
      {
        text: '立即开始',
        link: '/components/flexbox',
      },
    ],
  },
  footerConfig: {
    columns: false,
    bottom: 'Made by Arvin Xu',
  },
};

export default defineConfig({
  themeConfig,
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
});
