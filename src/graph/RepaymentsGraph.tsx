import React, { useState, useRef, FunctionComponent as FC } from 'react';
import styled from 'styled-components';
import RepaymentColumn from './RepaymentColumn';
import GridLines from './GridLines';
import HoverBox from './HoverBox';
import LoanPeriod from '../math/LoanPeriod';
import getGridLineInterval from './getGridLineInterval';

const graphWidthPx = 1000;
const graphHeightPx = 500;
const graphGutterWidthPx = 80;
const graphGutterHeightPx = 30;
const graphGutterWidthPc = (graphGutterWidthPx / graphWidthPx) * 100;
const graphGutterHeightPc = (graphGutterHeightPx / graphHeightPx) * 100;
// The percentage of the total graph excluding the gutters
const graphBodyWidthPc = 100 - graphGutterWidthPc;
const graphBodyHeightPc = 100 - graphGutterHeightPc;

const textHeight = 16;
const Text = styled.text`
  font-size: ${textHeight}px;
  text-anchor: middle;
`;

type Props = {
  years: LoanPeriod[];
  loanAmount: number;
};

const RepaymentsGraph: FC<Props> = ({ years, loanAmount }) => {
  const [hoveredYear, setHoveredYear] = useState(null);
  const [mouseCoords, setMouseCoords] = useState({ x: -1, y: -1 });
  const svgRef = useRef<SVGSVGElement>(null);

  // In the first year, the interest pushes the column higher than the initial principal
  const graphMaxValue = years[0].getTotal();
  const columnWidthPc = graphBodyWidthPc / years.length;

  const trackMouseCoords = e => {
    const svg = (svgRef as any).current;
    const { x: svgX, y: svgY } = svg.getBoundingClientRect();
    setMouseCoords({ x: e.clientX - svgX, y: e.clientY - svgY });
  };

  const columnXPc = index => index * columnWidthPc + graphGutterWidthPc;

  return (
    <svg
      width={graphWidthPx}
      height={graphHeightPx}
      ref={svgRef}
      onMouseMove={trackMouseCoords}
    >
      <rect width={graphWidthPx} height={graphHeightPx} fill="#e3e3e3" />
      {years.map((yearData, index) => (
        <React.Fragment key={index}>
          <Text
            x={`${columnXPc(index) + columnWidthPc / 2}%`}
            y={graphHeightPx - graphGutterHeightPx + textHeight + 5}
          >
            {index + 1}
          </Text>
          <RepaymentColumn
            graphMaxValue={graphMaxValue}
            graphBodyHeightPc={graphBodyHeightPc}
            yearData={yearData}
            width={`${columnWidthPc}%`}
            x={`${columnXPc(index)}%`}
            onMouseEnter={() => setHoveredYear(index)}
          />
        </React.Fragment>
      ))}
      <GridLines
        interval={getGridLineInterval(graphMaxValue)}
        maxValue={graphMaxValue}
        graphGutterWidthPx={graphGutterWidthPx}
        graphBodyHeightPc={graphBodyHeightPc}
        graphBodyWidthPc={graphBodyWidthPc}
      />
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
