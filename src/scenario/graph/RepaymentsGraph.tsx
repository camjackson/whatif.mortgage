import React, { useState, useLayoutEffect, useRef, FC } from 'react';
import RepaymentColumn from './RepaymentColumn';
import OffsetTrendLineSegment from './OffsetTrendLineSegment';
import GridLines from './GridLines';
import HoverBox from './HoverBox';
import LoanPeriod from '../../math/LoanPeriod';

const getGraphLayoutMeasurements = (
  graphWidthPx: number,
  graphGutterWidthPx: number,
) => {
  const graphHeightPx = 250;

  const graphGutterHeightPx = 30;
  const graphGutterWidthPc = (graphGutterWidthPx / graphWidthPx) * 100;
  const graphGutterHeightPc = (graphGutterHeightPx / graphHeightPx) * 100;

  return {
    graphHeightPx,
    graphGutterHeightPx,
    graphGutterWidthPx,
    graphGutterWidthPc,
    graphBodyWidthPc: 100 - graphGutterWidthPc,
    graphBodyHeightPc: 100 - graphGutterHeightPc,
    baseFontSizePx: 16,
  };
};

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
  const [graphWidthPx, setGraphWidthPx] = useState(1);
  const [graphGutterWidthPx, setGraphGutterWidthPx] = useState(1);
  const svgRef = useRef(null);

  useLayoutEffect(() => {
    const onResize = () => {
      setGraphWidthPx(svgRef.current.getBoundingClientRect().width);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [svgRef]);

  const handleYearClicked = (index: number) => {
    setFocussedYear(focussedYear === index ? null : index);
  };
  const hoveredOrFocussedYear =
    hoveredYear !== null ? hoveredYear : focussedYear;

  const {
    graphHeightPx,
    graphGutterHeightPx,
    graphGutterWidthPc,
    graphBodyWidthPc,
    graphBodyHeightPc,
    baseFontSizePx,
  } = getGraphLayoutMeasurements(graphWidthPx, graphGutterWidthPx);

  // In the first year, the interest pushes the column higher than the initial principal
  const graphMaxValue = years[0].getTotal();
  const columnWidthPc = graphBodyWidthPc / years.length;

  const columnXPc = (index: number) =>
    index * columnWidthPc + graphGutterWidthPc;

  const columnLabelXPx = (index: number) =>
    Math.min(
      ((columnXPc(index) + columnWidthPc / 2) / 100) * graphWidthPx,
      graphWidthPx - 12,
    );

  const shouldGraphOffset = !!monthlyOffsetIncrement;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ gridArea: 'graph' }}
      ref={svgRef}
      className="text-base"
      height={graphHeightPx}
      onMouseLeave={() => setHoveredYear(null)}
    >
      <rect width={graphWidthPx} height={graphHeightPx} fill="none" />
      {years.map((yearData, index) => (
        <React.Fragment key={index}>
          {(index === 0 || (index + 1) % 5 === 0) && (
            <text
              className="anchor-middle"
              x={columnLabelXPx(index)}
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
                  ? initialOffsetAmount || 0
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
        maxValue={graphMaxValue}
        graphGutterWidthPx={graphGutterWidthPx}
        graphBodyHeightPc={graphBodyHeightPc}
        setGraphGutterWidthPx={setGraphGutterWidthPx}
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
