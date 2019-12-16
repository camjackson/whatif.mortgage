import React, { FC } from 'react';
import styled from 'styled-components';
import LoanPeriod from '../math/LoanPeriod';

// ----- interestPaidY
// |   |
// |   | interestPaidHeight
// |   |
// |---| prinpalPaidY
// |   |
// |   | principalPaidHeight
// |   |
// |---| endingPrincipalY
// |   |
// |   |
// |   | endingPrincipalHeight
// |   |
// |   |
// |   |
// -----

const EndingPrincipalRect = styled.rect`
  fill: pink;
  stroke: red;
`;

const PrincipalPaidRect = styled.rect`
  fill: purple;
`;

const InterestPaidRect = styled.rect`
  fill: green;
`;

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
  const endingPrincipalHeight =
    (yearData.endingPrincipal / graphMaxValue) * graphBodyHeightPc;
  const endingPrincipalY = graphBodyHeightPc - endingPrincipalHeight;

  const principalPaidHeight =
    (yearData.principalPaid / graphMaxValue) * graphBodyHeightPc;
  const principalPaidY = endingPrincipalY - principalPaidHeight;

  const interestPaidHeight =
    (yearData.interestPaid / graphMaxValue) * graphBodyHeightPc;
  const interestPaidY = principalPaidY - interestPaidHeight;

  const commonProps = {
    x,
    width,
    onMouseEnter,
  };

  return (
    <>
      <EndingPrincipalRect
        {...commonProps}
        y={`${endingPrincipalY}%`}
        height={`${endingPrincipalHeight}%`}
      />
      <PrincipalPaidRect
        {...commonProps}
        y={`${principalPaidY}%`}
        height={`${principalPaidHeight}%`}
      />
      <InterestPaidRect
        {...commonProps}
        y={`${interestPaidY}%`}
        height={`${interestPaidHeight}%`}
      />
    </>
  );
};

export default RepaymentColumn;
