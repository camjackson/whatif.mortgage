import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { boundingRectX, boundingRectY } from '../../../setupTests';
import RepaymentsGraph from '../RepaymentsGraph';
import RepaymentColumn from '../RepaymentColumn';
import HoverBox from '../HoverBox';
import LoanPeriod from '../../../math/LoanPeriod';

const rectProps = {};

describe('RepaymentsGraph', () => {
  const years: LoanPeriod[] = [
    new LoanPeriod(45, 180, 820, 0),
    new LoanPeriod(35, 190, 630, 0),
    new LoanPeriod(25, 200, 430, 0),
    new LoanPeriod(15, 210, 220, 0),
    new LoanPeriod(5, 220, 0, 0),
  ];
  let graph: any;

  beforeEach(() => {
    graph = mount(
      <RepaymentsGraph
        years={years}
        initialOffsetAmount={0}
        monthlyOffsetIncrement={0}
      />,
    );
  });

  it('renders a column for each year', () => {
    const columns = graph.find(RepaymentColumn);
    expect(columns).toHaveLength(5);

    expect(columns.at(0)).toHaveProp({
      graphMaxValue: 1045,
      width: '18%',
      x: '10%',
      yearData: years[0],
    });
    expect(columns.at(1)).toHaveProp({
      graphMaxValue: 1045,
      width: '18%',
      x: '28%',
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
    const moveEvent = {
      clientX: boundingRectX + 50,
      clientY: boundingRectY + 50,
    };
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
