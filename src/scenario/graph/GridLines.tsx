import React, { FC } from 'react';
import { formatCurrency } from '../../formatting';

type Props = {
  interval: number;
  maxValue: number;
  graphGutterWidthPx: number;
  graphBodyHeightPc: number;
};

const GridLines: FC<Props> = ({
  interval,
  maxValue,
  graphGutterWidthPx,
  graphBodyHeightPc,
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
          <text dominantBaseline="middle" x={0} y={`${lineHeight}%`}>
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
