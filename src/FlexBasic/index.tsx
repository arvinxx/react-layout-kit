import { ContentPosition, DivProps, FlexDirection } from '@/type';
import { getCssValue, getFlexDirection, isHorizontal, isSpaceDistribution } from '@/utils';
import { CSSProperties, ElementType, memo, Ref, useMemo } from 'react';
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

export interface FlexBasicProps extends IFlexbox, DivProps {
  internalClassName?: string;
  ref?: Ref<any>;
}

const FlexBasic = memo<FlexBasicProps>(
  ({
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
    ref,
    ...props
  }) => {
    const justifyContent = justify || distribution;

    const { classNames, styles } = useMemo(() => {
      const classList = ['rlk-flex'];
      const cssVars: Record<string, string> = {};
      const directStyles: CSSProperties = {};

      // Handle visibility
      if (visible === false) {
        classList.push('rlk-hidden');
      }

      // Handle flex direction
      const flexDirection = getFlexDirection(direction, horizontal);
      switch (flexDirection) {
        case 'row':
          classList.push('rlk-flex-row');
          break;
        case 'row-reverse':
          classList.push('rlk-flex-row-reverse');
          break;
        case 'column':
          classList.push('rlk-flex-col');
          break;
        case 'column-reverse':
          classList.push('rlk-flex-col-reverse');
          break;
      }

      // Handle justify content
      if (justifyContent) {
        switch (justifyContent) {
          case 'flex-start':
          case 'start':
            classList.push('rlk-justify-start');
            break;
          case 'flex-end':
          case 'end':
            classList.push('rlk-justify-end');
            break;
          case 'center':
            classList.push('rlk-justify-center');
            break;
          case 'space-between':
            classList.push('rlk-justify-between');
            break;
          case 'space-around':
            classList.push('rlk-justify-around');
            break;
          case 'space-evenly':
            classList.push('rlk-justify-evenly');
            break;
        }
      }

      // Handle align items
      if (align) {
        switch (align) {
          case 'flex-start':
          case 'start':
            classList.push('rlk-items-start');
            break;
          case 'flex-end':
          case 'end':
            classList.push('rlk-items-end');
            break;
          case 'center':
            classList.push('rlk-items-center');
            break;
          case 'baseline':
            classList.push('rlk-items-baseline');
            break;
          case 'stretch':
            classList.push('rlk-items-stretch');
            break;
        }
      }

      // Handle flex wrap
      if (wrap) {
        switch (wrap) {
          case 'nowrap':
            classList.push('rlk-flex-nowrap');
            break;
          case 'wrap':
            classList.push('rlk-flex-wrap');
            break;
          case 'wrap-reverse':
            classList.push('rlk-flex-wrap-reverse');
            break;
        }
      }

      // Handle width directly as style
      const calcWidth = () => {
        if (isHorizontal(direction, horizontal) && !width && isSpaceDistribution(justifyContent))
          return '100%';
        return getCssValue(width);
      };
      const widthValue = calcWidth();
      if (widthValue) {
        directStyles.width = widthValue;
      }

      // Handle height directly as style
      if (height !== undefined) {
        const heightValue = getCssValue(height);
        if (heightValue) {
          directStyles.height = heightValue;
        }
      }

      // Handle flex directly as style
      if (flex !== undefined) {
        directStyles.flex = String(flex);
      }

      // Handle gap as CSS variable
      if (gap !== undefined) {
        const gapValue = getCssValue(gap);
        if (gapValue) cssVars['--rlk-gap'] = gapValue;
      }

      // Handle padding as CSS variables
      if (padding !== undefined) {
        const paddingValue = getCssValue(padding);
        if (paddingValue) cssVars['--rlk-padding'] = paddingValue;
      }

      if (paddingInline !== undefined) {
        const paddingInlineValue = getCssValue(paddingInline);
        if (paddingInlineValue) cssVars['--rlk-padding-inline'] = paddingInlineValue;
      }

      if (paddingBlock !== undefined) {
        const paddingBlockValue = getCssValue(paddingBlock);
        if (paddingBlockValue) cssVars['--rlk-padding-block'] = paddingBlockValue;
      }

      // Combine class names
      const combinedClassNames = [internalClassName, ...classList, className]
        .filter(Boolean)
        .join(' ');

      return {
        classNames: combinedClassNames,
        styles: { ...cssVars, ...directStyles } as CSSProperties,
      };
    }, [
      visible,
      flex,
      direction,
      horizontal,
      width,
      wrap,
      justifyContent,
      align,
      height,
      padding,
      paddingInline,
      paddingBlock,
      gap,
      internalClassName,
      className,
    ]);

    return (
      <Container ref={ref} {...props} className={classNames} style={{ ...styles, ...props.style }}>
        {children}
      </Container>
    );
  },
);

FlexBasic.displayName = 'FlexBasic';

export default FlexBasic;
