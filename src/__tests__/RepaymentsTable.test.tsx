import React from 'react';
import RepaymentsTable from '../RepaymentsTable';
import LoanPeriod from '../math/LoanPeriod';

describe('RepaymentsTable', () => {
  it('renders the periods row by row', () => {
    const years: LoanPeriod[] = [
      new LoanPeriod(45, 180, 820),
      new LoanPeriod(35, 190, 630),
      new LoanPeriod(25, 200, 430),
      new LoanPeriod(15, 210, 220),
      new LoanPeriod(5, 220, 0),
    ];
    const table = mount(<RepaymentsTable years={years} />);
    const bodyRows = table.find('tbody').find('tr');

    expect(bodyRows).toHaveLength(5);

    const firstRowContents = ['1', '$45', '$180', '$820'];
    expect(bodyRows.at(0)).toHaveText(firstRowContents.join(''));
  });
});
