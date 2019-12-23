import React, { FC } from 'react';
import { formatCurrency } from '../../formatting';
import LoanPeriod from '../../math/LoanPeriod';
import { Coords } from '../../math/Coords';

export const boxWidth = 250;
export const boxHeight = 95;
const lineHeight = 20;

type Props = {
  coords: Coords;
  yearData: LoanPeriod;
  yearNumber: number;
};

const Text = ({ color = '', ...props }) => (
  <text className={`baseline-hanging fill-current ${color}`} {...props} />
);

const HoverBox: FC<Props> = ({ coords, yearData, yearNumber }) => {
  const textX = coords.x + 10;
  const textY = coords.y + 8;

  return (
    <>
      <rect
        className="text-black stroke-current fill-white"
        x={coords.x}
        y={coords.y}
        width={boxWidth}
        height={boxHeight}
      />
      <Text x={textX} y={textY}>
        Year {yearNumber}:
      </Text>
      <Text color="text-green-600" x={textX} y={textY + lineHeight}>
        Interest paid: {formatCurrency(yearData.interestPaid)}
      </Text>
      <Text color="text-purple-600" x={textX} y={textY + lineHeight * 2}>
        Principal paid: {formatCurrency(yearData.principalPaid)}
      </Text>
      <Text color="text-pink-600" x={textX} y={textY + lineHeight * 3}>
        Principal remaining: {formatCurrency(yearData.endingPrincipal)}
      </Text>
    </>
  );
};

export default HoverBox;
