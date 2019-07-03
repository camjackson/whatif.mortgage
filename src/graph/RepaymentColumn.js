import React from 'react';
import styled from 'styled-components';

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

const RepaymentColumn = ({ graphMaxValue, yearData, x, width }) => {
  const endingPrincipalHeight =
    (yearData.endingPrincipal / graphMaxValue) * 100;
  const endingPrincipalY = 100 - endingPrincipalHeight;

  const principalPaidHeight = (yearData.principalPaid / graphMaxValue) * 100;
  const principalPaidY = endingPrincipalY - principalPaidHeight;

  const interestPaidHeight = (yearData.interestPaid / graphMaxValue) * 100;
  const interestPaidY = principalPaidY - interestPaidHeight;

  return (
    <>
      <EndingPrincipalRect
        x={x}
        y={`${endingPrincipalY}%`}
        height={`${endingPrincipalHeight}%`}
        width={width}
      />
      <PrincipalPaidRect
        x={x}
        y={`${principalPaidY}%`}
        height={`${principalPaidHeight}%`}
        width={width}
      />
      <InterestPaidRect
        x={x}
        y={`${interestPaidY}%`}
        height={`${interestPaidHeight}%`}
        width={width}
      />
    </>
  );
};

export default RepaymentColumn;
