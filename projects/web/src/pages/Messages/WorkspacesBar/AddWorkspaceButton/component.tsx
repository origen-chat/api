import React from 'react';
import styled from 'styled-components';

import WorkspacesBarButton from '../WorkspacesBarButton';

const StyledWorkspacesBarButton = styled(WorkspacesBarButton)`
  margin-top: calc(var(--xxs-space) * 2);
`;

export type AddWorkspaceButtonProps = Readonly<{
  className?: string;
}>;

export const AddWorkspaceButton: React.SFC<AddWorkspaceButtonProps> = ({
  className,
}) => (
  <StyledWorkspacesBarButton
    to="/workspaces/add"
    title="Add a new workspace"
    className={className}
  />
);

export default AddWorkspaceButton;
