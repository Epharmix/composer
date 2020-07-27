import React from 'react';
import {
  CheckboxGroup,
  MarkupProps
} from 'blueprint-form';

export interface WeekdayProps extends MarkupProps {
  abbreviated?: boolean;
  inline?: boolean;
  numItems?: number;
  minItems?: number;
  maxItems?: number;
}

const WEEKDAYS = [{
  label: 'Sunday',
  value: 0
}, {
  label: 'Monday',
  value: 1
}, {
  label: 'Tuesday',
  value: 2
}, {
  label: 'Wednesday',
  value: 3
}, {
  label: 'Thursday',
  value: 4
}, {
  label: 'Friday',
  value: 5
}, {
  label: 'Saturday',
  value: 6
}];

const WEEKDAYS_ABBR = WEEKDAYS.map((entry) => ({
  label: entry.label.substring(0, 3),
  value: entry.value
}));

const GetDayString = (n: number): string => {
  let output = `${n} Days`;
  if (n === 1) {
    output = '1 Day';
  }
  return output;
};

const Weekday = ({ label, name, abbreviated, inline, large, disabled, numItems, minItems, maxItems }: WeekdayProps): JSX.Element => {
  if (!label) {
    label = 'Select ';
    if (numItems) {
      label += GetDayString(numItems);
    } else if (minItems && maxItems) {
      label += `${minItems} - ${maxItems} Days`;
    } else if (minItems) {
      label += `at Least ${GetDayString(minItems)}`;
    } else if (maxItems) {
      label += `at Most ${GetDayString(maxItems)}`;
    } else {
      label += 'Days';
    }
    label +=' of the Week';
  }
  name = name || 'days';
  return (
    <div className="bp3-weekday">
      <CheckboxGroup
        label={label}
        name={name}
        inline={inline}
        large={large}
        disabled={disabled}
        numItems={numItems}
        minItems={minItems}
        maxItems={maxItems}
        options={abbreviated ? WEEKDAYS_ABBR : WEEKDAYS}
      />
    </div>
  );
};

export default Weekday;
