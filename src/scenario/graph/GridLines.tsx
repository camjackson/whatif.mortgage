import React, { FC, useRef, useLayoutEffect } from 'react';
import getGridLineInterval from './getGridLineInterval';

type Props = {
  maxValue: number;
  graphGutterWidthPx: number;
  graphBodyHeightPc: number;
  setGraphGutterWidthPx: (widthPx: number) => void;
  formatCurrency: (amount: number) => string;
};

const getLineHeights = (
  interval: number,
  maxValue: number,
  graphBodyHeightPc: number,
): number[] => {
  const lineHeights = [];
  const lineIntervalPc = (interval / maxValue) * graphBodyHeightPc;
  let nextLineHeight = graphBodyHeightPc - lineIntervalPc;

  while (nextLineHeight > 0) {
    lineHeights.push(nextLineHeight);
    nextLineHeight -= lineIntervalPc;
  }
  return lineHeights;
};

const GridLines: FC<Props> = ({
  maxValue,
  graphGutterWidthPx,
  graphBodyHeightPc,
  setGraphGutterWidthPx,
  formatCurrency,
}) => {
  const yAxisLabelRef = useRef(null);
  useLayoutEffect(() => {
    setGraphGutterWidthPx(
      yAxisLabelRef.current.getBoundingClientRect().width + 5,
    );
  }, [yAxisLabelRef, setGraphGutterWidthPx]);
  const interval = getGridLineInterval(maxValue);
  const lineHeights = getLineHeights(interval, maxValue, graphBodyHeightPc);

  return (
    <>
      {lineHeights.map((lineHeight, i) => (
        <React.Fragment key={lineHeight}>
          <text
            ref={i === lineHeights.length - 1 ? yAxisLabelRef : undefined}
            dominantBaseline="middle"
            x={0}
            y={`${lineHeight}%`}
          >
            {formatCurrency((i + 1) * interval)}
          </text>
          <line
            stroke="black"
            x1={graphGutterWidthPx}
            x2={`${100}%`}
            y1={`${lineHeight}%`}
            y2={`${lineHeight}%`}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default GridLines;
