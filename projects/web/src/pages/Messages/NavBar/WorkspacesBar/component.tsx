import React from 'react';
import styled from 'styled-components';

import AddWorkspaceButton from './AddWorkspaceButton';
import WorkspacesContainer from './WorkspacesContainer';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;

  width: var(--workspaces-bar-width);
  height: 100%;

  background-color: var(--dark-grey);
`;

const StyledWorkspacesContainer = styled(WorkspacesContainer)`
  flex: 1 1 auto;
`;

const StyledAddWorkspaceButton = styled(AddWorkspaceButton)`
  flex: 0 0 auto;
`;

export const WorkapacesBar: React.SFC = () => (
  <Wrapper>
    <StyledWorkspacesContainer />
    <StyledAddWorkspaceButton />
  </Wrapper>
);

export default WorkapacesBar;
