import React from 'react';
import styled from 'styled-components';

const Main = styled.main`
  height: 100%;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;

const Row = styled.div`
  margin-bottom: 5px;
`;

const NumberInput = styled.input.attrs({
  type: 'number',
})`
  border: 0;
  border-bottom: 2px solid grey;
  font-size: inherit;
`;

const Button = styled.button.attrs({
  type: 'submit',
})`
  margin-top: 20px;
  background-color: #98e39e;
  border: 1px solid #076b07;
  border-radius: 3px;
  font-size: inherit;
  color: #076b07;
  cursor: pointer;
`;

const InitialInput = ({
  loanAmount,
  annualInterestRate,
  loanLengthInYears,
  setValue,
  finishInitialInput,
}) => {
  const loanAmountProps = {
    value: loanAmount,
    onChange: setValue('loanAmount'),
  };
  const interestRateProps = {
    value: annualInterestRate,
    onChange: setValue('annualInterestRate'),
  };
  const loanLengthProps = {
    value: loanLengthInYears,
    onChange: setValue('loanLengthInYears'),
  };
  return (
    <Main>
      <Row>
        I will borrow $
        <NumberInput
          min="0"
          max="10000000"
          step="1"
          style={{ width: 160 }}
          {...loanAmountProps}
        />
      </Row>
      <Row>
        at{' '}
        <NumberInput
          min="0"
          max="99"
          step="0.01"
          style={{ width: 100, textAlign: 'right' }}
          {...interestRateProps}
        />{' '}
        %p.a.,
      </Row>
      <Row>
        over{' '}
        <NumberInput
          min="0"
          max="99"
          step="1"
          style={{ width: 60 }}
          {...loanLengthProps}
        />{' '}
        years
      </Row>
      <Row>
        <Button onClick={finishInitialInput}>Calculate!</Button>
      </Row>
    </Main>
  );
};

export default InitialInput;
