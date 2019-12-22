import React from 'react';

const Form = ({ className = '', ...props }) => (
  <form className={`text-4xl font-thin ${className}`} {...props} />
);

export default Form;
