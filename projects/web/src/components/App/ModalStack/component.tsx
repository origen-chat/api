import React from 'react';
import ReactDOM from 'react-dom';

import { ModalStack as ModalStackType } from '../../../store';
import StoreConsumer from '../../StoreConsumer';

const modalStackRootElementId = 'modal-stack-root';
const modalStackRootElement = document.getElementById(modalStackRootElementId);

if (!modalStackRootElement) {
  throw new Error(`#${modalStackRootElementId} element not found`);
}

export type BaseModalStackProps = Readonly<{
  modalStack: ModalStackType;
}>;

export const BaseModalStack: React.SFC<BaseModalStackProps> = props => {
  const modals = renderModals(props.modalStack);
  const portal = ReactDOM.createPortal(modals, modalStackRootElement);

  return <>{portal}</>;
};

function renderModals(modalStack: ModalStackType): React.ReactNode {
  return modalStack;
}

export const ModalStack: React.SFC = () => (
  <StoreConsumer>
    {store => <BaseModalStack modalStack={store.state.modalStack} />}
  </StoreConsumer>
);

export default ModalStack;
