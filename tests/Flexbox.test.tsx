import { render } from '@testing-library/react';
import { Flexbox } from 'react-layout-kit';

describe('Flexbox', () => {
  it('默认', () => {
    const res = render(<Flexbox data-testid={'container'} />);
    const container = res.container.firstChild;

    expect(container).toHaveStyle({ display: 'flex' });
    expect(container).toHaveStyle({ flexDirection: 'column' });
    expect(res.container).toMatchSnapshot();
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
    expect(res.container).toMatchSnapshot();
  });

  it('gap', () => {
    const res = render(
      <Flexbox data-testid={'container'} gap={2}>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );
    const container = res.container.firstChild as HTMLElement;

    expect(container).toHaveStyle('display:flex');
    expect(container.style.getPropertyValue('--rlk-gap')).toBe('2px');
    expect(res.container).toMatchSnapshot();
  });

  it('不可见', async () => {
    const res = render(
      <Flexbox data-testid={'container'} visible={false} gap={2}>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );

    const container = res.container.firstChild as HTMLElement;

    expect(container).toHaveStyle('display:none');
    expect(container.style.getPropertyValue('--rlk-gap')).toBe('2px');
    expect(res.container).toMatchSnapshot();
  });

  it('横向撑开', async () => {
    const { findByTestId, container: res } = render(
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
    expect(res).toMatchSnapshot();
  });

  it('其余方向', async () => {
    const { findByTestId, container: res } = render(
      <Flexbox data-testid={'container'} horizontal>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );

    const container = await findByTestId('container');

    expect(container).toHaveStyle('display:flex');
    expect(container).toHaveStyle('flex-direction:row');
    expect(res).toMatchSnapshot();
  });

  it('支持 as 属性', () => {
    const res = render(<Flexbox as={'h3'}>h3</Flexbox>);
    const container = res.container.firstChild;

    expect(container).toMatchSnapshot();
  });

  it('外部挂载 className', () => {
    const { container } = render(<Flexbox className={'outer'} />);

    expect(container).toMatchSnapshot();
  });

  it('paddingInline', () => {
    const res = render(
      <Flexbox horizontal paddingInline={24}>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );
    const container = res.container.firstChild;

    expect((container as HTMLElement).style.getPropertyValue('--rlk-padding-inline')).toBe('24px');
    expect(res.container).toMatchSnapshot();
  });

  it('paddingBlock', () => {
    const res = render(
      <Flexbox horizontal paddingBlock={24}>
        <div>1</div>
        <div>2</div>
      </Flexbox>,
    );
    const container = res.container.firstChild;

    expect((container as HTMLElement).style.getPropertyValue('--rlk-padding-block')).toBe('24px');
    expect(res.container).toMatchSnapshot();
  });
});
