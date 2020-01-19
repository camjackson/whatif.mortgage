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
  showBackground: boolean;
  isFocussed: boolean;
  onMouseEnter: (e) => any;
  onClick: (e) => void;
};

const RepaymentColumn: FC<Props> = ({
  graphMaxValue,
  graphBodyHeightPc,
  yearData,
  x,
  width,
  showBackground,
  isFocussed,
  onMouseEnter,
  onClick,
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

  const fillColours = isFocussed
    ? {
        endingPrincipal: 'text-pink-500',
        principalPaid: 'text-purple-500',
        interestPaid: 'text-green-500',
      }
    : {
        endingPrincipal: 'text-pink-300',
        principalPaid: 'text-purple-300',
        interestPaid: 'text-green-300',
      };

  const commonProps = {
    x,
    width,
    onMouseEnter,
  };

  return (
    <>
      {showBackground && (
        <rect
          {...commonProps}
          className="fill-current text-gray-300"
          y="0"
          height={`${graphBodyHeightPc}%`}
        />
      )}
      <rect
        {...commonProps}
        className={`fill-current cursor-pointer ${fillColours.endingPrincipal}`}
        onClick={onClick}
        y={`${endingPrincipalYPc}%`}
        height={`${endingPrincipalHeightPc}%`}
      />
      <rect
        {...commonProps}
        className={`fill-current cursor-pointer ${fillColours.principalPaid}`}
        onClick={onClick}
        y={`${principalPaidYPc}%`}
        height={`${principalPaidHeightPc}%`}
      />
      <rect
        {...commonProps}
        className={`fill-current cursor-pointer ${fillColours.interestPaid}`}
        onClick={onClick}
        y={`${interestPaidYPc}%`}
        height={`${interestPaidHeightPc}%`}
      />
      <rect
        {...commonProps}
        className="fill-none stroke-current text-gray-500"
        y={`${interestPaidYPc}%`}
        height={`${wholeColumnHeightPc}%`}
      />
    </>
  );
};

export default RepaymentColumn;
