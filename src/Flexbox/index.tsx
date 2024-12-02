'use client';

import { forwardRef } from 'react';

import FlexBasic, { FlexBasicProps } from '@/FlexBasic';
import { CommonProps } from '@/type';
import { getPrefix } from '@/utils';

export type FlexboxProps = FlexBasicProps & CommonProps;

const Flexbox = forwardRef<HTMLElement, FlexboxProps>(
  ({ className, prefixCls, children, ...props }, ref) => (
    <FlexBasic
      ref={ref}
      {...props}
      internalClassName={`${getPrefix(prefixCls)}-flexbox`}
      className={className}
    >
      {children}
    </FlexBasic>
  ),
);

Flexbox.displayName = 'Flexbox';

export { Flexbox };
