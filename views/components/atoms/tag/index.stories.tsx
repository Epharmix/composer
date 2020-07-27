import React from 'react';
import { Tag } from '@atoms';

export default {
  component: Tag,
  title: 'Atoms/Tag',
};

export const defaultView = (): JSX.Element => <Tag text="coca cola" />;
