import React, { FunctionComponent as FC } from 'react';
import { formatCurrency } from '../formatting';

type Props = {
  interval;
  maxValue;
  graphGutterWidthPx;
  graphBodyHeightPc;
  graphBodyWidthPc;
};

const GridLines: FC<Props> = ({
  interval,
  maxValue,
  graphGutterWidthPx,
  graphBodyHeightPc,
  graphBodyWidthPc,
}) => {
  const lineHeights = [];
  const lineIntervalPc = (interval / maxValue) * graphBodyHeightPc;
  let nextLineHeight = graphBodyHeightPc - lineIntervalPc;

  while (nextLineHeight > 0) {
    lineHeights.push(nextLineHeight);
    nextLineHeight -= lineIntervalPc;
  }
  return (
    <>
      {lineHeights.map((lineHeight, i) => (
        <React.Fragment key={lineHeight}>
          <text
            textAnchor="end"
            dominantBaseline="middle"
            y={`${lineHeight}%`}
            x={graphGutterWidthPx - 5}
          >
            {formatCurrency((i + 1) * interval)}
          </text>
          <line
            stroke="black"
            x1={`${100 - graphBodyWidthPc}%`}
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
