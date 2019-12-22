const integerOpts = { minimumFractionDigits: 0, maximumFractionDigits: 0 };

const defaultLocale = process.env.NODE_ENV === 'test' ? 'en-AU' : undefined;

const currencyOpts = {
  style: 'currency',
  currency: 'AUD',
  currencyDisplay: 'symbol',
  ...integerOpts,
};

export const formatCurrency = (number: number): string =>
  number.toLocaleString(defaultLocale, currencyOpts);

export const formatInteger = number =>
  number.toLocaleString(defaultLocale, integerOpts);
