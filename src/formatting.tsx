const integerOpts = { minimumFractionDigits: 0, maximumFractionDigits: 0 };

export const formatCurrency = (symbol: string) => (amount: number): string => {
  if (amount > -10000 && amount < 10000) {
    return `${symbol}${formatInteger(amount)}`;
  }
  return `${symbol}${formatInteger(amount / 1000)}k`;
};

export const formatInteger = (amount: number) =>
  amount.toLocaleString(undefined, integerOpts);
