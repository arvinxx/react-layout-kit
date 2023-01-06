import { render } from '@testing-library/react';

import { Center } from 'react-layout-kit';

describe('Center', () => {
  it('默认', async () => {
    const { findByTestId } = render(<Center data-testid={'container'}>123</Center>);

    const container = await findByTestId('container');

    expect(container).toHaveStyle('display:flex');
    expect(container).toHaveStyle('flex-direction:row');
    expect(container).toHaveStyle('align-items:center');
    expect(container).toHaveStyle('justify-content:center');
  });
});
