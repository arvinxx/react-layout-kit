import { Flexbox, IFlexbox } from '@/Flexbox';
import { DivProps } from '@/type';

export type CenterProps = Omit<IFlexbox, 'distribution' | 'direction' | 'align'>;

const Center = ({ children, ...res }: CenterProps & DivProps) => (
  // @ts-ignore
  <Flexbox {...res} horizontal align={'center'} distribution={'center'}>
    {children}
  </Flexbox>
);

export default Center;
