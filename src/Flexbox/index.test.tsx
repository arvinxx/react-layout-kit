import { render } from '@testing-library/react';

import { Flexbox } from 'react-layout-kit';

describe('Flexbox', () => {
  it('默认', async () => {
    const { findByTestId } = render(<Flexbox data-testid={'container'} />);

    const container = await findByTestId('container');

    expect(container).toHaveStyleRule('display', 'flex');
    expect(container).toHaveStyleRule('flex-direction', 'column');
  });

  it('横向', async () => {
    const { findByTestId } = render(
      <Flexbox data-testid={'container'} horizontal>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );

    const container = await findByTestId('container');

    expect(container).toHaveStyleRule('display', 'flex');
    expect(container).toHaveStyleRule('flex-direction', 'row');
  });

  it('gap', async () => {
    const { findByTestId } = render(
      <Flexbox data-testid={'container'} gap={2}>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );

    const container = await findByTestId('container');

    expect(container).toHaveStyleRule('display', 'flex');
    expect(container).toHaveStyleRule('gap', '2px');
  });

  it('不可见', async () => {
    const { findByTestId } = render(
      <Flexbox data-testid={'container'} visible={false} gap={2}>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );

    const container = await findByTestId('container');

    expect(container).toHaveStyleRule('display', 'none');
    expect(container).toHaveStyleRule('gap', '2px');
  });

  it('横向撑开', async () => {
    const { findByTestId } = render(
      <Flexbox data-testid={'container'} horizontal distribution={'space-between'}>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );

    const container = await findByTestId('container');

    expect(container).toHaveStyleRule('display', 'flex');
    expect(container).toHaveStyleRule('flex-direction', 'row');
    expect(container).toHaveStyleRule('justify-content', 'space-between');
    expect(container).toHaveStyleRule('width', '100%');
  });

  it('其余方向', async () => {
    const { findByTestId } = render(
      <Flexbox data-testid={'container'} horizontal>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );

    const container = await findByTestId('container');

    expect(container).toHaveStyleRule('display', 'flex');
    expect(container).toHaveStyleRule('flex-direction', 'row');
  });
});
