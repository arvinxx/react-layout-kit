import { render } from '@testing-library/react';

import { Flexbox } from 'react-layout-kit';

describe('Flexbox', () => {
  it('gap', () => {
    const { container } = render(
      <Flexbox horizontal gap={2}>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );

    expect(container).toMatchSnapshot();
  });
});
