import React from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@atoms';
import { StatusIndicator } from '@molecules';

export default {
  component: StatusIndicator,
  title: 'Molecules/StatusIndicator',
};

export const defaultView = (): JSX.Element => <StatusIndicator />;

export const customColor = (): JSX.Element => (
  <StatusIndicator color="green" />
);

export const customIcon = (): JSX.Element => (
  <StatusIndicator icon={<Icon icon={faBell} color="brand" />} />
);
