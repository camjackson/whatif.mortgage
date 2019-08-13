import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

const change = value => ['change', { target: { value } }];
const blur = value => ['blur', { target: { value } }];

const parsePercentage = percentageString => {
  expect(percentageString.slice(-1)).toEqual('%');

  return parseFloat(percentageString.slice(0, -1));
};

it('works', () => {
  const app = mount(<App />);

  // It starts with the initial input form.
  expect(app).toIncludeText('I will borrow');

  // If we fill it in and click the button...
  const initialInputs = app.find('input');
  initialInputs.at(0).simulate(...change(1000));
  initialInputs.at(1).simulate(...change(3.6));
  initialInputs.at(2).simulate(...change(3));
  app.find('button').simulate('click');

  // Then it shows the inputs, ...
  const normalInputs = app.find('input');
  expect(normalInputs.at(0)).toHaveProp('defaultValue', 1000);
  expect(normalInputs.at(1)).toHaveProp('defaultValue', 3.6);
  expect(normalInputs.at(2)).toHaveProp('defaultValue', 3);

  //... and the table, ...
  const tableText = ['USD 31', 'USD 321', 'USD 679'];
  expect(app.find('table')).toIncludeText(tableText.join(''));

  //... and the graph, ...
  let rects = app.find('svg').find('rect');
  const principalRemainingRect = rects.at(1);
  const principalPaidRect = rects.at(2);
  const interestPaidRect = rects.at(3);

  // (the first column rects are all at the far left, taking up a third)
  [principalRemainingRect, principalPaidRect, interestPaidRect].forEach(
    rect => {
      expect(rect).toHaveProp({
        x: '4%',
        width: '32%',
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
  // (and all three sum up to 100)
  expect(
    parsePercentage(interestPaidRect.prop('height')) +
      parsePercentage(principalPaidRect.prop('height')) +
      parsePercentage(principalRemainingRect.prop('height')),
  ).toBeCloseTo(92);

  //... and the summary stats...
  expect(app).toIncludeText('Total interest paid: USD 56');
  expect(app).toIncludeText('Total amount paid: USD 1,056');

  // ... but no HoverBox yet.
  expect(app.find('HoverBox')).not.toExist();

  // Now if we change from 3 years to 5, ...
  normalInputs.at(2).simulate(...blur(5));

  // ... then the summary stats get updated.
  expect(app).toIncludeText('Total interest paid: USD 94');
  expect(app).toIncludeText('Total amount paid: USD 1,094');

  // Now if we hover over the second column of the graph, ...
  rects = app.find('rect');
  rects.at(2 * 3).simulate('mouseEnter'); // 3 for each column

  // ... then it shows the HoverBox with the year 2 stats.
  const hoverBox = app.find('HoverBox');
  expect(hoverBox).toIncludeText('Year 2:');
  expect(hoverBox).toIncludeText('Interest paid: USD 26');
  expect(hoverBox).toIncludeText('Principal paid: USD 193');
  expect(hoverBox).toIncludeText('Principal remaining: USD 621');
});
