import React from 'react';
import styled from 'styled-components';

import AddWorkspaceButton from './AddWorkspaceButton';
import WorkspacesContainer from './WorkspacesContainer';

const StyledNav = styled.nav`
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
  <StyledNav>
    <StyledWorkspacesContainer />
    <StyledAddWorkspaceButton />
  </StyledNav>
);

export default WorkapacesBar;
