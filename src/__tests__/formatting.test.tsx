import { formatCurrency, formatInteger } from '../formatting';

describe('formatCurrency', () => {
  it('formats numbers as currency', () => {
    expect(formatCurrency(123)).toEqual('$123');
    expect(formatCurrency(123.45)).toEqual('$123');
    expect(formatCurrency(123.56)).toEqual('$124');
    expect(formatCurrency(-123.45)).toEqual('-$123');
    expect(formatCurrency(-123.56)).toEqual('-$124');
  });
});

describe('formatNumber', () => {
  it('formats numbers', () => {
    expect(formatInteger(12.3456)).toEqual('12');
    expect(formatInteger(987.654)).toEqual('988');
  });
});
