'use client';

import { css, cx } from '@emotion/css';
import { CSSProperties, ElementType, forwardRef, useMemo } from 'react';

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

// --- 高性能的静态样式定义 ---
// 使用 Emotion 在模块加载时创建一次性的、可复用的原子化 CSS 类
const styles = {
  // 基础样式
  flex: css`
    display: flex;
    box-sizing: border-box;
    position: relative; /* 添加 position relative, 增强作为容器的通用性 */

    flex-direction: column;
  `,
  // 主轴方向
  'direction-horizontal': css`
    flex-direction: row;
  `,
  'direction-horizontal-reverse': css`
    flex-direction: row-reverse;
  `,
  'direction-vertical': css`
    flex-direction: column;
  `,
  'direction-vertical-reverse': css`
    flex-direction: column-reverse;
  `,
  // 主轴对齐
  'justify-start': css`
    justify-content: flex-start;
  `,
  'justify-end': css`
    justify-content: flex-end;
  `,
  'justify-center': css`
    justify-content: center;
  `,
  'justify-between': css`
    justify-content: space-between;
  `,
  'justify-around': css`
    justify-content: space-around;
  `,
  'justify-evenly': css`
    justify-content: space-evenly;
  `,
  // 交叉轴对齐
  'align-start': css`
    align-items: flex-start;
  `,
  'align-end': css`
    align-items: flex-end;
  `,
  'align-center': css`
    align-items: center;
  `,
  'align-stretch': css`
    align-items: stretch;
  `,
  'align-baseline': css`
    align-items: baseline;
  `,
  // 换行
  'wrap-wrap': css`
    flex-wrap: wrap;
  `,
  'wrap-nowrap': css`
    flex-wrap: nowrap;
  `,
  'wrap-reverse': css`
    flex-wrap: wrap-reverse;
  `,
};

const FlexBasic = forwardRef<any, FlexBasicProps>(
  (
    {
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
    },
    ref,
  ) => {
    const justifyContent = justify || distribution;

    // 组合静态 ClassName
    const staticClassName = useMemo(() => {
      const classNames = [];
      const finalDirection = getFlexDirection(direction, horizontal);

      // 映射 direction
      if (finalDirection === 'row') classNames.push(styles['direction-horizontal']);
      if (finalDirection === 'row-reverse') classNames.push(styles['direction-horizontal-reverse']);
      if (finalDirection === 'column') classNames.push(styles['direction-vertical']);
      if (finalDirection === 'column-reverse')
        classNames.push(styles['direction-vertical-reverse']);

      // 映射 justify-content
      const justifyMap: Record<string, string> = {
        start: styles['justify-start'],
        end: styles['justify-end'],
        'flex-start': styles['justify-start'],
        'flex-end': styles['justify-end'],
        center: styles['justify-center'],
        between: styles['justify-between'],
        around: styles['justify-around'],
        evenly: styles['justify-evenly'],
        'space-between': styles['justify-between'],
        'space-around': styles['justify-around'],
        'space-evenly': styles['justify-evenly'],
      };
      if (justifyContent && justifyMap[justifyContent]) {
        classNames.push(justifyMap[justifyContent]);
      }

      // 映射 align-items
      const alignMap: Record<string, string> = {
        start: styles['align-start'],
        end: styles['align-end'],
        'flex-start': styles['align-start'],
        'flex-end': styles['align-end'],
        center: styles['align-center'],
        stretch: styles['align-stretch'],
        baseline: styles['align-baseline'],
      };
      if (align && alignMap[align]) {
        classNames.push(alignMap[align]);
      }

      // 映射 wrap
      const wrapMap: Record<string, string> = {
        wrap: styles['wrap-wrap'],
        nowrap: styles['wrap-nowrap'],
        'wrap-reverse': styles['wrap-reverse'],
      };
      if (wrap && wrapMap[wrap]) {
        classNames.push(wrapMap[wrap]);
      }

      return cx(classNames);
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
        ref={ref}
        {...props}
        className={cx(styles.flex, staticClassName, internalClassName, className)}
        style={dynamicStyle}
      >
        {children}
      </Container>
    );
  },
);

FlexBasic.displayName = 'FlexBasic';

export default FlexBasic;
