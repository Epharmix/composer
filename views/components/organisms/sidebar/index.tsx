import React from 'react';
import cc from 'classcat';

interface SidebarProps {
  isExpanded: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ children, isExpanded }) => {
  const width = isExpanded ? '275px' : '52px';
  const classes = cc([
    'bg-grey text-white fixed inset-0 z-5',
    isExpanded ? undefined : 'text-center',
  ]);
  return (
    <aside className={classes} style={{ width }}>
      {children}
    </aside>
  );
};

export default Sidebar;
