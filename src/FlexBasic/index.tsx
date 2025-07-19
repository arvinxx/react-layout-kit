'use client';

import { CSSProperties, ElementType, memo, useMemo } from 'react';
import './index.css';

import { ContentPosition, DivProps, FlexDirection } from '@/type';
import { getCssValue, getFlexDirection, isHorizontal, isSpaceDistribution } from '@/utils';

// --- 类型定义 (与您原始代码一致) ---
export type CommonSpaceNumber = 2 | 4 | 8 | 12 | 16 | 24;

export interface IFlexbox {
  horizontal?: boolean;
  direction?: FlexDirection;
  distribution?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  justify?: CSSProperties['justifyContent'];
  align?: ContentPosition;
  gap?: CommonSpaceNumber | number | string;
  width?: number | string;
  height?: number | string;
  padding?: string | number | CommonSpaceNumber;
  paddingInline?: string | number;
  paddingBlock?: string | number;
  flex?: number | string;
  visible?: boolean;
  as?: ElementType;
}

export interface FlexBasicProps extends IFlexbox, Omit<DivProps, 'ref'> {
  internalClassName?: string;
}

// 静态 CSS 类名前缀
const prefix = 'rlk';

// 与原来的 Emotion 样式一一对应的纯 CSS 类名
const classes = {
  flex: `${prefix}-flex`,
  // 主轴方向
  'direction-horizontal': `${prefix}-direction-horizontal`,
  'direction-horizontal-reverse': `${prefix}-direction-horizontal-reverse`,
  'direction-vertical': `${prefix}-direction-vertical`,
  'direction-vertical-reverse': `${prefix}-direction-vertical-reverse`,
  // 主轴对齐
  'justify-start': `${prefix}-justify-start`,
  'justify-end': `${prefix}-justify-end`,
  'justify-center': `${prefix}-justify-center`,
  'justify-between': `${prefix}-justify-between`,
  'justify-around': `${prefix}-justify-around`,
  'justify-evenly': `${prefix}-justify-evenly`,
  // 交叉轴对齐
  'align-start': `${prefix}-align-start`,
  'align-end': `${prefix}-align-end`,
  'align-center': `${prefix}-align-center`,
  'align-stretch': `${prefix}-align-stretch`,
  'align-baseline': `${prefix}-align-baseline`,
  // 换行
  'wrap-wrap': `${prefix}-wrap-wrap`,
  'wrap-nowrap': `${prefix}-wrap-nowrap`,
  'wrap-reverse': `${prefix}-wrap-reverse`,
} as const;

const FlexBasic = memo<FlexBasicProps>(
  ({
    visible = true,
    flex,
    gap,
    direction,
    horizontal,
    align,
    justify,
    distribution,
    height,
    width,
    padding,
    paddingInline,
    paddingBlock,
    as: Container = 'div',
    internalClassName,
    className,
    children,
    wrap,
    style, // 提取 style prop
    ...props
  }) => {
    const justifyContent = justify || distribution;

    // 组合静态 ClassName
    const staticClassName = useMemo(() => {
      const classNames: string[] = [];
      const finalDirection = getFlexDirection(direction, horizontal);

      // 映射 direction
      if (finalDirection === 'row') classNames.push(classes['direction-horizontal']);
      if (finalDirection === 'row-reverse')
        classNames.push(classes['direction-horizontal-reverse']);
      if (finalDirection === 'column') classNames.push(classes['direction-vertical']);
      if (finalDirection === 'column-reverse')
        classNames.push(classes['direction-vertical-reverse']);

      // 映射 justify-content
      const justifyMap: Record<string, string> = {
        start: classes['justify-start'],
        end: classes['justify-end'],
        'flex-start': classes['justify-start'],
        'flex-end': classes['justify-end'],
        center: classes['justify-center'],
        between: classes['justify-between'],
        around: classes['justify-around'],
        evenly: classes['justify-evenly'],
        'space-between': classes['justify-between'],
        'space-around': classes['justify-around'],
        'space-evenly': classes['justify-evenly'],
      };
      if (justifyContent && justifyMap[justifyContent]) {
        classNames.push(justifyMap[justifyContent]);
      }

      // 映射 align-items
      const alignMap: Record<string, string> = {
        start: classes['align-start'],
        end: classes['align-end'],
        'flex-start': classes['align-start'],
        'flex-end': classes['align-end'],
        center: classes['align-center'],
        stretch: classes['align-stretch'],
        baseline: classes['align-baseline'],
      };
      if (align && alignMap[align]) {
        classNames.push(alignMap[align]);
      }

      // 映射 wrap
      const wrapMap: Record<string, string> = {
        wrap: classes['wrap-wrap'],
        nowrap: classes['wrap-nowrap'],
        'wrap-reverse': classes['wrap-reverse'],
      };
      if (wrap && wrapMap[wrap]) {
        classNames.push(wrapMap[wrap]);
      }

      return classNames.join(' ');
    }, [direction, horizontal, justifyContent, align, wrap]);

    // 计算动态的 inline-style
    const dynamicStyle = useMemo((): CSSProperties => {
      // 原始逻辑：当 space-distribution 且 horizontal 时，宽度为 100%
      const finalWidth =
        isHorizontal(direction, horizontal) && !width && isSpaceDistribution(justifyContent)
          ? '100%'
          : getCssValue(width);

      return {
        flex: flex,
        gap: getCssValue(gap),
        width: finalWidth,
        height: getCssValue(height),
        padding: getCssValue(padding),
        paddingInline: getCssValue(paddingInline),
        paddingBlock: getCssValue(paddingBlock),
        ...style, // 合并外部传入的 style
      };
    }, [
      flex,
      gap,
      direction,
      horizontal,
      width,
      height,
      padding,
      paddingInline,
      paddingBlock,
      justifyContent,
      style,
    ]);

    if (!visible) {
      return null;
    }

    return (
      <Container
        {...props}
        className={[internalClassName, staticClassName, classes.flex, className]
          .filter(Boolean)
          .join(' ')}
        style={dynamicStyle}
      >
        {children}
      </Container>
    );
  },
);

FlexBasic.displayName = 'FlexBasic';

export default FlexBasic;
