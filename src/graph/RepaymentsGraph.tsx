import React, { useState, useRef } from 'react';
import RepaymentColumn from './RepaymentColumn';
import HoverBox from './HoverBox';

const graphWidthPx = 1000;
const graphHeightPx = 500;

const RepaymentsGraph = ({ years, loanAmount }) => {
  const [hoveredYear, setHoveredYear] = useState(null);
  const [mouseCoords, setMouseCoords] = useState({ x: -1, y: -1 });
  const svgRef = useRef<SVGSVGElement>(null);

  // In the early years, the graph numbers go higher than the initial principal
  const graphMaxValue = years[0].getTotal();
  const columnWidth = 100 / years.length;

  const trackMouseCoords = e => {
    const svg = (svgRef as any).current;
    const { x: svgX, y: svgY } = svg.getBoundingClientRect();
    setMouseCoords({ x: e.clientX - svgX, y: e.clientY - svgY });
  };

  return (
    <svg
      width={graphWidthPx}
      height={graphHeightPx}
      ref={svgRef}
      onMouseMove={trackMouseCoords}
    >
      <rect width={graphWidthPx} height={graphHeightPx} fill="#e3e3e3" />
      {years.map((yearData, index) => (
        <RepaymentColumn
          key={index}
          graphMaxValue={graphMaxValue}
          yearData={yearData}
          width={`${columnWidth}%`}
          x={`${index * columnWidth}%`}
          onMouseEnter={() => setHoveredYear(index)}
        />
      ))}
      {hoveredYear !== null && hoveredYear < years.length && (
        <HoverBox
          mouseCoords={mouseCoords}
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
