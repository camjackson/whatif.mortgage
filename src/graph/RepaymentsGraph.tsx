import React, { useState, useRef, FunctionComponent as FC } from 'react';
import RepaymentColumn from './RepaymentColumn';
import HoverBox from './HoverBox';
import LoanPeriod from '../math/LoanPeriod';

const graphWidthPx = 1000;
const graphHeightPx = 500;
const graphGutterPx = 40;
const graphGutterWidthPc = (graphGutterPx / graphWidthPx) * 100;
const graphGutterHeightPc = (graphGutterPx / graphHeightPx) * 100;
// The percentage of the total graph excluding the gutters
const graphBodyWidthPc = 100 - graphGutterWidthPc;
const graphBodyHeightPc = 100 - graphGutterHeightPc;

type Props = {
  years: LoanPeriod[];
  loanAmount: number;
};

const RepaymentsGraph: FC<Props> = ({ years, loanAmount }) => {
  const [hoveredYear, setHoveredYear] = useState(null);
  const [mouseCoords, setMouseCoords] = useState({ x: -1, y: -1 });
  const svgRef = useRef<SVGSVGElement>(null);

  // In the early years, the graph numbers go higher than the initial principal
  const graphMaxValue = years[0].getTotal();
  const columnWidthPc = graphBodyWidthPc / years.length;

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
          graphBodyHeightPc={graphBodyHeightPc}
          yearData={yearData}
          width={`${columnWidthPc}%`}
          x={`${index * columnWidthPc + graphGutterWidthPc}%`}
          onMouseEnter={() => setHoveredYear(index)}
        />
      ))}
      {hoveredYear !== null && hoveredYear < years.length && (
        <HoverBox
          mouseCoords={mouseCoords}
          yearData={years[hoveredYear]}
          yearNumber={hoveredYear + 1}
        />
      )}
    </svg>
  );
};

export default RepaymentsGraph;
