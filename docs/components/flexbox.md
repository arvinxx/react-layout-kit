---
title: Flexbox 弹性盒组件
description: 标准的一维布局组件
atomId: Flexbox
group: 一维布局
---

# Flexbox 弹性盒组件

众所周知，Flexbox 已经成为现代浏览器中一维布局的事实标准。该组件则把 Flexbox 的能力封装为一个标准的一维布局组件，进而将布局抽象为一个标准范式。
可以用于实现页面中的各种布局需求。具体使用场景包括但不限于：

1. 实现横向或纵向的排列布局。
2. 控制主轴方向、内容分布、主轴对齐方式、交叉轴对齐方式等布局属性，实现不同的布局效果。
3. 控制元素之间的间距，实现各种间隔效果。
4. 控制元素的大小、内边距、flex 值等样式属性，实现更精细的布局效果。
5. 控制元素的显示和隐藏。
6. 可以作为容器组件，包含其他元素或组件，实现更复杂的布局需求。

## 水平布局

<code src="../demos/Flexbox.tsx"></code>

## With Ref

支持使用 ref 获取 dom 节点

<code src="../demos/withRef.tsx"></code>

## API

| 属性          | 说明             | 类型                                                                                 | 默认值       |
| ------------- | ---------------- | ------------------------------------------------------------------------------------ | ------------ |
| horizontal    | 是否横向         | boolean                                                                              | false        |
| direction     | 主轴方向         | `vertical` &#124; `vertical-reverse` &#124; `horizontal` &#124; `horizontal-reverse` | `horizontal` |
| distribution  | 内容分布         | `start` &#124; `end` &#124; `center` &#124; `between` &#124; `around`                | -            |
| justify       | 主轴对齐方式     | `start` &#124; `end` &#124; `center` &#124; `between` &#124; `around`                | -            |
| align         | 交叉轴对齐方式   | `start` &#124; `end` &#124; `center` &#124; `baseline` &#124; `stretch`              | `stretch`    |
| gap           | 主轴方向上的间距 | number &#124; string                                                                 | 0            |
| width         | 宽度             | number &#124; string                                                                 | `auto`       |
| height        | 高度             | number &#124; string                                                                 | `auto`       |
| padding       | 内边距           | number &#124; string &#124; [number, number?, number?, number?]                      | 0            |
| paddingInline | 内联内边距       | number &#124; string                                                                 | -            |
| paddingBlock  | 块内边距         | number &#124; string                                                                 | -            |
| flex          | flex 值          | number &#124; string                                                                 | `0 1 auto`   |
| visible       | 是否显示         | boolean                                                                              | true         |
| as            | 元素类型         | string &#124; React.ComponentType                                                    | `div`        |
