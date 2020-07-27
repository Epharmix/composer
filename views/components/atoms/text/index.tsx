import React from 'react';
import cc from 'classcat';
import {
  colorClass,
  spacingClasses,
  sizeClass,
} from '../../../libs/css';

// TO DO: Optimize this tag to only accept
// certain values on the JSX.IntrinsicElements interface
// Also restrict the options for color to correspond
// to the text-{color} classes we have
// Same with size
interface TextProps {
  as?: keyof JSX.IntrinsicElements;
  bold?: boolean;
  uppercase?: boolean;
  underline?: boolean;
  dotted?: boolean;
  serif?: boolean;
  color?: string;
  size?: string;
  spacing?: string;
}

const Text: React.FC<TextProps> = ({ 
  children,
  as: Tag = 'span',
  bold,
  uppercase,
  underline,
  dotted,
  serif,
  color,
  size,
  spacing,
}) => {
  const classes = cc([
    {
      'font-bold': bold,
      'uppercase': uppercase,
      'underline': underline,
      'dotted': dotted,
      'font-serif': serif,
    },
    colorClass(color),
    sizeClass(size, serif),
    spacingClasses(spacing),
  ]);
  return (
    <Tag className={classes}>
      {children}
    </Tag>
  );
};

export default Text;
