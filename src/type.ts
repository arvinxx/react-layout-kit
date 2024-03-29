import type { HTMLAttributes } from 'react';
import { DOMAttributes } from 'react';

export type ContentPosition =
  | 'center'
  | 'end'
  | 'flex-end'
  | 'flex-start'
  | 'start'
  | 'stretch'
  | 'baseline';

export type FlexDirection = 'vertical' | 'vertical-reverse' | 'horizontal' | 'horizontal-reverse';

export type DivProps = DOMAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>;

/**
 * @title 公共属性
 */
export interface CommonProps {
  /**
   * @title 类名前缀
   */
  prefixCls?: string;
}
