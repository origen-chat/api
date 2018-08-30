import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { barButtonStyle } from './styles';

const StyledLink = styled(Link)`
  ${barButtonStyle};
`;

export type BarButtonProps = Readonly<{
  to: string;
  title?: string;
  className?: string;
}>;

export const BarButton: React.SFC<BarButtonProps> = ({
  to,
  title,
  className,
  children,
}) => (
  <StyledLink to={to} title={title} className={className}>
    {children}
  </StyledLink>
);

export default BarButton;
