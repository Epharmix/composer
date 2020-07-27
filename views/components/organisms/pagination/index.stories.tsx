import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Pagination from './index';

export default {
  component: Pagination,
  title: 'Organisms/Pagination',
  decorators: [withKnobs]
};

export const defaultView = (): JSX.Element => (
  <Pagination
    total={number('total', 24)}
    limit={number('limit', 5)}
    onPageChange={action('page-change')}
  />
);
