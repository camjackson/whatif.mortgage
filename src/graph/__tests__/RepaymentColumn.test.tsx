import React from 'react';
import RepaymentColumn from '../RepaymentColumn';

describe('RepaymentColumn', () => {
  let rects;

  beforeEach(() => {
    const yearData = {
      interestPaid: 100,
      principalPaid: 80,
      endingPrincipal: 240,
    };
    const column = mount(
      <svg>
        <RepaymentColumn
          graphMaxValue="1000"
          yearData={yearData}
          x="35%"
          width="5%"
          onMouseEnter={() => {}}
        />
      </svg>,
    );
    rects = column.find('rect');
  });

  it('renders 3 boxes with the same x and width', () => {
    expect(rects).toHaveLength(3);
    expect(rects.at(0)).toHaveProp('x', '35%');
    expect(rects.at(0)).toHaveProp('width', '5%');
    expect(rects.at(1)).toHaveProp('x', '35%');
    expect(rects.at(1)).toHaveProp('width', '5%');
    expect(rects.at(2)).toHaveProp('x', '35%');
    expect(rects.at(2)).toHaveProp('width', '5%');
  });

  it('renders the ending principal rect at the bottom', () => {
    expect(rects.at(0)).toHaveProp('height', '24%');
    expect(rects.at(0)).toHaveProp('y', '76%');
  });

  it('renders the principal paid rect above the ending principal rect', () => {
    expect(rects.at(1)).toHaveProp('height', '8%');
    expect(rects.at(1)).toHaveProp('y', '68%');
  });

  it('renders the interest paid rect above the principal paid rect', () => {
    expect(rects.at(2)).toHaveProp('height', '10%');
    expect(rects.at(2)).toHaveProp('y', '58%');
  });
});
