import React from 'react';
import { StoryFn } from '@storybook/addons';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Form, FormInstance } from 'blueprint-form';
import ScheduleRepeat from './repeat';

export default {
  component: ScheduleRepeat,
  title: 'Organisms/Schedule/Repeat',
  decorators: [
    (storyFn: StoryFn): JSX.Element => {
      interface RepeatData {
        mode: string;
        step: number;
      }
      const form = new FormInstance<RepeatData>({
        mode: 'D',
        step: 2
      });
      return (
        <Form form={form} onSubmit={() => void(0)}>{storyFn() as JSX.Element}</Form>
      );
    }
  , withKnobs]
};

export const defaultView = (): JSX.Element => (
  <div style={{ width: '500px' }}>
    <ScheduleRepeat
      large={boolean('large', false)}
      disabled={boolean('disabled', false)}
    />
  </div>
);
