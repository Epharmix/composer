import React from 'react';
import { StoryFn } from '@storybook/addons';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { Form, FormInstance } from 'blueprint-form';
import { Weekday } from '@organisms';

export default {
  component: Weekday,
  title: 'Organisms/Schedule/Weekday',
  decorators: [
    (storyFn: StoryFn): JSX.Element => {
      interface WeekdayData {
        days: number[];
      }
      const form = new FormInstance<WeekdayData>({
        days: []
      });
      return (
        <Form form={form} onSubmit={() => void(0)}>{storyFn() as JSX.Element}</Form>
      );
    }
  , withKnobs]
};

export const defaultView = (): JSX.Element => (
  <Weekday
    name="days"
    numItems={number('numItems', 3)}
    disabled={boolean('disabled', false)}
  />
);

export const minMaxItems = (): JSX.Element => (
  <Weekday
    name="days"
    minItems={number('minItems', 1)}
    maxItems={number('maxItems', 3)}
    disabled={boolean('disabled', false)}
  />
);

export const inlineView = (): JSX.Element => (
  <Weekday
    name="days"
    inline={boolean('inline', true)}
    disabled={boolean('disabled', false)}
  />
);
