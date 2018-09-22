import React from 'react';
import styled from 'styled-components';

import Chat from './Chat';
import NavBar from './NavBar';

const Wrapper = styled.main`
  height: 100%;
  width: 100%;

  overflow: hidden;
`;

export const Messages: React.SFC = () => (
  <Wrapper>
    <NavBar />
    <Chat />
  </Wrapper>
);

export default Messages;
