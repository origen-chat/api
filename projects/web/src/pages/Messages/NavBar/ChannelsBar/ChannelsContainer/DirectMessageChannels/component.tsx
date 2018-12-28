import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';

import { modalStackActions, ReduxState } from '../../../../../../modules';
import Heading from '../Heading';

const Wrapper = styled.div``;

export type DirectMessagesChannelsProps = DispatchProps & OwnProps;

type OwnProps = Readonly<{}>;

export const DirectMessagesChannels: React.FunctionComponent<
  DirectMessagesChannelsProps
> = props => (
  <Wrapper>
    <Heading onClick={props.openNewDirectMessagesChannelModal}>
      Direct Messages
    </Heading>
  </Wrapper>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openNewDirectMessagesChannelModal: () =>
    dispatch(modalStackActions.pushModal({ type: '' })),
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export const EnhancedDirectMessagesChannels = connect<
  {},
  DispatchProps,
  OwnProps,
  ReduxState
>(
  undefined,
  mapDispatchToProps,
)(DirectMessagesChannels);

export default EnhancedDirectMessagesChannels;
