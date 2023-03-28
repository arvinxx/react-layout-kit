import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export type ContentPosition =
  | 'center'
  | 'end'
  | 'flex-end'
  | 'flex-start'
  | 'start'
  | 'stretch'
  | 'baseline';

export type ContentDistribution =
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
  | 'stretch';

export type FlexDirection = 'vertical' | 'vertical-reverse' | 'horizontal' | 'horizontal-reverse';

export type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLDivElement>;

/**
 * @title 公共属性
 */
export interface CommonProps {
  /**
   * @title 类名前缀
   */
  prefixCls?: string;
}
