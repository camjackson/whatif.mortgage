import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  font-size: 30px;
`;

const Input = styled.input`
  font-size: inherit;
`;

// TODO: Cleanup
const BlurryNumberInput = ({
  label,
  labelAfter = undefined,
  defaultValue = undefined,
  value = undefined,
  onBlur = undefined,
  readOnly = false,
  min = undefined,
  max = undefined,
  step = undefined,
}) => (
  <Label>
    {label}
    <Input
      type="number"
      defaultValue={defaultValue}
      value={value}
      onBlur={readOnly ? null : onBlur}
      readOnly={readOnly}
      min={min}
      max={max}
      step={step}
    />
    {labelAfter}
  </Label>
);

export default BlurryNumberInput;
