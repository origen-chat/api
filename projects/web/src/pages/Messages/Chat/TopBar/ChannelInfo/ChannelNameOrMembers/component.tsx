import React from 'react';
import styled from 'styled-components';

import { ChannelType } from '../../../../../../../__generatedTypes__/globalTypes';
import { ChannelInfo_workspace_channel_members_edges_node } from '../__generatedTypes__/ChannelInfo';
import ChannelMembers from './ChannelMembers';

const ChannelName = styled.div``;

export type ChannelNameOrMembersProps = Readonly<
  | {
      channelType: ChannelType.NAMED;
      channelName: string;
    }
  | {
      channelType: ChannelType.DIRECT_MESSAGES;
      channelMembers: ReadonlyArray<
        ChannelInfo_workspace_channel_members_edges_node
      >;
    }
>;

export const ChannelNameOrMembers: React.FunctionComponent<
  ChannelNameOrMembersProps
> = props => {
  if (props.channelType === ChannelType.NAMED) {
    return <ChannelName>{props.channelName}</ChannelName>;
  }

  return <ChannelMembers members={props.channelMembers} />;
};

export default ChannelNameOrMembers;
