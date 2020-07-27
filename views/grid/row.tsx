import React from 'react';
import { Row as RGRow, RowProps } from 'react-grid-system';

const Row: React.FC<RowProps> = ({
  children,
  className,
  align,
  component,
  debug,
  gutterWidth,
  justify,
  nogutter,
  nowrap,
  style,
}) => {
  return (
    <RGRow
      align={align}
      component={component}
      className={className}
      debug={debug}
      gutterWidth={gutterWidth}
      justify={justify}
      nogutter={nogutter}
      nowrap={nowrap}
      style={style}
    >
      {children}
    </RGRow>
  );
};

export default Row;
