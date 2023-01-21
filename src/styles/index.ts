import createEmotion from '@emotion/css/create-instance';

export const {
  css,
  cx,
  injectGlobal,
  keyframes,
  sheet,
  flush,
  merge,
  hydrate,
  getRegisteredStyles,
  cache,
} = createEmotion({ key: 'lk', speedy: false });
