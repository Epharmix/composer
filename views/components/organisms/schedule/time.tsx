import React, { useRef, useEffect } from 'react';
import { HTMLSelect, FormGroup } from '@blueprintjs/core';
import { Markup, useField, MarkupProps } from 'blueprint-form';
import moment from 'moment-timezone';

import { Row, Col } from '@grid';

export enum TimeFormat {
  HOUR_24 = 'HH:mm',
  HOUR_12 = 'hh:mmA'
}

export interface SelectTimeProps extends MarkupProps {
  format?: TimeFormat;
}

interface Option {
  label: string;
  value: string;
}

const GetOptions = (values: string[]): Option[] => {
  return values.map((value) => ({
    label: value,
    value: value
  }));
};

const HOURS = GetOptions(Array.from(Array(12).keys()).map((hour) => String(hour).padStart(2, '0')));
const MINUTES = GetOptions(['00', '15', '30', '45']);
const AM_PM = GetOptions(['AM', 'PM']);

/**
 * Single time select input
 */
const SelectTime = ({ label, name, format, large, disabled }: SelectTimeProps): JSX.Element => {
  format = format || TimeFormat.HOUR_24;
  const [field, _, helpers] = useField<string>({
    name: name
  });
  let time: moment.Moment;
  if (field.value) {
    time = moment(field.value, format);
  }
  const id = Markup.getID();
  const hourRef = useRef<HTMLSelectElement>(null);
  const minuteRef = useRef<HTMLSelectElement>(null);
  const ampmRef = useRef<HTMLSelectElement>(null);
  // Apply the aria label for the time component selects
  useEffect(() => {
    if (hourRef.current) {
      hourRef.current.setAttribute('aria-label', 'hour');
    }
    if (minuteRef.current) {
      minuteRef.current.setAttribute('aria-label', 'minute');
    }
    if (ampmRef.current) {
      ampmRef.current.setAttribute('aria-label', 'am or pm');
    }
  }, []);
  // Listen for changes
  const onHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const time = moment(field.value, format);
    const hour = parseInt(event.currentTarget.value, 10);
    // Selection is in 12 hour time, parse it so it spits out the correct 24 hour number
    const timeString = `${hour}:${time.format('mm')}:${time.format('A')}`;
    const _time = moment(timeString, TimeFormat.HOUR_12);
    helpers.setValue(_time.format(format));
    helpers.setTouched(true);
  };
  const onMinuteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const time = moment(field.value, format);
    const minute = parseInt(event.currentTarget.value, 10);
    time.minute(minute);
    helpers.setValue(time.format(format));
    helpers.setTouched(true);
  };
  const onAMPMChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const time = moment(field.value, format);
    const apm = event.currentTarget.value;
    // Selection is in 12 hour time, parse it so it spits out the correct 24 hour number
    const timeString = `${time.format('hh')}:${time.format('mm')}:${apm}`;
    const _time = moment(timeString, TimeFormat.HOUR_12);
    helpers.setValue(_time.format(format));
    helpers.setTouched(true);
  };
  // Abnormal hour warning
  const getAbnormalWarning = (): string => {
    let warning: string = null;
    if (time && (time.hour() < 8 || time.hour() > 20)) {
      warning = 'This is outside normal waking hours.';
    } 
    return warning;
  };
  // Get proper intent and warning
  const warning = getAbnormalWarning();
  const intent = warning ? 'warning' : 'none';
  return (
    <FormGroup
      label={label}
      labelFor={id}
      intent={intent}
      helperText={warning}
    >
      <Row gutterWidth={8}>
        <Col xs={8}>
          <HTMLSelect
            elementRef={(ref) => hourRef.current = ref}
            options={HOURS}
            onChange={onHourChange}
            value={time?.format('hh')}
            fill
            large={large}
            disabled={disabled}
          />
        </Col>
        <Col xs={2}>
          <span>:</span>
        </Col>
        <Col xs={8}>
          <HTMLSelect
            elementRef={(ref) => minuteRef.current = ref}
            options={MINUTES}
            onChange={onMinuteChange}
            value={time?.format('mm')}
            fill
            large={large}
            disabled={disabled}
          />
        </Col>
        <Col xs={6}>
          <HTMLSelect
            elementRef={(ref) => ampmRef.current = ref}
            options={AM_PM}
            onChange={onAMPMChange}
            value={time?.format('A')}
            fill
            large={large}
            disabled={disabled}
          />
        </Col>
      </Row>
      <input id={id} type="hidden" name={name} value={field.value} />
    </FormGroup>
  );
};

export default SelectTime;
