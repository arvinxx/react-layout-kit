import { getCssValue, getFlexDirection } from './utils';

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

describe('getCssValue', () => {
  it.each([
    [NaN, NaN],
    [Infinity, Infinity],
    [-Infinity, -Infinity],
    ['0x1F', '31px'],
    ['1', '1px'],
    ['1px', '1px'],
    ['1.1px', '1.1px'],
    ['2e1', '20px'],
    ['2e-1', '0.2px'],

    ['1em', '1em'],
    ['1rem', '1rem'],
  ])('getCssValue(%s)', (value, expected) => {
    expect(getCssValue(value)).toEqual(expected);
  });
});
