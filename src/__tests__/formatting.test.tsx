import { formatCurrency, formatInteger } from '../formatting';

describe('formatCurrency', () => {
  // These tests are kinda dumb now because I'm just stubbing toLocaleString
  it('formats numbers as currency', () => {
    expect(formatCurrency(123)).toEqual('$123');
    expect(formatCurrency(123.45)).toEqual('$123');
    expect(formatCurrency(123.56)).toEqual('$124');
    expect(formatCurrency(1234.45)).toEqual('$1,234');
    expect(formatCurrency(1234.56)).toEqual('$1,235');
    expect(formatCurrency(-123.45)).toEqual('$-123');
    expect(formatCurrency(-123.56)).toEqual('$-124');
    expect(formatCurrency(-1234.45)).toEqual('$-1,234');
    expect(formatCurrency(-1234.56)).toEqual('$-1,235');
  });

  it('truncates big numbers', () => {
    expect(formatCurrency(123000)).toEqual('$123k');
    expect(formatCurrency(123456)).toEqual('$123k');
    expect(formatCurrency(123789)).toEqual('$124k');
    expect(formatCurrency(1234456)).toEqual('$1,234k');
    expect(formatCurrency(1234567)).toEqual('$1,235k');

    expect(formatCurrency(-123000)).toEqual('$-123k');
    expect(formatCurrency(-123456)).toEqual('$-123k');
    expect(formatCurrency(-123789)).toEqual('$-124k');
    expect(formatCurrency(-1234456)).toEqual('$-1,234k');
    expect(formatCurrency(-1234567)).toEqual('$-1,235k');
  });
});

describe('formatNumber', () => {
  it('formats numbers', () => {
    expect(formatInteger(12.3456)).toEqual('12');
    expect(formatInteger(987.654)).toEqual('988');
  });
});
