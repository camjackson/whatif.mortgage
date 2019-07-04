const formatOpts = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

const formatCurrency = number => number.toLocaleString(undefined, formatOpts);

export default formatCurrency;
