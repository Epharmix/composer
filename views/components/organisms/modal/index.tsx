import React from 'react';
import ReactDOM from 'react-dom';
import {
  Dialog,
  IDialogProps,
  Button,
  Classes,
  Intent
} from '@blueprintjs/core';
import {
  faQuestionCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@atoms';

type Routine = (...args: any[]) => any;

const CloseFns: Routine[] = [];

interface _ModalProps extends IDialogProps {
  title?: React.ReactNode;
  content: React.ReactNode;
  confirmButton?: React.ReactNode;
  confirmButtonText?: string;
  confirmButtonIntent?: Intent;
  cancelButton?: React.ReactNode;
  cancelButtonText?: string;
  cancelButtonIntent?: Intent;
  onOk?: React.MouseEventHandler;
  onCancel?: React.MouseEventHandler;
}

export type ModalProps = Omit<_ModalProps, 'isOpen'> & Partial<Pick<_ModalProps, 'isOpen'>>;

interface ModalReference {
  close: Routine;
  update: Routine;
}

// Base creation method
const create = (props: ModalProps): ModalReference => {
  // Create a container node to render the modal in
  const div = document.createElement('div');
  document.body.appendChild(div);
  // Construct the dialog config
  let config: _ModalProps = {
    ...props,
    onClosed: null,
    isOpen: true,
    usePortal: true
  };
  // Hoist the close function
  let close: Routine = null;
  // Create an event dispatcher to trigger actions on button click
  let postDispatch: Routine = null;
  const dispatch = (fn?: React.MouseEventHandler) => {
    postDispatch = fn;
    close();
  };
  // Define a clean-up routine when done
  const cleanup = (..._args: any[]) => {
    // Unmount the component
    const result = ReactDOM.unmountComponentAtNode(div);
    // Remove the container node
    if (result && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    // Get rid of the close function from the close group
    for (let i = 0; i < CloseFns.length; i++) {
      if (CloseFns[i] === close) {
        CloseFns.splice(i, 1);
        break;
      }
    }
  };
  const onClosed = (...args) => {
    if (postDispatch) {
      postDispatch(args);
    }
    cleanup();
  };
  // Define a render routine to create & update the modal
  const render = (props: ModalProps) => {
    // Do it asynchronously to avoid blocking
    setTimeout(() => {
      // Calling ReactDOM.render on the same node will cause an update
      ReactDOM.render(
        <Dialog
          {...props}
        >
          <div className={Classes.DIALOG_BODY}>
            {props.content}
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              {
                props.cancelButton ? props.cancelButton : (
                  props.cancelButton === false ? null : (
                    <Button
                      intent={props.cancelButtonIntent || Intent.NONE}
                      onClick={dispatch.bind(null, props.onCancel)}
                    >
                      {props.cancelButtonText || 'Close'}
                    </Button>
                  )
                )
              }
              {
                props.confirmButton ? props.confirmButton : (
                  <Button
                    intent={props.confirmButtonIntent || Intent.PRIMARY}
                    onClick={dispatch.bind(null, props.onOk)}
                  >
                    {props.confirmButtonText || 'OK'}
                  </Button>
                )
              }
            </div>
          </div>
        </Dialog>
      , div);
    });
  };
  // Define a close routine to be used in the close event handler
  close = (..._args: any[]) => {
    config = {
      ...config,
      isOpen: false
    };
    render(config);
  };
  // Define an update routine
  const update = (newConfig: ModalProps) => {
    config = { ...config, ...newConfig };
    render(config);
  };
  // Render the modal
  render({
    ...config, 
    onClosed,
    onClose: dispatch.bind(null, props.onCancel)
  });
  // Attach the close to the close group
  CloseFns.push(close);
  // Return the modal reference to allow for programmatic update & close
  return { close, update };
};

// Close all active modals
const closeAll = (): void => {
  while (CloseFns.length) {
    const close = CloseFns.pop();
    if (close) {
      close();
    }
  }
};

// Define the shorthands

const confirm = (props: ModalProps): ModalReference => {
  return create({
    icon: <Icon icon={faQuestionCircle} className="mr-2" />,
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Confirm',
    ...props
  });
};

const warn = (props: ModalProps): ModalReference => {
  return create({
    icon: <Icon icon={faExclamationTriangle} className="text-intent-warning mr-2" />,
    ...props
  });
};

const error = (props: Omit<ModalProps, 'onCancel' | 'cancelButton' | 'cancelButtonText' | 'cancelButtonIntent'>): ModalReference => {
  return create({
    icon: <Icon icon={faExclamationCircle} className="text-intent-danger mr-2" />,
    cancelButton: false,
    canEscapeKeyClose: false,
    canOutsideClickClose: false,
    isCloseButtonShown: false,
    ...props
  });
};

const success = (props: Omit<ModalProps, 'onCancel' | 'cancelButton' | 'cancelButtonText' | 'cancelButtonIntent'>): ModalReference => {
  return create({
    icon: <Icon icon={faCheckCircle} className="text-intent-success mr-2" />,
    confirmButtonIntent: Intent.SUCCESS,
    cancelButton: false,
    canEscapeKeyClose: false,
    canOutsideClickClose: false,
    isCloseButtonShown: false,
    ...props
  });
};

const Modal = {
  create,
  confirm,
  warn,
  error,
  success,
  closeAll
};

export default Modal;
