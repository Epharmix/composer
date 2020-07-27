import React from 'react';
import cc from 'classcat';
import { Card as BPCard, ICardProps } from '@blueprintjs/core';

interface CardProps extends ICardProps {
  faded?: boolean;
}

const Card: React.FC<CardProps> = (props) => {
  const classes = cc([
    props.className,
    props.faded ? 'bp3-card-faded' : null
  ]);
  return (
    <BPCard
      {...props}
      className={classes}
    />
  );
};

export default Card;

export const CardFrame: React.FC<ICardProps> = (props) => {
  return (
    <Card
      {...props}
      style={Object.assign({}, props.style, {
        padding: 0
      })}
    />
  );
};

export interface CardBlockProps {
  className?: string;
  bare?: boolean;
}

export const CardBlock: React.FC<CardBlockProps> = (props) => {
  const classes = cc([
    props.className,
    'bp3-card-block',
    props.bare ? 'bp3-card-block-bare' : null
  ]);
  return (
    <div
      className={classes}
      {...props}
    />
  );
};

export const CardTitle: React.FC<{ className?: string }> = (props) => {
  const classes = cc([
    props.className,
    'bp3-card-block',
    'bp3-card-title'
  ]);
  return (
    <div
      className={classes}
      {...props}
    />
  );
};

export interface CardBreakoutProps {
  className?: string;
  right?: boolean;
}

export const CardBreakout: React.FC<CardBreakoutProps> = (props) => {
  const classes = cc([
    props.className,
    'bp3-card-breakout',
    props.right ? 'bp3-card-breakout-right' : null
  ]);
  return (
    <div
      {...props}
      className={classes}
    />
  );
};

