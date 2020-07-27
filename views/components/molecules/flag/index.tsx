import React from 'react';
import cc from 'classcat';

interface FlagProps {
  bgColor?: string;
}

const Flag: React.FC<FlagProps> = ({
  bgColor,
  children,
}) => {
  const classes = cc([
    'py-1',
    'px-2',
    'mr-1',
    bgColor ? `bg-${bgColor}` : 'bg-blue', 
  ]);
  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Flag;
