import { ContentPosition, DivProps, FlexDirection } from '@/type';
import { getCssValue, getFlexDirection, isHorizontal, isSpaceDistribution } from '@/utils';
import { CSSProperties, ElementType, forwardRef, useMemo } from 'react';
import '../styles.css';

export type CommonSpaceNumber = 2 | 4 | 8 | 12 | 16 | 24;

/**
 * 表示一个 Flexbox 布局组件的接口
 */
export interface IFlexbox {
  // 语法糖 api
  /**
   * @title 是否横向
   * @default false
   */
  horizontal?: boolean;

  // 基础 api
  /**
   * @title 主轴方向
   * @enum ["vertical", "vertical-reverse", "horizontal", "horizontal-reverse"]
   * @enumNames ["垂直从上到下", "垂直从下到上","水平从左到右", "水平从右到左"]
   * @default "horizontal"
   */
  direction?: FlexDirection;
  /**
   * @title 内容分布
   * @enum ["start", "end", "center", "between", "around"]
   * @enumNames ["靠起始位置", "靠结束位置", "居中", "两端对齐", "环绕"]
   */
  distribution?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  /**
   * @title 主轴对齐方式
   * @enum ["start", "end", "center", "between", "around"]
   * @enumNames ["靠起始位置", "靠结束位置", "居中", "两端对齐", "环绕"]
   */
  justify?: CSSProperties['justifyContent'];
  /**
   * @title 交叉轴对齐方式
   * @enum ["start", "end", "center", "baseline", "stretch"]
   * @enumNames ["靠起始位置", "靠结束位置", "居中", "基线对齐", "拉伸"]
   * @default "stretch"
   */
  align?: ContentPosition;
  /**
   * @title 主轴方向上的间距
   * @default 0
   */
  gap?: CommonSpaceNumber | number | string;
  /**
   * @title 宽度
   * @default "auto"
   */
  width?: number | string;
  /**
   * @title 高度
   * @default "auto"
   */
  height?: number | string;
  /**
   * @title 内边距
   * @default 0
   */
  padding?: string | number | CommonSpaceNumber;
  /**
   * @title 内联内边距
   */
  paddingInline?: string | number;
  /**
   * @title 块内边距
   */
  paddingBlock?: string | number;
  /**
   * @title flex 值
   * @default "0 1 auto"
   */
  flex?: number | string;
  /**
   * @title 是否显示
   * @default true
   */
  visible?: boolean;
  /**
   * @title 元素类型
   * @default "div"
   */
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
  visible: boolean | undefined,
  isSpaceDistribution?: boolean,
): string => {
  const classes = ['layoutkit-flexbox'];

  // 隐藏状态
  if (visible === false) {
    classes.push('layoutkit-flexbox--hidden');
  }

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

  // 空间分布时的宽度处理
  if (isSpaceDistribution) {
    classes.push('layoutkit-flexbox--space-distribution');
  }

  return classes.join(' ');
};

const FlexBasic = forwardRef<any, FlexBasicProps>(
  (
    {
      visible,
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

    // 生成 CSS 类名（优化：减少依赖项）
    const cssClasses = useMemo(() => {
      const spaceDistribution = isSpaceDistribution(justifyContent);
      const shouldSetFullWidth = isHorizontal(direction, horizontal) && !width && spaceDistribution;

      return generateFlexboxClasses(
        direction,
        horizontal,
        justifyContent,
        align,
        wrap,
        visible,
        shouldSetFullWidth,
      );
    }, [direction, horizontal, justifyContent, align, wrap, visible, width]);

    // 生成 CSS 变量和内联样式
    const dynamicStyles = useMemo((): CSSProperties & Record<string, string> => {
      const styles: CSSProperties & Record<string, string> = {};

      // 处理需要特殊逻辑的宽度
      if (isHorizontal(direction, horizontal) && !width && isSpaceDistribution(justifyContent)) {
        styles.width = '100%';
      } else if (width) {
        // @ts-ignore
        styles['--layout-width'] = getCssValue(width);
      }

      // 其他动态样式
      if (height) {
        // @ts-ignore
        styles['--layout-height'] = getCssValue(height);
      }
      if (padding) {
        // @ts-ignore
        styles['--layout-padding'] = getCssValue(padding);
      }
      if (paddingInline) {
        // @ts-ignore
        styles['--layout-padding-inline'] = getCssValue(paddingInline);
      }
      if (paddingBlock) {
        // @ts-ignore
        styles['--layout-padding-block'] = getCssValue(paddingBlock);
      }
      if (gap) {
        // @ts-ignore
        styles['--layout-gap'] = getCssValue(gap);
      }
      if (flex) {
        styles['--layout-flex'] = typeof flex === 'number' ? flex.toString() : flex;
      }

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
