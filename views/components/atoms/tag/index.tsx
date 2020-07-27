import React from 'react';
import { Tag as BPTag, ITagProps } from '@blueprintjs/core';
import cc from 'classcat';

interface TagProps extends ITagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({
    text,
    active,
    className,
    fill,
    icon,
    intent,
    interactive,
    large,
    minimal,
    multiline,
    onClick,
    onRemove,
    rightIcon,
    round,
  }) => {
  const classes = cc([
    className,
    'px-2',
    'ma-1',
    {
      'text-black': ( !minimal && (intent === 'success' || intent === 'warning' || intent === 'danger') )
    },
  ]);
  return (
    <BPTag
      active={active}
      className={classes}
      fill={fill}
      icon={icon}
      intent={intent}
      interactive={interactive}
      large={large}
      minimal={minimal}
      multiline={multiline}
      onClick={onClick}
      onRemove={onRemove}
      rightIcon={rightIcon}
      round={round}
    >
      {text}
    </BPTag>
  );
};

export default Tag;
