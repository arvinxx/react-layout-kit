import FlexBasic, { IFlexbox } from '@/FlexBasic';
import { CommonProps, DivProps } from '@/type';
import { getPrefix } from '@/utils';
import { cx } from '@emotion/css';

export type CenterProps = Omit<IFlexbox, 'distribution' | 'direction' | 'align'>;

const Center = ({
  children,
  className,
  prefixCls,
  ...res
}: CenterProps & DivProps & CommonProps) => (
  <FlexBasic
    className={cx(`${getPrefix(prefixCls)}-center`, className)}
    {...res}
    horizontal
    align={'center'}
    distribution={'center'}
  >
    {children}
  </FlexBasic>
);

export default Center;
