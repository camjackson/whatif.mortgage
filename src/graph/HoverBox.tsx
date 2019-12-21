import React, { FC } from 'react';
import { formatCurrency } from '../formatting';
import LoanPeriod from '../math/LoanPeriod';

const boxWidth = 250;
const boxHeight = 95;
const mouseOffset = 20;
const textMargin = 10;
const lineHeight = 20;

type Coords = {
  x: number;
  y: number;
};

type Props = {
  mouseCoords: Coords;
  yearData: LoanPeriod;
  yearNumber: number;
};

const HoverBox: FC<Props> = ({ mouseCoords, yearData, yearNumber }) => {
  const boxX = mouseCoords.x + mouseOffset;
  const boxY = mouseCoords.y - mouseOffset;
  const textX = boxX + textMargin;
  const textY = boxY + textMargin;

  return (
    <>
      <rect
        className="text-black stroke-current fill-white"
        x={boxX}
        y={boxY}
        width={boxWidth}
        height={boxHeight}
      />
      <text className="baseline-hanging" x={textX} y={textY}>
        Year {yearNumber}:
      </text>
      <text className="baseline-hanging" x={textX} y={textY + lineHeight}>
        Interest paid: {formatCurrency(yearData.interestPaid)}
      </text>
      <text className="baseline-hanging" x={textX} y={textY + lineHeight * 2}>
        Principal paid: {formatCurrency(yearData.principalPaid)}
      </text>
      <text className="baseline-hanging" x={textX} y={textY + lineHeight * 3}>
        Principal remaining: {formatCurrency(yearData.endingPrincipal)}
      </text>
    </>
  );
};

export default HoverBox;
