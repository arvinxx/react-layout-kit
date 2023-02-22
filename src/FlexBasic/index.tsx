import { ContentDistribution, ContentPosition, DivProps, FlexDirection } from '@/type';
import { getCssValue, getFlexDirection, isHorizontal, isSpaceDistribution } from '@/utils';
import { css, cx } from '@emotion/css';
import { createElement, ElementType, FC, useMemo } from 'react';

/**
 * 用于创建
 * @param as
 */
const createContainer = (as: ElementType) => (props: any) => createElement(as, props);

export type CommonSpaceNumber = 2 | 4 | 8 | 12 | 16 | 24;

export interface IFlexbox {
  // 语法糖 api
  /**
   * @title 是否横向
   */
  horizontal?: boolean;

  // 基础 api
  direction?: FlexDirection;
  distribution?: ContentDistribution;
  justify?: ContentDistribution;
  align?: ContentPosition;
  gap?: CommonSpaceNumber | number;
  width?: number | string;
  height?: number | string;
  padding?: string | number | CommonSpaceNumber;
  flex?: number | string;
  /**
   * 是否显示
   */
  visible?: boolean;
  as?: ElementType;
}

export interface FlexBasicProps extends IFlexbox, DivProps {}

const FlexBasic: FC<FlexBasicProps> = ({
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

  as,

  className,
  children,
  ...props
}) => {
  const justifyContent = justify || distribution;

  const finalWidth = useMemo(() => {
    if (isHorizontal(direction, horizontal) && !width && isSpaceDistribution(justifyContent))
      return '100%';

    return getCssValue(width);
  }, [direction, horizontal, justifyContent, width]);

  const Container = useMemo(() => createContainer(as || 'div'), [as]);

  return (
    <Container
      {...props}
      className={cx(
        className,
        css`
          // 是否显示
          display: ${visible === false ? 'none' : 'flex'};

          flex: ${flex};

          flex-direction: ${getFlexDirection(direction, horizontal)};
          justify-content: ${justifyContent};
          align-items: ${align};

          width: ${finalWidth};
          height: ${getCssValue(height)};

          padding: ${getCssValue(padding)};

          gap: ${getCssValue(gap)};
        `,
      )}
    >
      {children}
    </Container>
  );
};

export default FlexBasic;
