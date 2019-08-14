const targetNumberOfIntervals = 5;
const validDigits = [1, 2, 5];

const getNextDigitAndPowerOfTen = (currentDigit, currentPowerOfTen) => {
  const nextIndex = validDigits.indexOf(currentDigit) + 1;
  return nextIndex === validDigits.length // Have we gone OOB?
    ? [validDigits[0], currentPowerOfTen + 1] // loop
    : [validDigits[nextIndex], currentPowerOfTen]; // don't loop
};

const getGridLineInterval = (maxValue: number): number => {
  let digit = -1;
  let powerOf10 = 0;
  let result;
  let numberOfIntervals;

  do {
    [digit, powerOf10] = getNextDigitAndPowerOfTen(digit, powerOf10);
    result = digit * Math.pow(10, powerOf10);
    numberOfIntervals = Math.floor(maxValue / result);
  } while (numberOfIntervals > targetNumberOfIntervals);

  return result;
};

export default getGridLineInterval;
