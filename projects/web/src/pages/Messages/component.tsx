import React from 'react';
import styled from 'styled-components';

import { ChannelsBar } from '../../components';

const Wrapper = styled.main`
  display: flex;
  flex: row nowrap;

  height: 100%;
  width: 100%;
`;

export const BaseMessages: React.SFC = () => (
  <Wrapper>
    <ChannelsBar />
  </Wrapper>
);

const Messages = BaseMessages;

export default Messages;
