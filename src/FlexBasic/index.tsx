// src/FlexBasic/index.tsx

'use client';

import { ContentPosition, DivProps, FlexDirection } from '@/type';
import { getCssValue, getFlexDirection, isHorizontal, isSpaceDistribution } from '@/utils';
import { CSSProperties, ElementType, forwardRef, useMemo } from 'react';
import '../styles.css'; // 引入纯 CSS 文件

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

// 生成 CSS 类名的工具函数
const generateFlexboxClasses = (
  direction: FlexDirection | undefined,
  horizontal: boolean | undefined,
  justify: CSSProperties['justifyContent'],
  align: ContentPosition | undefined,
  wrap: CSSProperties['flexWrap'],
): string => {
  const classes = ['layoutkit-flexbox'];

  // 主轴方向
  const flexDirection = getFlexDirection(direction, horizontal);
  switch (flexDirection) {
    case 'column':
      classes.push('layoutkit-flexbox--vertical');
      break;
    case 'column-reverse':
      classes.push('layoutkit-flexbox--vertical-reverse');
      break;
    case 'row':
      classes.push('layoutkit-flexbox--horizontal');
      break;
    case 'row-reverse':
      classes.push('layoutkit-flexbox--horizontal-reverse');
      break;
  }

  // 主轴对齐方式
  if (justify) {
    const justifyMap: Record<string, string> = {
      'flex-start': 'start',
      'flex-end': 'end',
      center: 'center',
      'space-between': 'between',
      'space-around': 'around',
      'space-evenly': 'evenly',
      start: 'start',
      end: 'end',
      between: 'between',
      around: 'around',
    };
    const justifyClass = justifyMap[justify];
    if (justifyClass) {
      classes.push(`layoutkit-flexbox--justify-${justifyClass}`);
    }
  }

  // 交叉轴对齐方式
  if (align) {
    const alignMap: Record<string, string> = {
      'flex-start': 'start',
      'flex-end': 'end',
      center: 'center',
      baseline: 'baseline',
      stretch: 'stretch',
      start: 'start',
      end: 'end',
    };
    const alignClass = alignMap[align];
    if (alignClass) {
      classes.push(`layoutkit-flexbox--align-${alignClass}`);
    }
  }

  // 换行
  if (wrap) {
    const wrapMap: Record<string, string> = {
      wrap: 'wrap',
      nowrap: 'nowrap',
      'wrap-reverse': 'wrap-reverse',
    };
    const wrapClass = wrapMap[wrap];
    if (wrapClass) {
      classes.push(`layoutkit-flexbox--${wrapClass}`);
    }
  }

  return classes.join(' ');
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
      ...props
    },
    ref,
  ) => {
    const justifyContent = justify || distribution;

    const cssClasses = useMemo(() => {
      return generateFlexboxClasses(direction, horizontal, justifyContent, align, wrap);
    }, [direction, horizontal, justifyContent, align, wrap]);

    const dynamicStyles = useMemo((): CSSProperties => {
      const widthValue =
        isHorizontal(direction, horizontal) && !width && isSpaceDistribution(justifyContent)
          ? '100%'
          : getCssValue(width);

      const styles: CSSProperties & Record<string, any> = {
        '--layoutkit-width': widthValue,
        '--layoutkit-height': getCssValue(height),
        '--layoutkit-padding': getCssValue(padding),
        '--layoutkit-padding-inline': getCssValue(paddingInline),
        '--layoutkit-padding-block': getCssValue(paddingBlock),
        '--layoutkit-gap': getCssValue(gap),
        '--layoutkit-flex': typeof flex === 'number' ? flex.toString() : flex,
      };

      Object.keys(styles).forEach((key) => {
        if (styles[key] === undefined || styles[key] === null) {
          delete styles[key];
        }
      });

      return styles;
    }, [
      direction,
      horizontal,
      justifyContent,
      width,
      height,
      padding,
      paddingInline,
      paddingBlock,
      gap,
      flex,
    ]);

    if (!visible) {
      return null;
    }

    const finalClassName = [internalClassName, cssClasses, className].filter(Boolean).join(' ');

    return (
      <Container
        ref={ref}
        {...props}
        className={finalClassName}
        style={{ ...dynamicStyles, ...props.style }}
      >
        {children}
      </Container>
    );
  },
);

FlexBasic.displayName = 'FlexBasic';

export default FlexBasic;
