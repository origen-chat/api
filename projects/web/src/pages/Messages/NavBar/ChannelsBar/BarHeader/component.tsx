import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  width: 100%;
  height: var(--top-bar-height);

  padding: 0 var(--md-space);
`;

export type BaseChannelsBarProps = Readonly<{
  workspaceName: string;
  workspaceDisplayName: string;
}>;

export const BaseChannelsBar: React.SFC<BaseChannelsBarProps> = props => (
  <Wrapper>workspace name</Wrapper>
);

const ChannelsBar = BaseChannelsBar;

export default ChannelsBar;
