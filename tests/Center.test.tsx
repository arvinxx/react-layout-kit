import { render } from '@testing-library/react';

import { Center } from 'react-layout-kit';

describe('Center', () => {
  it('默认', async () => {
    const { container } = render(<Center data-testid={'container'}>123</Center>);

    const node = container.firstChild;

    expect(node).toHaveStyle('display:flex');
    expect(node).toHaveStyle('align-items:center');
    expect(node).toHaveStyle('justify-content:center');
    expect(container).toMatchSnapshot();
  });
});
