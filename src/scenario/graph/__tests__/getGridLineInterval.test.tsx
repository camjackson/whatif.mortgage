import getGridLineInterval from '../getGridLineInterval';

describe('getGridLineInterval', () => {
  const insAndOuts = [
    { maxValue: 0, interval: 1 },
    { maxValue: 1, interval: 1 },
    { maxValue: 2, interval: 1 },
    { maxValue: 3, interval: 1 },
    { maxValue: 4, interval: 1 },
    { maxValue: 5, interval: 1 },
    { maxValue: 6, interval: 2 },
    { maxValue: 7, interval: 2 },
    { maxValue: 8, interval: 2 },
    { maxValue: 9, interval: 2 },
    { maxValue: 11, interval: 2 },
    { maxValue: 222, interval: 50 },
    { maxValue: 3333, interval: 1000 },
    { maxValue: 44444, interval: 10000 },
    { maxValue: 555555, interval: 100000 },
    { maxValue: 6666666, interval: 2000000 },
    { maxValue: 77777777, interval: 20000000 },
    { maxValue: 888888888, interval: 200000000 },
    { maxValue: 9999999999, interval: 2000000000 },
  ];

  insAndOuts.forEach(({ maxValue, interval }) => {
    it(`calculates an interval of ${interval} when the max value is ${maxValue}`, () => {
      expect(getGridLineInterval(maxValue)).toEqual(interval);
    });
  });
});
