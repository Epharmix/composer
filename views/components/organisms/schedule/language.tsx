import React from 'react';
import { RadioGroup } from 'blueprint-form';

const SelectLanguage = (): JSX.Element => {
  return (
    <RadioGroup
      label="Language"
      name="language"
      options={[{
        label: 'English',
        value: 'en'
      }, {
        label: 'Spanish',
        value: 'es'
      }]}
      inline
    />
  );
};

export default SelectLanguage;
