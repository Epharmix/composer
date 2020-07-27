import React from 'react';
import { RadioGroup } from 'blueprint-form';

const SelectMethod = (): JSX.Element => {
  return (
    <RadioGroup
      label="Communication Method"
      name="method"
      options={[{
        label: 'Text Message',
        value: 'message'
      }, {
        label: 'Phone Call',
        value: 'call'
      }]}
      inline
    />
  );
};

export default SelectMethod;
