import React from 'react';
import { Checkbox as BFCheckbox, CheckboxProps } from 'blueprint-form';

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <BFCheckbox {...props} />
  );
};

export default Checkbox;
