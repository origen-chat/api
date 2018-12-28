import React from 'react';

export type ModalProps = Readonly<{
  type: string;
  [name: string]: any;
}>;

export const Modal: React.FunctionComponent<ModalProps> = props => null;

export default Modal;
