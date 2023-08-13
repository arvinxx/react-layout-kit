import { useHover } from 'ahooks';
import { FC, PropsWithChildren, useRef } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

const Block: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Center
      style={{ width: 40, height: 40, borderRadius: 8, background: 'cadetblue', color: 'white' }}
    >
      {children}
    </Center>
  );
};

export default () => {
  const ref = useRef();
  const isHover = useHover(ref);
  return (
    <Flexbox ref={ref} horizontal gap={40}>
      <Block>1</Block>
      <Block>2</Block>
      {isHover && <Block>show</Block>}
    </Flexbox>
  );
};
