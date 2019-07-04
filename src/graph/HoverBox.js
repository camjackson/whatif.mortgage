import React from 'react';
import styled from 'styled-components';
import formatCurrency from '../formatCurrency';

const boxWidth = 250;
const boxHeight = 95;
const mouseOffset = 20;

const Box = styled.rect`
  fill: white;
  stroke: black;
`;

const textMargin = 10;
const textHeight = 16;
const lineHeight = 20; // Idk why this needs to be so large
const Text = styled.text`
  dominant-baseline: hanging;
  font-size: ${textHeight}px;
`;

const HoverBox = ({
  mouseCoords,
  graphWidthPx,
  graphHeightPx,
  yearData,
  yearNumber,
}) => {
  const boxX = mouseCoords.x + 20;
  const boxY = mouseCoords.y - 20;
  const textX = boxX + textMargin;
  const textY = boxY + textMargin;

  return (
    <>
      <Box x={boxX} y={boxY} width={boxWidth} height={boxHeight} />
      <Text x={textX} y={textY}>
        Year {yearNumber}:
      </Text>
      <Text x={boxX + textMargin} y={textY + lineHeight}>
        Interest paid: {formatCurrency(yearData.interestPaid)}
      </Text>
      <Text x={boxX + textMargin} y={textY + lineHeight * 2}>
        Principal paid: {formatCurrency(yearData.principalPaid)}
      </Text>
      <Text x={boxX + textMargin} y={textY + lineHeight * 3}>
        Principal remaining: {formatCurrency(yearData.endingPrincipal)}
      </Text>
    </>
  );
};

export default HoverBox;
