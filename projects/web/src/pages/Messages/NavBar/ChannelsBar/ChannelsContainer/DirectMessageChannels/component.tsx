import React from 'react';
import styled from 'styled-components';

import { StoreConsumer } from '../../../../../../components';
import Heading from '../Heading';

const Wrapper = styled.div``;

export type BaseDirectMessagesChannelsProps = Readonly<{
  openNewDirectMessagesChannelModel: () => void;
}>;

export const BaseDirectMessagesChannels: React.SFC<
  BaseDirectMessagesChannelsProps
> = props => (
  <Wrapper>
    <Heading onClick={props.openNewDirectMessagesChannelModel}>
      Direct Messages
    </Heading>
  </Wrapper>
);

export const DirectMessagesChannels: React.SFC = () => (
  <StoreConsumer>
    {store => {
      const newDirectMessagesChannelModel = null;

      const openNewDirectMessagesChannelModel = () =>
        store.actions.pushModal(newDirectMessagesChannelModel);

      return (
        <BaseDirectMessagesChannels
          openNewDirectMessagesChannelModel={openNewDirectMessagesChannelModel}
        />
      );
    }}
  </StoreConsumer>
);

export default DirectMessagesChannels;
