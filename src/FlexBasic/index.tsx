import styled from '@emotion/styled';

import { ContentDistribution, ContentPosition, DivProps, FlexDirection } from '@/type';
import { getCssValue, getFlexDirection, isHorizontal, isSpaceDistribution } from '@/utils';
import { FC } from 'react';

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
}

export interface FlexBasicProps extends IFlexbox, DivProps {}

const FlexBasic: FC<FlexBasicProps> = styled.div<IFlexbox>`
  // 是否显示
  display: ${(props) => (props.visible === false ? 'none' : 'flex')};

  flex: ${(props) => props.flex};

  flex-direction: ${(props) => getFlexDirection(props.direction, props.horizontal)};
  justify-content: ${(props) => props.justify || props.distribution};
  align-items: ${(props) => props.align};

  width: ${(props) => {
    if (
      isHorizontal(props.direction, props.horizontal) &&
      !props.width &&
      isSpaceDistribution(props.distribution)
    )
      return '100%';

    return getCssValue(props.width);
  }};
  height: ${(props) => getCssValue(props.height)};

  padding: ${(props) => getCssValue(props.padding)};

  gap: ${(props) => getCssValue(props.gap)};
`;

export default FlexBasic;
