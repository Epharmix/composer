import React from 'react';
import cc from 'classcat';

interface LogoProps {
  maxWidth: number;
  centerVersion?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ maxWidth, centerVersion, className = '' }) => {
  const style = { maxWidth: `${maxWidth}px` };
  const classes = cc([
    'sharp-image',
    className ? className : undefined,
  ]);
  const src = centerVersion
    ? '/static/images/caresignal-centered-inverse.png'
    : '/static/images/caresignal-logo-inverse.png';
  return (
    <img
      src={src}
      className={classes}
      alt="CareSignal Logo"
      style={style}
    />
  );
};

export default Logo;
