'use client';

import { memo } from 'react';

import FlexBasic, { FlexBasicProps } from '@/FlexBasic';
import { CommonProps } from '@/type';
import { getPrefix } from '@/utils';

export type FlexboxProps = FlexBasicProps & CommonProps;

const Flexbox = memo<FlexboxProps>(({ className, prefixCls, children, ...props }) => (
  <FlexBasic {...props} internalClassName={`${getPrefix(prefixCls)}-flexbox`} className={className}>
    {children}
  </FlexBasic>
));

Flexbox.displayName = 'Flexbox';

export { Flexbox };
