import React from 'react';
import { Col as RGCol, ColProps } from 'react-grid-system';

const Col: React.FC<ColProps> = ({
  children,
  component,
  debug,
  lg,
  md,
  offset,
  pull,
  push,
  sm,
  style,
  width,
  xl,
  xs,
  xxl,
}) => {
  return (
    <RGCol
      component={component}
      debug={debug}
      lg={lg}
      md={md}
      offset={offset}
      pull={pull}
      push={push}
      sm={sm}
      style={style}
      width={width}
      xl={xl}
      xs={xs}
      xxl={xxl}
    >
      {children}
    </RGCol>
  );
};

export default Col;
