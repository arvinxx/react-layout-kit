import { ContentPosition, DivProps, FlexDirection } from '@/type';
import { getCssValue, getFlexDirection, isHorizontal, isSpaceDistribution } from '@/utils';
import { css, cx } from '@emotion/css';
import { CSSProperties, ElementType, forwardRef, useMemo } from 'react';

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

    const finalWidth = useMemo(() => {
      if (isHorizontal(direction, horizontal) && !width && isSpaceDistribution(justifyContent))
        return '100%';

      return getCssValue(width);
    }, [direction, horizontal, justifyContent, width]);

    return (
      <Container
        ref={ref}
        {...props}
        className={cx(
          internalClassName,
          css`
            // 是否显示
            display: ${visible === false ? 'none' : 'flex'};

            flex: ${flex};

            flex-direction: ${getFlexDirection(direction, horizontal)};
            flex-wrap: ${wrap};

            justify-content: ${justifyContent};
            align-items: ${align};

            width: ${finalWidth};
            height: ${getCssValue(height)};

            padding: ${getCssValue(padding)};

            padding-inline: ${getCssValue(paddingInline)};
            padding-block: ${getCssValue(paddingBlock)};

            gap: ${getCssValue(gap)};
          `,
          className,
        )}
      >
        {children}
      </Container>
    );
  },
);

FlexBasic.displayName = 'FlexBasic';

export default FlexBasic;
