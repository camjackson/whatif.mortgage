import React, { FC } from 'react';
import LoanPeriod from '../../math/LoanPeriod';

// ----- interestPaidYPc
// |   |
// |   | interestPaidHeightPc
// |   |
// |---| prinpalPaidY
// |   |
// |   | principalPaidHeightPc
// |   |
// |---| endingPrincipalYPc
// |   |
// |   |
// |   | endingPrincipalHeightPc
// |   |
// |   |
// |   |
// -----

type Props = {
  graphMaxValue: number;
  graphBodyHeightPc: number;
  yearData: LoanPeriod;
  x: string; // Percentage
  width: string; // Percentage
  onMouseEnter: (e) => any;
};

const RepaymentColumn: FC<Props> = ({
  graphMaxValue,
  graphBodyHeightPc,
  yearData,
  x,
  width,
  onMouseEnter,
}) => {
  const endingPrincipalHeightPc =
    (yearData.endingPrincipal / graphMaxValue) * graphBodyHeightPc;
  const endingPrincipalYPc = graphBodyHeightPc - endingPrincipalHeightPc;

  const principalPaidHeightPc =
    (yearData.principalPaid / graphMaxValue) * graphBodyHeightPc;
  const principalPaidYPc = endingPrincipalYPc - principalPaidHeightPc;

  const interestPaidHeightPc =
    (yearData.interestPaid / graphMaxValue) * graphBodyHeightPc;
  const interestPaidYPc = principalPaidYPc - interestPaidHeightPc;

  const wholeColumnHeightPc =
    endingPrincipalHeightPc + principalPaidHeightPc + interestPaidHeightPc;

  const commonProps = {
    x,
    width,
    onMouseEnter,
  };

  return (
    <>
      <rect
        {...commonProps}
        className="fill-current text-pink-300"
        y={`${endingPrincipalYPc}%`}
        height={`${endingPrincipalHeightPc}%`}
      />
      <rect
        {...commonProps}
        className="fill-current text-purple-300"
        y={`${principalPaidYPc}%`}
        height={`${principalPaidHeightPc}%`}
      />
      <rect
        {...commonProps}
        className="fill-current text-green-300"
        y={`${interestPaidYPc}%`}
        height={`${interestPaidHeightPc}%`}
      />
      <rect
        {...commonProps}
        className="fill-none stroke-current text-gray-500"
        height={`${wholeColumnHeightPc}%`}
        y={`${interestPaidYPc}%`}
      />
    </>
  );
};

export default RepaymentColumn;
