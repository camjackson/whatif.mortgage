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
  let getBoundingClientRect;
  const svgX = 456;
  const svgY = 134;

  beforeEach(() => {
    graph = mount(<RepaymentsGraph years={years} loanAmount={1000} />);
    getBoundingClientRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = () => ({
      x: svgX,
      y: svgY,
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
      width: '18.4%',
      x: '8%',
      yearData: years[0],
    });
    expect(columns.at(1)).toHaveProp({
      graphMaxValue: 1045,
      width: '18.4%',
      x: '26.4%',
      yearData: years[1],
    });
  });

  it('shows no hoverbox by default', () => {
    expect(graph.find(HoverBox)).not.toExist();
  });

  it('renders a hover box for the current year at an offset from the current mouse coords', () => {
    const event = { clientX: svgX + 200, clientY: svgY + 100 };

    act(() => {
      graph.find('svg').simulate('mouseMove', event);
      graph
        .find(RepaymentColumn)
        .at(3)
        .prop('onMouseEnter')();
    });
    graph.update();

    expect(graph.find(HoverBox)).toHaveProp({
      coords: { x: 220, y: 80 },
      yearData: years[3],
      yearNumber: 4,
    });
  });

  it('constrains the hover box so it does not overlap the axes', () => {
    const event = { clientX: svgX + 5, clientY: svgY + 490 };

    act(() => {
      graph.find('svg').simulate('mouseMove', event);
      graph
        .find(RepaymentColumn)
        .at(3)
        .prop('onMouseEnter')();
    });
    graph.update();

    expect(graph.find(HoverBox)).toHaveProp({ coords: { x: 80, y: 375 } });
  });

  it('constrains the hover box so it does not go off the top-right corner', () => {
    const event = { clientX: svgX + 950, clientY: svgY + 10 };

    act(() => {
      graph.find('svg').simulate('mouseMove', event);
      graph
        .find(RepaymentColumn)
        .at(3)
        .prop('onMouseEnter')();
    });
    graph.update();

    expect(graph.find(HoverBox)).toHaveProp({ coords: { x: 749, y: 1 } });
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
