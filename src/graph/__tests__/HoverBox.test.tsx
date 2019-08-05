import React from 'react';
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

    hoverBox = mount(
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
    const rect = hoverBox.find('rect');
    expect(rect).toHaveProp('x', 43);
    expect(rect).toHaveProp('y', 27);
  });

  it('positions the text at offsets from the box', () => {
    const texts = hoverBox.find('text');

    expect(texts).toHaveLength(4);
    expect(texts.at(0)).toHaveProp('x', 53);
    expect(texts.at(0)).toHaveProp('y', 37);
    expect(texts.at(1)).toHaveProp('x', 53);
    expect(texts.at(1)).toHaveProp('y', 57);
    expect(texts.at(2)).toHaveProp('x', 53);
    expect(texts.at(2)).toHaveProp('y', 77);
    expect(texts.at(3)).toHaveProp('x', 53);
    expect(texts.at(3)).toHaveProp('y', 97);
  });

  it('shows the interest paid, principal paid, and ending principal', () => {
    expect(hoverBox).toIncludeText('Year 13:');

    // Be careful, the next three lines have mystery characters after the 'USD'
    expect(hoverBox).toIncludeText('Interest paid: USD 123');
    expect(hoverBox).toIncludeText('Principal paid: USD 456');
    expect(hoverBox).toIncludeText('Principal remaining: USD 654,321');
  });
});
