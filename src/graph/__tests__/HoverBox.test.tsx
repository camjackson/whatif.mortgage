import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HoverBox from '../HoverBox';

describe('HoverBox', () => {
  let hoverBox;

  beforeEach(() => {
    const mouseCoords = { x: 23, y: 47 };
    const yearData = {
      interestPaid: 123,
      principalPaid: 456,
      endingPrincipal: 654321,
    };

    hoverBox = render(
      <svg>
        <HoverBox
          mouseCoords={mouseCoords}
          yearData={yearData}
          yearNumber={13}
        />
      </svg>,
    );
  });

  it('positions the box at an offset from the mouse', () => {
    const rect = hoverBox.container.querySelector('rect');
    expect(rect).toHaveAttribute('x', '43');
    expect(rect).toHaveAttribute('y', '27');
  });

  it('positions the text at offsets from the box', () => {
    const texts = hoverBox.container.querySelectorAll('text');

    expect(texts).toHaveLength(4);
    expect(texts[0]).toHaveAttribute('x', '53');
    expect(texts[0]).toHaveAttribute('y', '37');
    expect(texts[1]).toHaveAttribute('x', '53');
    expect(texts[1]).toHaveAttribute('y', '57');
    expect(texts[2]).toHaveAttribute('x', '53');
    expect(texts[2]).toHaveAttribute('y', '77');
    expect(texts[3]).toHaveAttribute('x', '53');
    expect(texts[3]).toHaveAttribute('y', '97');
  });

  it('shows the interest paid, principal paid, and ending principal', () => {
    hoverBox.getByText('Year 13:');
    hoverBox.getByText('Interest paid: USD 123');
    hoverBox.getByText('Principal paid: USD 456');
    hoverBox.getByText('Principal remaining: USD 654,321');
  });
});
