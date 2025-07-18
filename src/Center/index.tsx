// src/Center/index.tsx

'use client';

import FlexBasic, { FlexBasicProps } from '@/FlexBasic';
import { CommonProps } from '@/type';
import { getPrefix } from '@/utils';
import { forwardRef } from 'react';

export type CenterProps = Omit<FlexBasicProps, 'distribution' | 'justify' | 'align'>;

const Center = forwardRef<HTMLElement, CenterProps & CommonProps>(
  ({ children, className, prefixCls, ...res }, ref) => (
    <FlexBasic
      ref={ref}
      // 添加 .layoutkit-center 以应用 JSS 和 CSS 中的居中样式
      internalClassName={`${getPrefix(prefixCls)}-center`}
      className={className}
      {...res}
      align={'center'}
      justify={'center'}
    >
      {children}
    </FlexBasic>
  ),
);

Center.displayName = 'Center';

export default Center;
