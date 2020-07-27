import React, { useState } from 'react';
import { Radio, HTMLSelect, FormGroup } from '@blueprintjs/core';
import { useField, MarkupProps } from 'blueprint-form';

import { Row, Col } from '@grid';

export interface ScheduleRepeatProps extends MarkupProps {
  name?: never;
  modes?: {
    day?: string;
    week?: string;
  };
}

const GetOptions = (steps: number[], word: string) => {
  return steps.map((i) => ({
    label: `Every ${i === 0 ? '' : String(i + 1) + ' '}${i === 0 ? word : word + 's'}`,
    value: String(i + 1)
  }));
};

const DAY_STEPS = GetOptions(Array.from(Array(14).keys()), 'day');
const WEEK_STEPS = GetOptions(Array.from(Array(10).keys()), 'week');

const ScheduleRepeat = ({ label, modes, large, disabled }: ScheduleRepeatProps): JSX.Element => {
  label = label || 'Repeat Schedule';
  const dayMode = modes?.day || 'D';
  const weekMode = modes?.week || 'W';
  // Setup the fields
  const [modeField, _modeMeta, modeHelpers] = useField<string>({
    name: 'mode'
  });
  const [stepField, _stepMeta, stepHelpers] = useField<number>({
    name: 'step'
  });
  // Set up internal step states
  const [dayStep, setDayStep] = useState(modeField.value === dayMode ? stepField.value : 1);
  const [weekStep, setWeekStep] = useState(modeField.value === weekMode ? stepField.value : 1);
  // Create change handlers
  const onModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mode = event.currentTarget.value;
    modeHelpers.setValue(mode);
    modeHelpers.setTouched(true);
  };
  const onDayStepChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const step = parseInt(event.currentTarget.value, 10);
    setDayStep(step);
    // Switch to day mode if not already
    if (modeField.value !== dayMode) {
      modeHelpers.setValue(dayMode);
      modeHelpers.setTouched(true);
    }
    // Update the step field
    stepHelpers.setValue(step);
    stepHelpers.setTouched(true);
  };
  const onWeekStepChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const step = parseInt(event.currentTarget.value, 10);
    setWeekStep(step);
    // Switch to week mode if not already
    if (modeField.value !== weekMode) {
      modeHelpers.setValue(weekMode);
      modeHelpers.setTouched(true);
    }
    // Update the step field
    stepHelpers.setValue(step);
    stepHelpers.setTouched(true);
  };
  return (
    <FormGroup
      label={label}
    >
      <Row>
        <Col xs={12}>
          <Radio
            className="ma-0-important"
            name="mode"
            large={large}
            disabled={disabled}
            value={dayMode}
            checked={modeField.value === dayMode}
            onChange={onModeChange}
          >
            <HTMLSelect
              name="dayStep"
              options={DAY_STEPS}
              fill
              large={large}
              disabled={disabled}
              value={String(dayStep)}
              onChange={onDayStepChange}
            />
          </Radio>
        </Col>
        <Col xs={12}>
          <Radio
            className="ma-0-important"
            name="mode"
            large={large}
            disabled={disabled}
            value={weekMode}
            checked={modeField.value === weekMode}
            onChange={onModeChange}
          >
            <HTMLSelect
              name="weekStep"
              options={WEEK_STEPS}
              fill
              large={large}
              disabled={disabled}
              value={String(weekStep)}
              onChange={onWeekStepChange}
            />
          </Radio>
        </Col>
        <input aria-label="step" type="hidden" name="step" value={String(stepField.value)} />
      </Row>
    </FormGroup>
  );

};

export default ScheduleRepeat;
