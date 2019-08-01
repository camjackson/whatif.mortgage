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
    const column = render(
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
    rects = column.container.querySelectorAll('rect');
  });

  it('renders 3 boxes with the same x and width', () => {
    expect(rects).toHaveLength(3);
    expect(rects[0]).toHaveAttribute('x', '35%');
    expect(rects[0]).toHaveAttribute('width', '5%');
    expect(rects[1]).toHaveAttribute('x', '35%');
    expect(rects[1]).toHaveAttribute('width', '5%');
    expect(rects[2]).toHaveAttribute('x', '35%');
    expect(rects[2]).toHaveAttribute('width', '5%');
  });

  it('renders the ending principal rect at the bottom', () => {
    expect(rects[0]).toHaveAttribute('height', '24%');
    expect(rects[0]).toHaveAttribute('y', '76%');
  });

  it('renders the principal paid rect above the ending principal rect', () => {
    expect(rects[1]).toHaveAttribute('height', '8%');
    expect(rects[1]).toHaveAttribute('y', '68%');
  });

  it('renders the interest paid rect above the principal paid rect', () => {
    expect(rects[2]).toHaveAttribute('height', '10%');
    expect(rects[2]).toHaveAttribute('y', '58%');
  });
});
