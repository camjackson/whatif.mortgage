const calculateRepayment = (p: number, r: number, n: number): number => {
  const onePlusRToTheN = Math.pow(1 + r, n);
  const numerator = r * onePlusRToTheN;
  const denominator = onePlusRToTheN - 1;

  return p * (numerator / denominator);
};

export default calculateRepayment;
