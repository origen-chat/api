import React from 'react';
import styled from 'styled-components';

import BarHeader from './BarHeader';
import ChannelsContainer from './ChannelsContainer';

const Wrapper = styled.div`
  width: var(--channels-bar-width);

  background-color: var(--grey);
`;

export const ChannelsBar: React.FunctionComponent = () => (
  <Wrapper>
    <BarHeader />
    <ChannelsContainer />
  </Wrapper>
);

export default ChannelsBar;
