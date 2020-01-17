import React from 'react';
import GridLines from '../GridLines';

describe('GridLines', () => {
  let lines;
  let texts;

  beforeEach(() => {
    const gridLines = mount(
      <svg>
        <GridLines
          interval={100000}
          maxValue={500000}
          graphGutterWidthPx={50}
          graphBodyHeightPc={90}
          graphBodyWidthPc={95}
        />
      </svg>,
    );
    lines = gridLines.find('line');
    texts = gridLines.find('text');
  });

  it('has the right number of lines and labels', () => {
    expect(lines).toHaveLength(4);
    expect(texts).toHaveLength(4);
  });

  it('renders the right text labels', () => {
    expect(texts.at(0)).toHaveText(`$100k`);
    expect(texts.at(1)).toHaveText(`$200k`);
    expect(texts.at(2)).toHaveText(`$300k`);
    expect(texts.at(3)).toHaveText(`$400k`);
  });

  it('renders the lines across the width of the graph', () => {
    lines.forEach(line => {
      expect(line).toHaveProp({
        x1: '5%',
        x2: '100%',
      });
    });
  });

  it('renders the lines and texts at the right heights', () => {
    expect(texts.at(0)).toHaveProp('y', '72%');
    expect(lines.at(0)).toHaveProp({ y1: '72%', y2: '72%' });
    expect(texts.at(1)).toHaveProp('y', '54%');
    expect(lines.at(1)).toHaveProp({ y1: '54%', y2: '54%' });
    expect(texts.at(2)).toHaveProp('y', '36%');
    expect(lines.at(2)).toHaveProp({ y1: '36%', y2: '36%' });
    expect(texts.at(3)).toHaveProp('y', '18%');
    expect(lines.at(3)).toHaveProp({ y1: '18%', y2: '18%' });
  });
});
