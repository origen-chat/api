import React from 'react';
import styled from 'styled-components';

import DirectMessageChannels from './DirectMessageChannels';
import NamedChannels from './NamedChannels';

const Wrapper = styled.div`
  margin: var(--md-space) 0;
`;

export const BaseChannelsContainer: React.FunctionComponent = () => (
  <Wrapper>
    <NamedChannels />
    <DirectMessageChannels />
  </Wrapper>
);

const ChannelsContainer = BaseChannelsContainer;

export default ChannelsContainer;
