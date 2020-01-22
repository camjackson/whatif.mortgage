import React, { FC } from 'react';
import { formatCurrency } from '../../formatting';
import LoanPeriod from '../../math/LoanPeriod';

const boxWidth = 200;
const lineHeight = 20;

type Props = {
  graphWidthPx: number;
  yearData: LoanPeriod;
  yearNumber: number;
  shouldGraphOffset: boolean;
};

const Text = ({ color = '', ...props }) => (
  <text className={`baseline-hanging fill-current ${color}`} {...props} />
);

const HoverBox: FC<Props> = ({
  graphWidthPx,
  yearData,
  yearNumber,
  shouldGraphOffset,
}) => {
  const boxHeight = shouldGraphOffset ? 115 : 95;

  const boxX = graphWidthPx - boxWidth - 1;
  const boxY = 1;
  const textX = boxX + 10;
  const textY = boxY + 8;

  return (
    <>
      <rect
        className="text-black stroke-current fill-white"
        x={boxX}
        y={boxY}
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
      {shouldGraphOffset && (
        <Text color="text-blue-700" x={textX} y={textY + lineHeight * 4}>
          Saved offset: {formatCurrency(yearData.totalSavedOffset)}
        </Text>
      )}
    </>
  );
};

export default HoverBox;
