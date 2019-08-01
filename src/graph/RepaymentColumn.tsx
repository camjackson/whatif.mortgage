import React, { FunctionComponent as FC } from 'react';
import styled from 'styled-components';
import { LoanPeriod } from '../calculateLoanPeriods';

// -----
// |   |
// |   | interestPaidHeight
// |   |
// |---| interestPaidY
// |   |
// |   | interestPaidHeight
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
  yearData: LoanPeriod;
  x: string; // Percentage
  width: string; // Percentage
  onMouseEnter: (e) => any;
};

const RepaymentColumn: FC<Props> = ({
  graphMaxValue,
  yearData,
  x,
  width,
  onMouseEnter,
}) => {
  const endingPrincipalHeight =
    (yearData.endingPrincipal / graphMaxValue) * 100;
  const endingPrincipalY = 100 - endingPrincipalHeight;

  const principalPaidHeight = (yearData.principalPaid / graphMaxValue) * 100;
  const principalPaidY = endingPrincipalY - principalPaidHeight;

  const interestPaidHeight = (yearData.interestPaid / graphMaxValue) * 100;
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
