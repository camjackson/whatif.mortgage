import React from 'react';
import { mount } from 'enzyme';
import RepaymentColumn from '../RepaymentColumn';
import LoanPeriod from '../../../math/LoanPeriod';

describe('RepaymentColumn', () => {
  let rects;

  beforeEach(() => {
    const yearData = new LoanPeriod(100, 80, 240, 0);
    const column = mount(
      <svg>
        <RepaymentColumn
          graphMaxValue={1000}
          graphBodyHeightPc={50}
          yearData={yearData}
          x="35%"
          width="5%"
          showBackground={false}
          isFocussed={false}
          onMouseEnter={() => {}}
          onClick={() => {}}
        />
      </svg>,
    );
    rects = column.find('rect');
  });

  it('renders 4 boxes with the same x and width', () => {
    expect(rects).toHaveLength(4);
    [0, 1, 2, 3].forEach(i => {
      expect(rects.at(i)).toHaveProp('x', '35%');
      expect(rects.at(i)).toHaveProp('width', '5%');
    });
  });

  it('renders the ending principal rect at the bottom', () => {
    expect(rects.at(0)).toHaveProp('height', '12%');
    expect(rects.at(0)).toHaveProp('y', '38%');
  });

  it('renders the principal paid rect above the ending principal rect', () => {
    expect(rects.at(1)).toHaveProp('height', '4%');
    expect(rects.at(1)).toHaveProp('y', '34%');
  });

  it('renders the interest paid rect above the principal paid rect', () => {
    expect(rects.at(2)).toHaveProp('height', '5%');
    expect(rects.at(2)).toHaveProp('y', '29%');
  });

  it('renders a border around all the rects', () => {
    expect(rects.at(3)).toHaveProp('height', '21%');
    expect(rects.at(3)).toHaveProp('y', '29%');
  });
});
