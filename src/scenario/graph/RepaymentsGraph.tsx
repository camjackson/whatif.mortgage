import React, { useState, FC } from 'react';
import RepaymentColumn from './RepaymentColumn';
import OffsetTrendLineSegment from './OffsetTrendLineSegment';
import GridLines from './GridLines';
import HoverBox from './HoverBox';
import LoanPeriod from '../../math/LoanPeriod';
import getGridLineInterval from './getGridLineInterval';

const graphWidthPx = 500;
const graphHeightPx = 250;
const graphGutterWidthPx = 60;
const graphGutterHeightPx = 30;
const graphGutterWidthPc = (graphGutterWidthPx / graphWidthPx) * 100;
const graphGutterHeightPc = (graphGutterHeightPx / graphHeightPx) * 100;
// The percentage of the total graph excluding the gutters
const graphBodyWidthPc = 100 - graphGutterWidthPc;
const graphBodyHeightPc = 100 - graphGutterHeightPc;

const baseFontSizePx = 16;

type Props = {
  years: LoanPeriod[];
  initialOffsetAmount: number;
  monthlyOffsetIncrement: number;
};

const RepaymentsGraph: FC<Props> = ({
  years,
  initialOffsetAmount,
  monthlyOffsetIncrement,
}) => {
  const [hoveredYear, setHoveredYear] = useState(null);
  const [focussedYear, setFocussedYear] = useState(null);

  const handleYearClicked = (index: number) => {
    setFocussedYear(focussedYear === index ? null : index);
  };
  const hoveredOrFocussedYear =
    hoveredYear !== null ? hoveredYear : focussedYear;

  // In the first year, the interest pushes the column higher than the initial principal
  const graphMaxValue = years[0].getTotal();
  const columnWidthPc = graphBodyWidthPc / years.length;

  const columnXPc = (index: number) =>
    index * columnWidthPc + graphGutterWidthPc;

  const columnLabelXPc = (index: number) =>
    Math.min(columnXPc(index) + columnWidthPc / 2, 98);

  const shouldGraphOffset = !!monthlyOffsetIncrement;

  return (
    <svg
      style={{ gridArea: 'graph' }}
      className="text-base"
      width={graphWidthPx}
      height={graphHeightPx}
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
            isFocussed={focussedYear === index}
            showBackground={Math.floor(index / 5) % 2 !== 0}
            onMouseEnter={() => setHoveredYear(index)}
            onClick={() => handleYearClicked(index)}
          />
          {shouldGraphOffset && (
            <OffsetTrendLineSegment
              x1={`${columnXPc(index)}%`}
              x2={`${columnXPc(index + 1)}%`}
              previousOffset={
                index === 0
                  ? initialOffsetAmount
                  : years[index - 1].totalSavedOffset
              }
              nextOffset={yearData.totalSavedOffset}
              graphMaxValue={graphMaxValue}
              graphBodyHeightPc={graphBodyHeightPc}
            />
          )}
        </React.Fragment>
      ))}
      <GridLines
        interval={getGridLineInterval(graphMaxValue)}
        maxValue={graphMaxValue}
        graphGutterWidthPx={graphGutterWidthPx}
        graphBodyHeightPc={graphBodyHeightPc}
        graphBodyWidthPc={graphBodyWidthPc}
      />
      {hoveredOrFocussedYear !== null &&
        hoveredOrFocussedYear < years.length && (
          <HoverBox
            graphWidthPx={graphWidthPx}
            yearData={years[hoveredOrFocussedYear]}
            yearNumber={hoveredOrFocussedYear + 1}
            shouldGraphOffset={shouldGraphOffset}
          />
        )}
    </svg>
  );
};

export default RepaymentsGraph;
