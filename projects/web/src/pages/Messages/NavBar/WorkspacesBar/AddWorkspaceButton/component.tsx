import React from 'react';
import styled from 'styled-components';

import BarButton from '../BarButton';

const StyledBarButton = styled(BarButton)`
  margin-top: calc(var(--xxs-space) * 2);
  margin-right: auto;
  margin-left: auto;
`;

export type AddWorkspaceButtonProps = Readonly<{
  className?: string;
}>;

export const AddWorkspaceButton: React.SFC<AddWorkspaceButtonProps> = ({
  className,
}) => (
  <StyledBarButton
    to="/workspaces/add"
    title="Add a new workspace"
    className={className}
  />
);

export default AddWorkspaceButton;
