import React from 'react';

/*
  Though <Badge/> accepts any number of children elements
  the intent is that it'll have a <Flag/> and <Text/> element.
  If no <Text/> element used, then just use a <Flag/> by itself
  instead of a <Badge/>.
*/
const Badge: React.FC = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default Badge;
