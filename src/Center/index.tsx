import FlexBasic, { FlexBasicProps } from '@/FlexBasic';
import { CommonProps } from '@/type';
import { getPrefix } from '@/utils';
import { cx } from '@emotion/css';

export type CenterProps = Omit<FlexBasicProps, 'distribution' | 'direction' | 'align'>;

const Center = ({ children, className, prefixCls, ...res }: CenterProps & CommonProps) => (
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
