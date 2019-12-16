import React, { FC } from 'react';
import styled from 'styled-components';
import { formatCurrency } from '../formatting';
import LoanPeriod from '../math/LoanPeriod';

const boxWidth = 250;
const boxHeight = 95;
const mouseOffset = 20;
const textMargin = 10;
const textHeight = 16;
const lineHeight = 20;

const Box = styled.rect`
  fill: white;
  stroke: black;
`;

const Text = styled.text`
  dominant-baseline: hanging;
  font-size: ${textHeight}px;
`;

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
      <Box x={boxX} y={boxY} width={boxWidth} height={boxHeight} />
      <Text x={textX} y={textY}>
        Year {yearNumber}:
      </Text>
      <Text x={textX} y={textY + lineHeight}>
        Interest paid: {formatCurrency(yearData.interestPaid)}
      </Text>
      <Text x={textX} y={textY + lineHeight * 2}>
        Principal paid: {formatCurrency(yearData.principalPaid)}
      </Text>
      <Text x={textX} y={textY + lineHeight * 3}>
        Principal remaining: {formatCurrency(yearData.endingPrincipal)}
      </Text>
    </>
  );
};

export default HoverBox;
