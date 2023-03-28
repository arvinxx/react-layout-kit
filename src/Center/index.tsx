import FlexBasic, { FlexBasicProps } from '@/FlexBasic';
import { CommonProps } from '@/type';
import { getPrefix } from '@/utils';

export type CenterProps = Omit<FlexBasicProps, 'distribution' | 'direction' | 'align'>;

const Center = ({ children, className, prefixCls, ...res }: CenterProps & CommonProps) => (
  <FlexBasic
    internalClassName={`${getPrefix(prefixCls)}-center`}
    className={className}
    {...res}
    align={'center'}
    justify={'center'}
  >
    {children}
  </FlexBasic>
);

export default Center;
