import formatCurrency from '../formatCurrency';

describe('formatCurrency', () => {
  it('formats numbers as currency', () => {
    expect(formatCurrency(123)).toEqual('USD 123');
    expect(formatCurrency(123.45)).toEqual('USD 123');
    expect(formatCurrency(123.56)).toEqual('USD 124');
    expect(formatCurrency(-123.45)).toEqual('-USD 123');
    expect(formatCurrency(-123.56)).toEqual('-USD 124');
  });
});
