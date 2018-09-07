import React from 'react';
import styled from 'styled-components';

import ChannelInfo from './ChannelInfo';
import ToggleNavBarButton from './ToggleNavBarButton';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row column;
  justify-content: start;
  align-content: center;
  align-items: center;

  background-color: var(--primary-color);
  color: white;

  height: var(--top-bar-height);

  padding: 0 var(--sm-space);
`;

const StyledToggleNavBarButton = styled(ToggleNavBarButton)`
  flex: 0 0 auto;
`;

const StyledChannelInfo = styled(ChannelInfo)`
  flex: 1 0 auto;
`;

export const TopBar: React.SFC = () => (
  <Wrapper>
    <StyledToggleNavBarButton />
    <StyledChannelInfo />
  </Wrapper>
);

export default TopBar;
