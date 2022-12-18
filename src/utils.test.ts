import { getFlexDirection } from './utils';

describe('getFlexDirection', () => {
  it('horizontal', () => {
    const dir = getFlexDirection('horizontal');
    expect(dir).toEqual('row');
  });

  it('horizontal-reverse', () => {
    const dir = getFlexDirection('horizontal-reverse');
    expect(dir).toEqual('row-reverse');
  });
  it('default', () => {
    const dir = getFlexDirection();
    expect(dir).toEqual('column');
  });
  it('vertical', () => {
    const dir = getFlexDirection('vertical');
    expect(dir).toEqual('column');
  });

  it('vertical-reverse', () => {
    const dir = getFlexDirection('vertical-reverse');
    expect(dir).toEqual('column-reverse');
  });
});
