import React from 'react';
import { action } from '@storybook/addon-actions';

import { Button } from '@molecules';
import { Modal } from '@organisms';

export default {
  component: Modal,
  title: 'Organisms/Modal',
};

export const defaultView = (): JSX.Element => {
  const openConfirm = () => {
    Modal.confirm({
      title: 'Please Confirm This',
      content: (
        <p>This could be potentially impactful action. Do you want to continue?</p>
      ),
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      onOk: action('confirm-modal-ok'),
      onCancel: action('confirm-modal-cancel')
    });
  };
  const openWarning= () => {
    Modal.warn({
      title: 'This Is A Warning',
      content: (
        <p>This is more information about the warning. Do you want to continue?</p>
      ),
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      onOk: action('warning-modal-ok'),
      onCancel: action('warning-modal-cancel')
    });
  };
  const openError= () => {
    Modal.error({
      title: 'Something Went Wrong',
      content: (
        <p>This is some specific information about the thing that went wrong.</p>
      ),
      confirmButtonText: 'OK',
      onOk: action('error-modal-ok'),
    });
  };
  const openSuccess= () => {
    Modal.success({
      title: 'It Worked',
      content: (
        <p>Congratulation on the success, here are more details.</p>
      ),
      confirmButtonText: 'OK',
      onOk: action('success-modal-ok')
    });
  };
  return (
    <div>
      <Button onClick={openConfirm}>
        Confirm Modal
      </Button>
      &nbsp;
      <Button onClick={openWarning}>
        Warning Modal
      </Button>
      &nbsp;
      <Button onClick={openError}>
        Error Modal
      </Button>
      &nbsp;
      <Button onClick={openSuccess}>
        Success Modal
      </Button>
    </div>
  );
};

