import React from 'react';
import { Popover as BPPopover, IPopoverProps } from '@blueprintjs/core';

const Popover: React.FC<IPopoverProps> = ({ children, ...props }) => {
  return (
    <BPPopover {...props}>
      {children}
    </BPPopover>
  );
};

export default Popover;
