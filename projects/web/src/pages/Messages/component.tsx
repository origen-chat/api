import React from 'react';
import styled from 'styled-components';

import NavBar from './NavBar';

const Wrapper = styled.main`
  height: 100%;
  width: 100%;
`;

export const Messages: React.SFC = () => (
  <Wrapper>
    <NavBar />
  </Wrapper>
);

export default Messages;
