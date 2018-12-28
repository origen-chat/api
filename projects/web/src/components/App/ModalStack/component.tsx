import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { modalStackSelectors, ReduxState } from '../../../modules';
import Modal from './Modal';

const modalStackRootElementId = 'modal-stack-root';
const modalStackRootElement = document.getElementById(modalStackRootElementId);

if (!modalStackRootElement) {
  throw new Error(`#${modalStackRootElementId} element not found`);
}

const Container = styled.div`
  z-index: var(--modal-stack-z-index);
`;

export type ModalStackProps = StateProps & OwnProps;

export type OwnProps = Readonly<{}>;

export const ModalStack: React.FunctionComponent<ModalStackProps> = props => {
  const modals = renderModals(props.modalsProps);
  const portalElement = <Container>{modals}</Container>;

  const portal = ReactDOM.createPortal(portalElement, modalStackRootElement);

  return <>{portal}</>;
};

function renderModals(
  modalsProps: ModalStackProps['modalsProps'],
): React.ReactNode {
  const modals = modalsProps.map(modalProps => <Modal {...modalProps} />);

  return modals;
}

const mapStateToProps = (state: ReduxState) => ({
  modalsProps: modalStackSelectors.getModalPropsStack(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

export const EnhancedModalStack = connect<StateProps, {}, OwnProps, ReduxState>(
  mapStateToProps,
)(ModalStack);

export default EnhancedModalStack;
