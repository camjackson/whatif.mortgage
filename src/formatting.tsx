const integerOpts = { minimumFractionDigits: 0, maximumFractionDigits: 0 };

const toLocaleString =
  process.env.NODE_ENV === 'test'
    ? number => `$${formatInteger(number)}`
    : number => number.toLocaleString(undefined, currencyOpts);

const currencyOpts = {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'symbol',
  ...integerOpts,
};

export const formatCurrency = (number: number): string => {
  if (number > -10000 && number < 10000) {
    return toLocaleString(number);
  }
  return `${toLocaleString(number / 1000)}k`;
};

export const formatInteger = number =>
  number.toLocaleString(undefined, integerOpts);
