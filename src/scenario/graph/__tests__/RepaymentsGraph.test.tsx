import React from 'react';
import { act } from 'react-dom/test-utils';
import RepaymentsGraph from '../RepaymentsGraph';
import RepaymentColumn from '../RepaymentColumn';
import HoverBox from '../HoverBox';
import LoanPeriod from '../../../math/LoanPeriod';

describe('RepaymentsGraph', () => {
  const years: LoanPeriod[] = [
    new LoanPeriod(45, 180, 820),
    new LoanPeriod(35, 190, 630),
    new LoanPeriod(25, 200, 430),
    new LoanPeriod(15, 210, 220),
    new LoanPeriod(5, 220, 0),
  ];
  let graph;
  const svgX = 456;
  const svgY = 134;

  beforeEach(() => {
    graph = mount(<RepaymentsGraph years={years} loanAmount={1000} />);
  });

  it('renders a column for each year', () => {
    const columns = graph.find(RepaymentColumn);
    expect(columns).toHaveLength(5);

    expect(columns.at(0)).toHaveProp({
      graphMaxValue: 1045,
      width: '17.6%',
      x: '12%',
      yearData: years[0],
    });
    expect(columns.at(1)).toHaveProp({
      graphMaxValue: 1045,
      width: '17.6%',
      x: '29.6%',
      yearData: years[1],
    });
  });

  it('shows no hoverbox by default', () => {
    expect(graph.find(HoverBox)).not.toExist();
  });

  it('renders a hover box for the current year', () => {
    act(() => {
      graph
        .find(RepaymentColumn)
        .at(3)
        .prop('onMouseEnter')();
    });
    graph.update();

    expect(graph.find(HoverBox)).toHaveProp({
      yearData: years[3],
      yearNumber: 4,
    });
  });

  it('hides the hover box when the mouse leaves the chart', () => {
    const moveEvent = { clientX: svgX + 50, clientY: svgY + 50 };
    act(() => {
      graph.find('svg').simulate('mouseMove', moveEvent);
      graph
        .find(RepaymentColumn)
        .at(3)
        .prop('onMouseEnter')();
    });
    graph.update();

    expect(graph.find(HoverBox)).toExist();

    act(() => {
      graph.find('svg').simulate('mouseLeave', {});
    });
    graph.update();

    expect(graph.find(HoverBox)).not.toExist();
  });
});
