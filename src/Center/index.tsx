'use client';

import FlexBasic, { FlexBasicProps } from '@/FlexBasic';
import { CommonProps } from '@/type';
import { getPrefix } from '@/utils';
import { forwardRef } from 'react';

export type CenterProps = Omit<
  FlexBasicProps,
  'distribution' | 'direction' | 'align' | 'justify'
> & {
  /**
   * @title 是否横向居中
   * @description 当为 true 时，使用 row 方向；默认为 column 方向
   */
  horizontal?: boolean;
};

const Center = forwardRef<HTMLElement, CenterProps & CommonProps>(
  ({ children, className, prefixCls, horizontal, ...res }, ref) => {
    // 使用专门的 center 类名，避免复杂的 prop 组合
    const centerClassName = horizontal ? 'layoutkit-center--horizontal' : 'layoutkit-center';

    return (
      <FlexBasic
        ref={ref}
        internalClassName={`${getPrefix(prefixCls)}-center ${centerClassName}`}
        className={className}
        {...res}
        // 移除这些 props，让 CSS 类来处理
        align={undefined}
        justify={undefined}
        direction={undefined}
      >
        {children}
      </FlexBasic>
    );
  },
);

Center.displayName = 'Center';

export default Center;
