import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { Patient } from '@organisms';

export default {
  component: Patient,
  title: 'Organisms/Patient',
  decorators: [withInfo],
  parameters: {
    info: {
      inline: true,
      propTables: false,
      text: `
        ## Information
        ***
        The Patient component is only displayed in aggregate, or list, views of patients.
        ***
      `,
    },
  },
};

export const defaultView = (): JSX.Element => (
  <Patient data={{ foo: 'bar' }} />
);
