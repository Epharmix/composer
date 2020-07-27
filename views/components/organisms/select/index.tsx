import React from 'react';
import {
  Select as BPSelect,
  ISelectProps,
} from '@blueprintjs/select';

const GenericSelect = BPSelect.ofType<any>();

/** 
 * children prop is the <Select/> popover target
 * usually is <Button/>
*/
const Select: React.FC<ISelectProps<any>> = ({
  children,
  ...props
}) => {
  return (
    <GenericSelect {...props}>
      {children}
    </GenericSelect>
  );
};

export default Select;
