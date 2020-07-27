import React from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@atoms';
import { Flag } from '@molecules';
import { Badge, Tooltip } from '@organisms';

export default {
  component: Badge,
  title: 'Organisms/Badge',
};

export const withTooltip = (): JSX.Element => (
  <Tooltip
    id="tlp-4"
    content={<span>Alert triggered<br/>Jun 11 at 11:39am</span>}
  >
    <Badge>
      <Flag>
        <Icon className="mr-1 text-brand-white text-sans-sm" icon={faBell} />
        <span className="font-bold text-brand-white text-sans-sm">Jun 8</span>
      </Flag>
      <span className="text-sans-sm">11:39am</span>
    </Badge>
  </Tooltip>
);

export const withoutTooltip = (): JSX.Element => (
  <Badge>
    <Flag bgColor="brand">
      <Icon className="mr-1 text-sans-sm" icon={faBell} />
      <span className="font-bold text-sans-sm">Jun 8</span>
    </Flag>
    <span className="text-sans-sm">11:39am</span>
  </Badge>
);

