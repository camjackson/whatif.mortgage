import React from 'react';
import { act } from 'react-dom/test-utils';
import RepaymentsGraph from '../RepaymentsGraph';
import RepaymentColumn from '../RepaymentColumn';
import HoverBox from '../HoverBox';
import LoanPeriod from '../../math/LoanPeriod';

describe('RepaymentsGraph', () => {
  const years: LoanPeriod[] = [
    new LoanPeriod(45, 180, 820),
    new LoanPeriod(35, 190, 630),
    new LoanPeriod(25, 200, 430),
    new LoanPeriod(15, 210, 220),
    new LoanPeriod(5, 220, 0),
  ];
  let graph;
  let getBoundingClientRect;

  beforeEach(() => {
    graph = mount(<RepaymentsGraph years={years} loanAmount={1000} />);
    getBoundingClientRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = () => ({
      x: 456,
      y: 134,
    });
  });

  afterEach(() => {
    Element.prototype.getBoundingClientRect = getBoundingClientRect;
  });

  it('renders a column for each year', () => {
    const columns = graph.find(RepaymentColumn);
    expect(columns).toHaveLength(5);

    expect(columns.at(0)).toHaveProp({
      graphMaxValue: 1045,
      width: '18.8%',
      x: '6%',
      yearData: years[0],
    });
    expect(columns.at(1)).toHaveProp({
      graphMaxValue: 1045,
      width: '18.8%',
      x: '24.8%',
      yearData: years[1],
    });
  });

  it('shows no hoverbox by default', () => {
    expect(graph.find(HoverBox)).not.toExist();
  });

  it('renders a hoverbox for the current year at the current mouse coords', () => {
    const event = { clientX: 656, clientY: 234 };

    act(() => {
      graph.find('svg').simulate('mouseMove', event);
      graph
        .find(RepaymentColumn)
        .at(3)
        .prop('onMouseEnter')();
    });
    graph.update();

    expect(graph.find(HoverBox)).toHaveProp({
      mouseCoords: { x: 200, y: 100 },
      yearData: years[3],
      yearNumber: 4,
    });
  });
});
