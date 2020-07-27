import React from 'react';
import cc from 'classcat';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

const Icon: React.FC<FontAwesomeIconProps> = ({
  className,
  ...props
}) => {
  const classes = cc([
    className ? className : 'text-grey',
  ]);
  return (
    <FontAwesomeIcon
      className={classes}
      {...props}
    />
  );
};

export default Icon;
