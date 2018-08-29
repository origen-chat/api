import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { workspacesBarButtonStyle } from './styles';

const StyledLink = styled(Link)`
  ${workspacesBarButtonStyle};
`;

export type WorkspacesBarButtonProps = Readonly<{
  to: string;
  title?: string;
  className?: string;
}>;

export const WorkspacesBarButton: React.SFC<WorkspacesBarButtonProps> = ({
  to,
  title,
  className,
  children,
}) => (
  <StyledLink to={to} title={title} className={className}>
    {children}
  </StyledLink>
);

export default WorkspacesBarButton;
