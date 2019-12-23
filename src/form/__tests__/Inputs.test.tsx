import React from 'react';
import { mount } from 'enzyme';
import { LoanAmountInput } from '../Inputs';

describe('LoanAmountInput', () => {
  it('dynamically determines the step amount', () => {
    const testCases = [
      { value: 1000, step: 100 },
      { value: 900, step: 10 },
      { value: 890, step: 10 },
      { value: 327, step: 10 },
      { value: 1100, step: 100 },
      { value: 1234, step: 100 },
      { value: 123456, step: 10000 },
    ];

    testCases.forEach(testCase => {
      const input = mount(
        <LoanAmountInput value={testCase.value} onChange={() => {}} />,
      );
      expect(input.find('input')).toHaveProp({ step: testCase.step });
    });
  });
});
