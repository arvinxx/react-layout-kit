'use client';

import FlexBasic, { FlexBasicProps } from '@/FlexBasic';
import { CommonProps } from '@/type';
import { getPrefix } from '@/utils';
import { forwardRef } from 'react';

export type CenterProps = Omit<FlexBasicProps, 'distribution' | 'direction' | 'align'>;

const Center = forwardRef<HTMLElement, CenterProps & CommonProps>(
  ({ children, className, prefixCls, ...res }, ref) => (
    <FlexBasic
      ref={ref}
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
