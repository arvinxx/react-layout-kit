// src/Center/index.tsx

'use client';

import FlexBasic, { FlexBasicProps } from '@/FlexBasic';
import { CommonProps } from '@/type';
import { getPrefix } from '@/utils';
import { memo } from 'react';

export type CenterProps = Omit<FlexBasicProps, 'distribution' | 'justify' | 'align'>;

const Center = memo<CenterProps & CommonProps>(({ children, className, prefixCls, ...res }) => (
  <FlexBasic
    internalClassName={`${getPrefix(prefixCls)}-center`}
    className={className}
    {...res}
    align={'center'}
    justify={'center'}
  >
    {children}
  </FlexBasic>
));

Center.displayName = 'Center';

export default Center;
