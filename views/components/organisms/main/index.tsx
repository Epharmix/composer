import React from 'react';

interface MainProps {
  isSidebarExpanded: boolean;
}

const Main: React.FC<MainProps> = ({ children, isSidebarExpanded }) => {
  const left = isSidebarExpanded ? '275px' : '52px';
  return (
    <main
      style={{
        position: 'absolute',
        left,
        right: 0,
        minHeight: '100%',
      }}
    >
      {children}
    </main>
  );
};

export default Main;
