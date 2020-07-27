import React from 'react';
import { ButtonGroup as BPButtonGroup } from '@blueprintjs/core';

const ButtonGroup: React.FC = ({ children, ...props }) => {
  return (
    <BPButtonGroup {...props}>
      {children}
    </BPButtonGroup>
  );
};

export default ButtonGroup;
