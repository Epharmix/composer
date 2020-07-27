import React from 'react';
import { StartDateInput, EndDateInput, MarkupProps, useFormContext } from 'blueprint-form';

import { Row, Col } from '@grid';
import ScheduleRepeat from './repeat';
import SelectTime from './time';
import Timezone from './timezone';
import Weekday from './weekday';

export interface ScheduleProps extends MarkupProps {
  label?: never;
  name?: never;
}

export enum ScheduleMode {
  Day = 'D',
  Week = 'W'
}

export interface ScheduleData {
  start: Date;
  end?: Date;
  time: string;
  tz: string;
  mode: ScheduleMode;
  step: number;
  days?: number[];
}

const Schedule = ({ large, disabled }: ScheduleProps): JSX.Element => {
  const { values } = useFormContext<ScheduleData>();
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <StartDateInput
            label="Start Date"
            name="start"
            large={large}
            fill
            required
            disabled={disabled}
          />
        </Col>
        <Col sm={12}>
          <EndDateInput
            label="End Date"
            name="end"
            large={large}
            fill
            disabled={disabled}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <SelectTime
            label="Time of Day"
            name="time"
            large={large}
            fill
            disabled={disabled}
          />
        </Col>
        <Col sm={12}>
          <Timezone
            label="Timezone"
            name="tz"
            large={large}
            fill
            disabled={disabled}
          />
        </Col>
      </Row>
      <ScheduleRepeat 
        large={large}
        disabled={disabled}
      />
      {values.mode === ScheduleMode.Week && (
        <Weekday
          name="days"
          inline
          large={large}
          disabled={disabled}
        />
      )}
    </React.Fragment>
  );
};

export default Schedule;
