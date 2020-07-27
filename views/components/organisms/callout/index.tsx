import React from 'react';
import {
  Callout as BPCallout,
  ICalloutProps
} from '@blueprintjs/core';
import './callout';

const Callout: React.FC<ICalloutProps> = (props) => {
  return (
    <BPCallout
      {...props}
    />
  );
};

export default Callout;
