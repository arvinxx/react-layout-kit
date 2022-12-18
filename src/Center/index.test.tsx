import { render } from '@testing-library/react';

import { Center } from 'react-layout-kit';

describe('Center', () => {
  it('默认', async () => {
    const { findByTestId } = render(<Center data-testid={'container'}>123</Center>);

    const container = await findByTestId('container');

    expect(container).toHaveStyleRule('display', 'flex');
    expect(container).toHaveStyleRule('flex-direction', 'row');
  });
});
