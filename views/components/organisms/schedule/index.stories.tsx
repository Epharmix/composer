import React from 'react';
import { StoryFn } from '@storybook/addons';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Form, FormInstance } from 'blueprint-form';
import Schedule, { ScheduleData, ScheduleMode } from './index';
import { GetCurrentTZ } from '@libs/time';

export default {
  component: Schedule,
  title: 'Organisms/Schedule/Schedule',
  decorators: [
    (storyFn: StoryFn): JSX.Element => {
      const form = new FormInstance<ScheduleData>({
        start: new Date(),
        end: null,
        time: '10:30',
        tz: GetCurrentTZ(),
        mode: ScheduleMode.Day,
        step: 2,
        days: []
      });
      return (
        <Form form={form} onSubmit={() => void(0)}>{storyFn() as JSX.Element}</Form>
      );
    }
  , withKnobs]
};

export const defaultView = (): JSX.Element => (
  <div style={{ width: '800px' }}>
    <Schedule
      large={boolean('large', false)}
      disabled={boolean('disabled', false)}
    />
  </div>
);
