import React from 'react';
import cc from 'classcat';
import { Link, LinkProps } from 'react-router-dom';
import {
  Button as BPButton,
  IButtonProps,
} from '@blueprintjs/core';
import './button.scss';

/**
 * We extend two interfaces here so we can add additional type checking
 * for native button attributes like onmouseover. Given that both IButtonProps
 * and React.ButtonHTMLAttributes have an onClick type attribute, we must define our own
 * LinkProps['to'] retrieves the to value on the LinkProps interface
 */
interface ButtonProps extends IButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  linkTo?: LinkProps['to'];
  bare?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  linkTo,
  children,
  className,
  bare,
  intent,
  minimal,
  ...props 
}) => {
  const classes = cc([
    className ? className : undefined,
    bare ? 'bare' : undefined,,
    {
      'text-black': ( !minimal && (intent === 'success' || intent === 'warning' || intent === 'danger') )
    },
  ]);
  const btn = (
    <BPButton className={classes} intent={intent} minimal={minimal} {...props}>
      {children}
    </BPButton>
  );
  if (linkTo) {
    return (
      <Link className="hover-no-underline" to={linkTo}>
        {btn}
      </Link>
    );
  }
  return btn;
};

export default Button;
