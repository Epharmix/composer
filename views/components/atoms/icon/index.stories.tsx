import React from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@atoms';

export default {
  component: Icon,
  title: 'Atoms/Icon',
};

export const defaultView = (): JSX.Element => <Icon icon={faBell} />;
export const brandColor = (): JSX.Element => <Icon icon={faBell} className="text-brand" />;
