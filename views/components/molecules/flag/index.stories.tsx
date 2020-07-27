import React from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@atoms';
import { Flag } from '@molecules';

export default {
  component: Flag,
  title: 'Molecules/Flag',
};

export const icon = (): JSX.Element => (
  <Flag>
    <Icon icon={faBell} className="text-white" />
  </Flag>
);

export const iconAndText = (): JSX.Element => (
  <Flag>
    <Icon className="mr-2 text-brand-white text-sans-sm" icon={faBell} />
    <span className="text-sans-sm text-brand-white font-bold">Jun 8</span>
  </Flag>
);

export const customBgColor = (): JSX.Element => (
  <Flag bgColor="brand">
    <Icon className="mr-2" icon={faBell} />
    <span className="text-sans-sm font-bold">Jun 8</span>
  </Flag>
);
