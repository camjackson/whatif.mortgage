import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
`;

const BlurryTextInput = ({
  label,
  labelAfter,
  defaultValue,
  onBlur,
  readOnly,
}) => (
  <Label>
    {label}
    <input
      type="text"
      defaultValue={defaultValue}
      onBlur={readOnly ? null : event => onBlur(event.target.value)}
      readOnly={readOnly}
    />
    {labelAfter}
  </Label>
);

export default BlurryTextInput;
