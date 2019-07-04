import React, { useState } from 'react';
import RepaymentColumn from './RepaymentColumn';
import HoverBox from './HoverBox';

const graphWidthPx = 1000;
const graphHeightPx = 500;

const RepaymentsGraph = ({ years, loanAmount }) => {
  const [hoveredYear, setHoveredYear] = useState(null);
  const noHover = () => setHoveredYear(null);

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
          onMouseEnter={() => setHoveredYear(index)}
          onMouseLeave={noHover}
        />
      ))}
      {hoveredYear !== null && (
        <HoverBox
          yearData={years[hoveredYear]}
          yearNumber={hoveredYear + 1}
          graphWidthPx={graphWidthPx}
          graphHeightPx={graphHeightPx}
        />
      )}
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
// - Click on column to lock the hover
// - Hover box follows the mouse
