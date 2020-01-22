import React, { FC } from 'react';

type Props = {
  x1: string;
  x2: string;
  previousOffset: number;
  nextOffset: number;
  graphMaxValue: number;
  graphBodyHeightPc: number;
};

const OffsetTrendLineSegment: FC<Props> = ({
  x1, // Percentage
  x2, // Percentage
  previousOffset,
  nextOffset,
  graphMaxValue,
  graphBodyHeightPc,
}) => {
  const y1 =
    graphBodyHeightPc - (previousOffset / graphMaxValue) * graphBodyHeightPc;
  const y2 =
    graphBodyHeightPc - (nextOffset / graphMaxValue) * graphBodyHeightPc;
  return (
    <line
      className="stroke-current text-blue-700"
      strokeWidth={2}
      x1={x1}
      x2={x2}
      y1={`${y1}%`}
      y2={`${y2}%`}
    />
  );
};

export default OffsetTrendLineSegment;
