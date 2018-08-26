import React from 'react';
import styled from 'styled-components';

import WorkspacesBar from './WorkspacesBar';

const Wrapper = styled.main`
  display: flex;
  flex: row nowrap;

  height: 100%;
  width: 100%;
`;

export const BaseMessages: React.SFC = () => (
  <Wrapper>
    <WorkspacesBar />
  </Wrapper>
);

const Messages = BaseMessages;

export default Messages;
