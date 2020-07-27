import React from 'react';
import { Dialog as BPDialog, IDialogProps } from '@blueprintjs/core';

const Dialog: React.FC<IDialogProps> = ({ children, ...props }) => {
  return (
    <BPDialog {...props}>
      {children}
    </BPDialog>
  );
};

export default Dialog;
