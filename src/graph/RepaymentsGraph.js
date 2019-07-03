import React from 'react';
import RepaymentColumn from './RepaymentColumn';

const graphWidthPx = 1000;
const graphHeightPx = 500;

const RepaymentsGraph = ({ years, loanAmount }) => {
  // In the early years, the graph numbers go higher than the initial principal
  const graphMaxValue = years[0].getTotal();
  const columnWidth = 100 / years.length;

  return (
    <svg width={graphWidthPx} height={graphHeightPx}>
      <rect width={graphWidthPx} height={graphHeightPx} fill="#e3e3e3" />
      {years.map((yearData, index) => (
        <RepaymentColumn
          key={index}
          graphMaxValue={graphMaxValue}
          yearData={yearData}
          width={`${columnWidth}%`}
          x={`${index * columnWidth}%`}
        />
      ))}
    </svg>
  );
};

export default RepaymentsGraph;

// Graph todo:
// - Legend
// - Axis labels and values
// - Horizontal line showing starting principal
// - Better colours
// - Outlines?
// - Hover box with exact numbers
