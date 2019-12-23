import React, { FC } from 'react';
import { formatCurrency } from '../../formatting';
import LoanPeriod from '../../math/LoanPeriod';
import { Coords } from '../../math/Coords';

export const boxWidth = 250;
export const boxHeight = 95;
const textMargin = 10;
const lineHeight = 20;

type Props = {
  coords: Coords;
  yearData: LoanPeriod;
  yearNumber: number;
};

const HoverBox: FC<Props> = ({ coords, yearData, yearNumber }) => {
  const textX = coords.x + textMargin;
  const textY = coords.y + textMargin;

  return (
    <>
      <rect
        className="text-black stroke-current fill-white"
        x={coords.x}
        y={coords.y}
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
