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

const RepaymentColumn = ({
  graphMaxValue,
  yearData,
  x,
  width,
  onMouseEnter,
  onMouseLeave,
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
    onMouseLeave,
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
