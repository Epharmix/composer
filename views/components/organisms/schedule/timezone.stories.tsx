import React from 'react';
import { StoryFn } from '@storybook/addons';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Form, FormInstance } from 'blueprint-form';
import Timezone from './timezone';
import { GetCurrentTZ } from '@libs/time';

export default {
  component: Timezone,
  title: 'Organisms/Schedule/Timezone',
  decorators: [
    (storyFn: StoryFn): JSX.Element => {
      interface TimezoneData {
        tz: string;
      }
      const form = new FormInstance<TimezoneData>({
        tz: GetCurrentTZ()
      });
      return (
        <Form form={form} onSubmit={() => void(0)}>{storyFn() as JSX.Element}</Form>
      );
    }
  , withKnobs]
};

export const defaultView = (): JSX.Element => (
  <Timezone
    name="tz"
    disabled={boolean('disabled', false)}
  />
);
