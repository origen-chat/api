import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav`
  width: 16rem;

  background-color: var(--grey);
`;

export const BaseChannelsBar: React.SFC = () => <StyledNav />;

const ChannelsBar = BaseChannelsBar;

export default ChannelsBar;
