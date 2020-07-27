import React from 'react';
import { SelectInput, MarkupProps } from 'blueprint-form';

import { TIMEZONES } from '@libs/time';

const TIMEZONE_OPTIONS = ((TIMEZONES).map((tz) => ({
  label: tz,
  value: tz
})));

const Timezone = ({ label, name, large, fill, disabled }: MarkupProps): JSX.Element => {
  label = label || 'Timezone';
  return (
    <SelectInput
      label={label}
      name={name}
      large={large}
      fill={fill}
      disabled={disabled}
      options={TIMEZONE_OPTIONS}
    />
  );
};

export default Timezone;
