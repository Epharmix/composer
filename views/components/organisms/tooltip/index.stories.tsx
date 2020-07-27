import React from 'react';
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@atoms';
import { Tooltip } from '@organisms';

export default {
  component: Tooltip,
  title: 'Organisms/Tooltip',
};

const target = (
  <div>
    <Icon icon={faBell} className="mr-2" />
    <span>Hover over me!</span>
  </div>
);

export const contentNoHeader = (): JSX.Element => (
  <Tooltip
    id="tlp-11"
    content={<span>I am a tooltip!</span>}
  >
    {target}
  </Tooltip>
);

export const contentWithHeader = (): JSX.Element => (
  <Tooltip
    id="tlp-22"
    content={
      <React.Fragment>
        <h3 className="my-1 text-sans-md">
          <Icon icon={faCircle} className="text-white mr-1" />
          Tooltip Header
        </h3>
        <p className="mb-0">This is the tooltip body</p>
      </React.Fragment>
    }
  >
    {target}
  </Tooltip>
);
