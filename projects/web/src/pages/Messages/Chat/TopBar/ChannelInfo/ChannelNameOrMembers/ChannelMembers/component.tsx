import React from 'react';
import styled from 'styled-components';

import { PresenceStatusIndicator } from '../../../../../../../components';
import { ChannelInfo_workspace_channel_members_edges_node } from '../../__generatedTypes__/ChannelInfo';

const Wrapper = styled.div``;

const Member = styled.span`
  margin-right: var(--xs-space);

  :not(:last-child) {
    ::after {
      content: ',';
    }
  }
`;

export type ChannelMembersProps = Readonly<{
  members: ReadonlyArray<ChannelInfo_workspace_channel_members_edges_node>;
}>;

export const ChannelMembers: React.SFC<ChannelMembersProps> = props => (
  <Wrapper>
    {renderOnlineIndicator(props.members)}
    {renderMembers(props.members)}
  </Wrapper>
);

function renderOnlineIndicator(
  members: ChannelMembersProps['members'],
): React.ReactNode {
  // if (members.length !== 1) {
  //   return null;
  // }

  return <PresenceStatusIndicator status="online" />;
}

function renderMembers(
  members: ChannelMembersProps['members'],
): React.ReactNodeArray {
  const maxDisplayedAmount = 5;

  return members.slice(0, maxDisplayedAmount).map(member => (
    <Member>
      {member.username}#{member.usernameIdentifier}
    </Member>
  ));
}

export default ChannelMembers;
