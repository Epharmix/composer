import React from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@atoms';

interface StatusIndicatorProps {
  icon?: React.ReactNode;
  color?: string;
}

/*
  Default icon can be overwritten by passing in a different icon.
  If an icon is passed in and color is passed in too, color will be ignored.
  The passed in icon will have to set its own color, if necessary.
*/
const StatusIndicator: React.FC<StatusIndicatorProps> = ({ icon, color = 'grey' }) => {
  const colorClass = `text-${color}`;
  const defaultIcon = <Icon icon={faCircle} className={colorClass} />;
  return (
    <span>
      {icon ? icon : defaultIcon}
    </span>
  );
};

export default StatusIndicator;
