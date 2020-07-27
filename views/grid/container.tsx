import React from 'react';
import {
  Container as RGContainer,
  ContainerProps as RGContainerProps
} from 'react-grid-system';
import {
  bgClass,
  fullscreenClasses,
} from '../libs/css';
import cc from 'classcat';

interface ContainerProps extends RGContainerProps {
  fullscreen?: boolean;
  bg?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  component,
  fluid,
  lg,
  md,
  sm,
  style,
  xl,
  xs,
  xxl,
  fullscreen = false,
  bg,
}) => {
  const classes = cc([
    bgClass(bg),
    className,
    fullscreenClasses(fullscreen),
  ]);
  return (
    <RGContainer
      className={classes}
      component={component}
      fluid={fluid}
      lg={lg}
      md={md}
      sm={sm}
      style={style}
      xl={xl}
      xs={xs}
      xxl={xxl}
    >
      {children}
    </RGContainer>
  );
};

export default Container;
