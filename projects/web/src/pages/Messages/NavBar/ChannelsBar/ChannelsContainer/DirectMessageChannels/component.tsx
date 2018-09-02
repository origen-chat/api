import React from 'react';
import styled from 'styled-components';

import Heading from '../Heading';

const Wrapper = styled.div``;

export const BaseChannelsContainer: React.SFC = () => (
  <Wrapper>
    <Heading>Direct Messages</Heading>
  </Wrapper>
);

const ChannelsContainer = BaseChannelsContainer;

export default ChannelsContainer;
