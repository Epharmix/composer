import React from 'react';
import uid from 'uid2';
import {
  Tooltip as BPTooltip,
  ITooltipProps,
} from '@blueprintjs/core';

interface TooltipProps extends ITooltipProps {
  id?: string;
}

/**
 * WAI-ARIA guidelines for tooltip:
 * https://www.w3.org/TR/wai-aria-practices/#tooltip
 * 
 * Tooltip container element has role="tooltip"
 * Trigger element has aria-describedby={id}
 * 
 * Known issue: Since the React Tooltip doesn't
 * get added to the DOM until the target is hovered over
 * We get an incomplete ARIA attribute warning of
 * "ARIA attribute element ID does not exist on the page"
 */
const Tooltip: React.FC<TooltipProps> = ({
  id,
  content,
  children,
  ...props
}) => {
  id = id || uid(8);
  return (
    <BPTooltip
      {...props}
      usePortal={false}
      canEscapeKeyClose
      content={
        <div id={id} className="text-center pa-1" role="tooltip">
          {content}
        </div>
      }
    >
      <span aria-describedby={id}>
        {children}
      </span>
    </BPTooltip>
  );
};

export default Tooltip;
