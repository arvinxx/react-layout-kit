import { render } from '@testing-library/react';

import { Flexbox } from 'react-layout-kit';

describe('Flexbox', () => {
  it('默认', () => {
    const res = render(<Flexbox data-testid={'container'} />);
    const container = res.container.firstChild;

    expect(container).toHaveStyle({ display: 'flex' });
    expect(container).toHaveStyle({ flexDirection: 'column' });
  });

  it('横向', () => {
    const res = render(
      <Flexbox horizontal>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );
    const container = res.container.firstChild;

    expect(container).toHaveStyle('display:flex');
    expect(container).toHaveStyle('flex-direction:row');
  });

  it('gap', () => {
    const res = render(
      <Flexbox data-testid={'container'} gap={2}>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );
    const container = res.container.firstChild;

    expect(container).toHaveStyle('display:flex');
    expect(container).toHaveStyle('gap:2px');
  });

  it('不可见', async () => {
    const res = render(
      <Flexbox data-testid={'container'} visible={false} gap={2}>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );

    const container = res.container.firstChild;

    expect(container).toHaveStyle('display:none');
    expect(container).toHaveStyle('gap:2px');
  });

  it('横向撑开', async () => {
    const { findByTestId } = render(
      <Flexbox data-testid={'container'} horizontal distribution={'space-between'}>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );

    const container = await findByTestId('container');

    expect(container).toHaveStyle('display:flex');
    expect(container).toHaveStyle('flex-direction:row');
    expect(container).toHaveStyle('justify-content:space-between');
    expect(container).toHaveStyle('width:100%');
  });

  it('其余方向', async () => {
    const { findByTestId } = render(
      <Flexbox data-testid={'container'} horizontal>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );

    const container = await findByTestId('container');

    expect(container).toHaveStyle('display:flex');
    expect(container).toHaveStyle('flex-direction:row');
  });
});
