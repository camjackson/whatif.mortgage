import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

const change = value => ['change', { target: { value } }];

const parsePercentage = percentageString => {
  expect(percentageString.slice(-1)).toEqual('%');

  return parseFloat(percentageString.slice(0, -1));
};

it('works', () => {
  const app = mount(<App />);

  // If we fill in the form...
  const initialInputs = app.find('input');
  initialInputs.at(0).simulate(...change(1000));
  initialInputs.at(1).simulate(...change(3.6));
  initialInputs.at(2).simulate(...change(3));

  // Then it shows the inputs, ...
  const normalInputs = app.find('input');
  expect(normalInputs.at(0)).toHaveValue(1000);
  expect(normalInputs.at(1)).toHaveValue(3.6);
  expect(normalInputs.at(2)).toHaveValue(3);

  //... and it shows the graph, ...
  let rects = app.find('svg').find('rect');
  const principalRemainingRect = rects.at(1);
  const principalPaidRect = rects.at(2);
  const interestPaidRect = rects.at(3);

  // (the first column rects are all at the far left, taking up a third)
  [principalRemainingRect, principalPaidRect, interestPaidRect].forEach(
    rect => {
      expect(rect).toHaveProp({
        x: '8%',
        width: '30.666666666666668%',
      });
    },
  );
  // (the interest paid is at the top)
  expect(parsePercentage(interestPaidRect.prop('y'))).toBeCloseTo(0);
  // (the principal paid is directly underneath the interest paid)
  expect(parsePercentage(principalPaidRect.prop('y'))).toBeCloseTo(
    parsePercentage(interestPaidRect.prop('height')),
  );
  // (the principal remaining is directly underneath the interest and principal paid)
  expect(
    parsePercentage(interestPaidRect.prop('height')) +
      parsePercentage(principalPaidRect.prop('height')),
  ).toBeCloseTo(parsePercentage(principalRemainingRect.prop('y')));
  // (and all three sum up to a little under 100% [space left for the axis])
  expect(
    parsePercentage(interestPaidRect.prop('height')) +
      parsePercentage(principalPaidRect.prop('height')) +
      parsePercentage(principalRemainingRect.prop('height')),
  ).toBeCloseTo(94);

  //... and it shows the summary stats...
  expect(app).toIncludeText('monthly repayments of $29');
  expect(app).toIncludeText('your total interest bill will be $56');
  expect(app).toIncludeText('or 6% of the amount you borrowed');

  // ... but no HoverBox yet.
  expect(app.find('HoverBox')).not.toExist();

  // Now if we change from 3 years to 5, ...
  normalInputs.at(2).simulate(...change(5));

  // ... then the summary stats get updated.
  expect(app).toIncludeText('monthly repayments of $18');
  expect(app).toIncludeText('your total interest bill will be $94');
  expect(app).toIncludeText('or 9% of the amount you borrowed');

  // Now if we hover over the second column of the graph, ...
  rects = app.find('rect');
  rects.at(2 * 3).simulate('mouseEnter'); // 3 for each column

  // ... then it shows the HoverBox with the year 2 stats.
  const hoverBox = app.find('HoverBox');
  expect(hoverBox).toIncludeText('Year 2:');
  expect(hoverBox).toIncludeText('Interest paid: $26');
  expect(hoverBox).toIncludeText('Principal paid: $193');
  expect(hoverBox).toIncludeText('Principal remaining: $621');
});
