import { FC } from 'react';

import FlexBasic, { FlexBasicProps } from '@/FlexBasic';
import { cx } from '@/styles';
import { CommonProps } from '@/type';
import { getPrefix } from '@/utils';

export type FlexboxProps = FlexBasicProps & CommonProps;

export const Flexbox: FC<FlexboxProps> = ({ className, prefixCls, children, ...props }) => {
  return (
    <FlexBasic {...props} className={cx(`${getPrefix(prefixCls)}-flexbox`, className)}>
      {children}
    </FlexBasic>
  );
};
