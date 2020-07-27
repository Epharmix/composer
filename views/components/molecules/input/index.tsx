import React from 'react';
import { TextInput, TextInputProps } from 'blueprint-form';

const Input: React.FC<TextInputProps> = ({ className, ...props }) => {
  return (
    <TextInput
      className={`rounded-none-input ${className}`}
      {...props}
    />
  );
};

export default Input;
