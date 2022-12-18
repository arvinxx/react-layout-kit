import { FC, PropsWithChildren } from 'react';
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
  return (
    <Flexbox horizontal gap={40}>
      <Block>1</Block>
      <Block>2</Block>
    </Flexbox>
  );
};
