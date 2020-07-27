import React from 'react';
import { action } from '@storybook/addon-actions';
import { Alert } from '@organisms';
import { StoryFn } from '@storybook/addons';

export default {
  component: Alert,
  title: 'Organisms/Alert',
  decorators: [(storyFn: StoryFn): JSX.Element => <div style={{ backgroundColor: '#EEE', padding: '10px', width: '400px' }}>{storyFn()}</div>],
};

export const defaultView = (): JSX.Element => (
  <Alert onClick={action('button-click')} />
);
