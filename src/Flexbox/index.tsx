import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

import {
  getCssValue,
  getFlexDirection,
  isHorizontal,
  isSpaceDistribution,
  isVertical,
} from '@/utils';

import type { ContentDistribution, ContentPosition, FlexDirection } from './type';

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
   * 是否隐藏内容
   */
  hidden?: boolean;
}

export type FlexboxProps = IFlexbox &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Flexbox: FC<FlexboxProps> = styled.div.attrs(() => ({
  className: 'layoutkit-flexbox',
}))<IFlexbox>`
  // 是否显示
  display: ${(props) => (props.hidden ? 'none' : 'flex')};

  flex: ${(props) => props.flex};

  flex-direction: ${(props) => {
    return getFlexDirection(props.direction, props.horizontal);
  }};
  justify-content: ${(props) => props.distribution};
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

  > *:not(:last-child) {
    margin-right: ${(props) =>
      isHorizontal(props.direction, props.horizontal) && getCssValue(props.gap)};
    margin-bottom: ${(props) =>
      isVertical(props.direction, props.horizontal) && getCssValue(props.gap)};
  }
`;
