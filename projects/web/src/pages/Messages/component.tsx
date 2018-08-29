import React from 'react';
import styled from 'styled-components';

import ChannelsBar from './ChannelsBar';
import WorkspacesBar from './WorkspacesBar';

const Wrapper = styled.main`
  display: flex;
  flex: row nowrap;

  height: 100%;
  width: 100%;
`;

export const Messages: React.SFC = () => (
  <Wrapper>
    <WorkspacesBar />
    <ChannelsBar />
  </Wrapper>
);

export default Messages;
