import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { SomethingWentWrongError } from '../../../../../errors';
import { ClassNameProp } from '../../../../../types';
import {
  ChannelInfo as ChannelInfoQueryType,
  ChannelInfo_workspace_channel_members_edges_node,
  ChannelInfoVariables,
} from './__generatedTypes__/ChannelInfo';

const Wrapper = styled.div``;

const WorkspaceDisplayName = styled.div``;

export type BaseChannelInfoProps = Readonly<
  (
    | { loading: true }
    | ({
        loading: false;
        workspaceDisplayName: string;
      } & (
        | {
            channelType: 'NAMED';
            channelName: string;
          }
        | {
            channelType: 'DIRECT_MESSAGES';
            channelMembers: ReadonlyArray<
              ChannelInfo_workspace_channel_members_edges_node
            >;
          }))) &
    ClassNameProp
>;

export const BaseChannelInfo: React.SFC<BaseChannelInfoProps> = props => {
  if (props.loading) {
    return null;
  }

  return (
    <Wrapper className={props.className}>
      <WorkspaceDisplayName>{props.workspaceDisplayName}</WorkspaceDisplayName>
      <div>channel name</div>
    </Wrapper>
  );
};

const channelInfoQuery = gql`
  query ChannelInfo($workspaceId: ID!, $channelId: ID!) {
    workspace(id: $workspaceId) {
      id
      name
      displayName

      channel(id: $channelId) {
        id
        type
        name
        members(first: 10) {
          edges {
            node {
              id
              username
              usernameIdentifier
            }
          }
        }
      }
    }
  }
`;

class ChannelInfoQuery extends Query<
  ChannelInfoQueryType,
  ChannelInfoVariables
> {}

export type ChannelInfoProps = ClassNameProp;

export const ChannelInfo: React.SFC<ChannelInfoProps> = props => (
  <Route
    render={({ match }) => (
      <ChannelInfoQuery
        query={channelInfoQuery}
        variables={{
          workspaceId: match.params.workspaceId,
          channelId: match.params.channelId,
        }}
      >
        {result => {
          const baseChannelInfoProps = makeBaseChannelInfoProps(result);

          return <BaseChannelInfo {...baseChannelInfoProps} />;
        }}
      </ChannelInfoQuery>
    )}
  />
);

function makeBaseChannelInfoProps(
  result: QueryResult<ChannelInfoQueryType, ChannelInfoVariables>,
): BaseChannelInfoProps {
  if (result.loading) {
    return { loading: true };
  }

  if (result.error || !result.data) {
    throw new SomethingWentWrongError();
  }

  const { workspace } = result.data;

  const { channel } = workspace;

  const workspaceDisplayName = workspace.displayName;
  const channelType = channel.type;

  if (channelType === 'NAMED') {
    const channelName = channel.name!;

    return { loading: false, workspaceDisplayName, channelType, channelName };
  }

  if (!channel.members.edges) {
    throw new SomethingWentWrongError();
  }

  const channelMembers = channel.members.edges
    .filter(edge => !!edge)
    .map(edge => edge!.node);

  return {
    loading: false,
    workspaceDisplayName,
    channelType,
    channelMembers,
  };
}

export default ChannelInfo;
