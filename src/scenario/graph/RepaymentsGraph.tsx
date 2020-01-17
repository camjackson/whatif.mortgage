import React, { useState, useRef, FC } from 'react';
import RepaymentColumn from './RepaymentColumn';
import GridLines from './GridLines';
import HoverBox, {
  boxWidth as hoverBoxWidth,
  boxHeight as hoverBoxHeight,
} from './HoverBox';
import LoanPeriod from '../../math/LoanPeriod';
import getGridLineInterval from './getGridLineInterval';
import { Coords, constrainCoords } from '../../math/Coords';

const graphWidthPx = 500;
const graphHeightPx = 250;
const graphGutterWidthPx = 60;
const graphGutterHeightPx = 30;
const graphGutterWidthPc = (graphGutterWidthPx / graphWidthPx) * 100;
const graphGutterHeightPc = (graphGutterHeightPx / graphHeightPx) * 100;
const graphGutterYPx = graphHeightPx - graphGutterHeightPx;
// The percentage of the total graph excluding the gutters
const graphBodyWidthPc = 100 - graphGutterWidthPc;
const graphBodyHeightPc = 100 - graphGutterHeightPc;

const hoverBoxMinCoords: Coords = { x: graphGutterWidthPx, y: 1 };
const hoverBoxMaxCoords: Coords = {
  x: graphWidthPx - hoverBoxWidth - 1,
  y: graphGutterYPx - hoverBoxHeight,
};
const hoverBoxOffset = 20;

const baseFontSizePx = 16;

type Props = {
  years: LoanPeriod[];
};

const RepaymentsGraph: FC<Props> = ({ years }) => {
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
  const hoverBoxCoords = constrainCoords(
    { x: mouseCoords.x + hoverBoxOffset, y: mouseCoords.y - hoverBoxOffset },
    hoverBoxMinCoords,
    hoverBoxMaxCoords,
  );

  const columnXPc = (index: number) =>
    index * columnWidthPc + graphGutterWidthPc;

  const columnLabelXPc = (index: number) =>
    Math.min(columnXPc(index) + columnWidthPc / 2, 98);

  return (
    <svg
      style={{ gridArea: 'graph' }}
      className="text-base shadow-lg"
      width={graphWidthPx}
      height={graphHeightPx}
      ref={svgRef}
      onMouseMove={trackMouseCoords}
      onMouseLeave={() => setHoveredYear(null)}
    >
      <rect width={graphWidthPx} height={graphHeightPx} fill="none" />
      {years.map((yearData, index) => (
        <React.Fragment key={index}>
          {(index === 0 || (index + 1) % 5 === 0) && (
            <text
              className="anchor-middle"
              x={`${columnLabelXPc(index)}%`}
              y={graphHeightPx - graphGutterHeightPx + baseFontSizePx + 5}
            >
              {index + 1}
            </text>
          )}
          <RepaymentColumn
            graphMaxValue={graphMaxValue}
            graphBodyHeightPc={graphBodyHeightPc}
            yearData={yearData}
            width={`${columnWidthPc}%`}
            x={`${columnXPc(index)}%`}
            showBackground={Math.floor(index / 5) % 2 !== 0}
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
          coords={hoverBoxCoords}
          yearData={years[hoveredYear]}
          yearNumber={hoveredYear + 1}
        />
      )}
    </svg>
  );
};

export default RepaymentsGraph;
