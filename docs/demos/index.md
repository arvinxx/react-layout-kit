---
title: Flexbox
group: 一维布局
---

# Flexbox 弹性盒组件

众所周知，Flexbox 已经成为现代浏览器中一维布局的事实标准。

## 快速使用

```tsx | pure
import { Center, Flexbox } from 'react-layout-kit';

export default () => {
  return (
    <Flexbox horizontal gap={40}>
      <Center>1</Center>
      <Center>2</Center>
    </Flexbox>
  );
};
```

```tsx
import { Center, Flexbox } from 'react-layout-kit';

const Block = ({ children }) => {
  return (
    <Center
      style={{ width: 40, height: 40, borderRadius: 8, background: 'cadetblue', color: 'white' }}
    >
      {children}
    </Center>
  );
};

export default () => {
  return (
    <Flexbox horizontal gap={40}>
      <Block>1</Block>
      <Block>2</Block>
    </Flexbox>
  );
};
```
