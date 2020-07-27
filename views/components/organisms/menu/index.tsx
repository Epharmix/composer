import React from 'react';
import {
  Menu as BPMenu,
  IMenuProps,
  IMenuItemProps,
} from '@blueprintjs/core';

export const Menu: React.FC<IMenuProps> = ({ children, ...props }) => {
  return (
    <BPMenu {...props}>
      {children}
    </BPMenu>
  );
};

export const MenuItem: React.FC<IMenuItemProps> = ({ children, ...props }) => {
  return (
    <BPMenu.Item {...props}>
      {children}
    </BPMenu.Item>
  );
};
