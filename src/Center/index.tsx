import type { FlexboxProps } from '@/Flexbox';
import { Flexbox } from '@/Flexbox';
import type { FC } from 'react';

export type CenterProps = Omit<FlexboxProps, 'distribution' | 'direction' | 'align'>;

const Center: FC<CenterProps> = ({ children, ...res }) => {
  return (
    <Flexbox {...res} horizontal align={'center'} distribution={'center'}>
      {children}
    </Flexbox>
  );
};

export default Center;
