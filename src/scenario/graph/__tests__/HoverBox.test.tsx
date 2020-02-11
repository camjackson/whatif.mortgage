import React from 'react';
import { mount } from 'enzyme';
import HoverBox from '../HoverBox';

describe('HoverBox', () => {
  const renderHoverBox = () => {
    const yearData = {
      interestPaid: 123,
      principalPaid: 456,
      endingPrincipal: 654321,
    };
    return mount(
      <svg>
        <HoverBox
          graphWidthPx={500}
          yearData={yearData}
          yearNumber={13}
          shouldGraphOffset={false}
        />
      </svg>,
    );
  };

  it('positions the box at its coords', () => {
    const hoverBox = renderHoverBox();

    const rect = hoverBox.find('rect');
    expect(rect).toHaveProp('x', 299);
    expect(rect).toHaveProp('y', 1);
  });

  it('positions the text at offsets from the box', () => {
    const hoverBox = renderHoverBox();
    const texts = hoverBox.find('text');

    expect(texts).toHaveLength(4);
    expect(texts.at(0)).toHaveProp('x', 309);
    expect(texts.at(0)).toHaveProp('y', 9);
    expect(texts.at(1)).toHaveProp('x', 309);
    expect(texts.at(1)).toHaveProp('y', 29);
    expect(texts.at(2)).toHaveProp('x', 309);
    expect(texts.at(2)).toHaveProp('y', 49);
    expect(texts.at(3)).toHaveProp('x', 309);
    expect(texts.at(3)).toHaveProp('y', 69);
  });

  it('shows the interest paid, principal paid, and ending principal', () => {
    const hoverBox = renderHoverBox();
    expect(hoverBox).toIncludeText('Year 13:');

    // Be careful, the next three lines have mystery characters after the 'USD'
    expect(hoverBox).toIncludeText('Interest paid: $123');
    expect(hoverBox).toIncludeText('Principal paid: $456');
    expect(hoverBox).toIncludeText('Principal remaining: $654k');
  });
});
