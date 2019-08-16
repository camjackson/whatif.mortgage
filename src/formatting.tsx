const integerOpts = { minimumFractionDigits: 0, maximumFractionDigits: 0 };

const currencyOptsOpts = {
  style: 'currency',
  currency: 'USD',
  ...integerOpts,
};

export const formatCurrency = (number: number): string =>
  number.toLocaleString(undefined, currencyOptsOpts);

export const formatInteger = number =>
  number.toLocaleString(undefined, integerOpts);
