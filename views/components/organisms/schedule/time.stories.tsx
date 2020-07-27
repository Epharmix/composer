import React from 'react';
import { StoryFn } from '@storybook/addons';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Form, FormInstance } from 'blueprint-form';
import SelectTime from './time';

export default {
  component: SelectTime,
  title: 'Organisms/Schedule/Time',
  decorators: [
    (storyFn: StoryFn): JSX.Element => {
      interface TimeData {
        time: string;
      }
      const form = new FormInstance<TimeData>({
        time: '09:00'
      });
      return (
        <Form form={form} onSubmit={() => void(0)}>{storyFn() as JSX.Element}</Form>
      );
    }
  , withKnobs]
};

export const defaultView = (): JSX.Element => (
  <div style={{ width: '250px' }}>
    <SelectTime
      name="time"
      disabled={boolean('disabled', false)}
    />
  </div>
);
